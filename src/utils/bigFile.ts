import { ref, Ref } from 'vue'
import { apiBigFileCheck, apiBigFileMerge, apiBigFileUpload } from '../api/file'
import request, { ErrorCode, providePort } from '../api/request'
import { CHUNK_SIZE } from '../config/config'
import { isUndef, nextTick } from './shared'
import FileWorker from './worker2hash?worker'

const worker = new FileWorker()

const FRAME_TIME = 12 /**一帧16毫秒，12毫秒是算切片的最大耗时，留4毫秒让js去跑其它的逻辑 */
const CONCURRENT_LIMIT = 4 /**并发请求数 */

export enum UploadMsg {
  Success = "上传成功",
  Pause = "暂停",
  Resume = "恢复",
  Fail = "上传失败",
  Upload = "上传文件中",
  NetError = "网络连接失败",
  Ready = "就绪",
  Prepare = "初始化..."
}


export const useBigFileUpload = (courseId: number, id: number): [
  Ref<string>, Ref<number>, Ref<number>, (file: File) => Promise<() => void>, () => void, () => void
] => {
  let nextPosition = 0
  const status = ref<UploadMsg>(UploadMsg.Ready)
  const progressUpload = ref(0)
  const progressPrepare = ref(0)
  let pause = false
  let chunks: ArrayBuffer[] | null = null
  let hash = ""
  let _upload: (() => void) | null = null
  let done = false

  /**控制暂停和恢复 */
  let blockResolve: ((...args: any) => void) | null = null

  const goNext = () => new Promise(resolve => {
    blockResolve = resolve
    nextTick(() => {
      if (!pause) {
        resolve(null)
      }
    })
  })

  const calcHash = (chunkList: ArrayBuffer[]) => new Promise(resolve => {
    const total = chunkList.length
    worker.postMessage(chunkList, [...chunkList])
    worker.onmessage = e => {
      const data = e.data as number | [string, ArrayBuffer[]]
      if (typeof data === "object") {
        progressPrepare.value = 1
        chunks = data[1]
        resolve(data[0])
      } else {
        progressPrepare.value += 1 / total / 2
      }
    }
  }) as Promise<string>

  const getFileSlice = async (file: File, total: number) => {
    const chunks: ArrayBuffer[] = []
    while (nextPosition < total) {
      await goNext()
      console.log("slice");

      const chunk = file.slice(nextPosition * CHUNK_SIZE, (nextPosition + 1) * CHUNK_SIZE)
      chunks.push(await read2buf(chunk))
      progressPrepare.value += 1 / total / 2
      nextPosition++
    }
    progressPrepare.value = 0.5
    nextPosition = 0
    return chunks
  }

  const pauseFn = () => {
    pause = true
    worker.postMessage(true) /*通知hash暂停*/
    providePort.postMessage(true) /**通知ajax调度器（api/request.ts）取消上传请求 */
  }

  const resumeFn = () => {
    pause = false
    worker.postMessage(false) /**通知worker恢复算hash */
    providePort.postMessage(false) /**通知ajax调度器（api/request.ts）恢复接收上传切片 */
    blockResolve && blockResolve() /**取消计算切片的阻塞 */
    _upload && _upload() /**重新进行网络部分上传 */
  }

  const readyUpload = async (file: File) => {
    _upload = null
    const total = Math.ceil(file.size / CHUNK_SIZE)

    progressPrepare.value = 0
    progressUpload.value = 0
    status.value = UploadMsg.Prepare

    nextPosition = 0
    chunks = await getFileSlice(file, total)

    hash = await calcHash(chunks)
    status.value = UploadMsg.Ready

    _upload = upload
    async function upload() {
      console.log("slice total:", total);

      status.value = UploadMsg.Upload

      /**检查有没有上传过，如果已经上传过，data是当前须要上传的分片下标 */
      const res = await apiBigFileCheck(hash, CHUNK_SIZE)
      if (res.error_code === ErrorCode.Success) {
        if (!isUndef(res.data)) {
          /**data是当前需要上传分片的下标 */
          progressUpload.value = Math.max(
            res.data as number / (chunks?.length || 0),
            progressUpload.value
          )
          nextPosition = res.data - 1
        } else {
          /**已经全部上传 */
          progressUpload.value = 1
          status.value = UploadMsg.Success
          return
        }
      } else if (res.error_code !== ErrorCode.Reject) {
        /**网络连接错误 */
        status.value = UploadMsg.NetError
        return
      } else {
        nextPosition = 0
      }

      const len = chunks!.length
      let requestNum = 0

      let nextRound: any = null
      const block = () => new Promise((resolve) => {
        nextRound = resolve
      })

      let progressArray = new Array(CONCURRENT_LIMIT).fill(0)
      while (nextPosition < len) {
        await nextTick()
        if (pause) {
          return
        }
        if (requestNum >= CONCURRENT_LIMIT) {
          await block()
          progressArray = new Array(CONCURRENT_LIMIT).fill(0)
        }
        requestNum++
        apiBigFileUpload(
          new Blob([chunks![nextPosition]]),
          nextPosition,
          len,
          CHUNK_SIZE,
          file.size,
          courseId,
          hash,
          (e) => {
            const target = e.loaded / e.total
            let idx = nextPosition % 4
            progressUpload.value += (target - progressArray[idx]) / total
            progressArray[idx] = target
          }
        ).then(res => {
          if (res.error_code !== ErrorCode.Success) {
            progressUpload.value += 1 / total
            status.value = UploadMsg.NetError
            pauseFn()
          }
          return res
        }).finally(() => {
          requestNum--
          if (requestNum === 0) {
            nextRound && nextRound()
          }
        })
        nextPosition++
      }

      await block()
      const mergeRes = await apiBigFileMerge(file.name, hash, id)
      if (mergeRes.error_code !== ErrorCode.Success) {
        status.value = UploadMsg.NetError
        return
      }
      status.value = UploadMsg.Success
      progressUpload.value = 1
    }
    return upload
  }

  return [status, progressPrepare, progressUpload, readyUpload, pauseFn, resumeFn]
}

const read2buf = (file: Blob) => new Promise((resolve, reject) => {
  const rd = new FileReader()
  rd.onload = () => {
    const buf = rd.result as ArrayBuffer
    resolve(buf)
  }
  rd.onerror = reject

  rd.readAsArrayBuffer(file)
}) as Promise<ArrayBuffer>


  // // 测试性能用
  // ; (function () {
  //   const div = document.createElement("div");
  //   const styles = {
  //     position: "fixed",
  //     width: "50px",
  //     height: "50px",
  //     backgroundColor: "black",
  //     top: "0"
  //   }
  //   for (const k in styles) {
  //     /**@ts-ignore */
  //     div.style[k] = styles[k]
  //   }
  //   let deg = 0
  //   const rotate = () => {
  //     div.style.transform = `rotate(${deg}deg)`
  //     deg += 10
  //     setTimeout(rotate, 30)
  //   }
  //   rotate()
  //   document.body.appendChild(div)
  // })()


// 单线程时间切片算文件切片和hash模型
// let hasher: IHasher
// createMD5().then(_hasher => {
//   hasher = _hasher
// })
// function remainTime(startTime: number) {
//   return performance.now() - startTime < FRAME_TIME
// }
// const enum Status {
//   None,
//   Slice,
//   Hash,
//   Check,
//   Upload,
//   Done,
//   Error,
//   Pause
// }
// class WorkerModel {
//   status = Status.None
//   shouldYield = false
//   currSliceIdx = 0 //当前分片的下标
//   currHashIdx = 0 //当前hash的下标
//   uploadIdx = 0 //上传位置的下标
//   total = 0 //一共分了多少片
//   currHash: string = ""
//   currFile: File | null = null
//   chunks: ArrayBuffer[] = []

//   courseId: number
//   id: number

//   preCheck: Ref<Flags>
//   progress: Ref<number>

//   constructor(courseId: number, id: number, preCheck: Ref<Flags>, progress: Ref<number>) {
//     this.courseId = courseId
//     this.id = id
//     this.preCheck = preCheck
//     this.progress = progress
//   }

//   async run(file: File) {
//     const startTime = performance.now()

//     if (!this.shouldYield) {
//       switch (this.status) {
//         case Status.None:
//           await this.startUnitOfWork(file)
//           break
//         case Status.Hash:
//           await this.calcHash(startTime)
//           break
//         case Status.Slice:
//           await this.calcSlice(startTime)
//           break
//         case Status.Check:
//           await this.check()
//           break
//         case Status.Upload:
//           await this.upload(startTime)
//           break
//         case Status.Done:
//           this.finishWork()
//           return
//         case Status.Error:
//           this.handleError()
//           return
//         /**@TODO**/
//       }
//       await nextTick()
//       this.run(file)
//     }
//   }

//   async startUnitOfWork(file: File) {
//     if (!hasher) {
//       hasher = await createMD5()
//     }
//     hasher.init()
//     this.status = Status.Slice
//     this.currFile = file
//     this.total = Math.ceil(file.size / CHUNK_SIZE)

//     console.time("slice")
//   }

//   async calcSlice(startTime: number) {
//     while (remainTime(startTime) && this.currSliceIdx < this.currFile!.size) {
//       const chunk = this.currFile!.slice(this.currSliceIdx, this.currSliceIdx += CHUNK_SIZE)
//       this.chunks.push(await read2buf(chunk))
//       i++
//     }

//     if (this.currSliceIdx >= this.currFile!.size) {
//       console.timeEnd("slice")
//       this.status = Status.Hash
//       console.time("md5")
//     }
//   }

//   calcHash(startTime: number) {
//     while (remainTime(startTime) && this.currHashIdx < this.chunks.length) {
//       hasher.update(new Uint8Array(this.chunks[this.currHashIdx]))
//       this.progress.value += 1 / this.total
//       this.currHashIdx++
//     }
//     if (this.currHashIdx >= this.chunks.length) {
//       this.currHash = hasher.digest()
//       console.timeEnd("md5")
//       this.currHashIdx = 0
//       this.status = Status.Upload
//     }
//   }

//   async check() {
//     const res = await apiBigFileCheck(this.currHash, CHUNK_SIZE)
//     /**
//      * data有值，data代表从data这一分片开始上传
//      * 如果没有，代表已经全部上传
//      */
//     if (res.error_code === ErrorCode.Success) {
//       if (isUndef(res.data)) {
//         this.uploadIdx = this.total
//       } else {
//         this.uploadIdx = res.data as number
//         this.status = Status.Upload
//       }
//     } else {
//       this.status = Status.Done
//     }
//   }

//   async upload(startTime: number) {
//     const len = this.total
//     while (remainTime(startTime) && this.uploadIdx < len) {
//       apiBigFileUpload(
//         new Blob([this.chunks[this.uploadIdx]]),
//         this.uploadIdx,
//         this.total,
//         CHUNK_SIZE,
//         this.courseId,
//         this.currHash,
//         this.uploadEvent
//       ).then(res => {
//         if (res.error_code !== ErrorCode.Success) {
//           this.status = Status.Error
//         }
//         return res
//       })

//       this.uploadIdx++
//     }
//   }

//   finishWork() {
//     this.status = Status.Done
//     this.preCheck.value = Flags.Success
//   }

//   handleError() {
//     this.preCheck.value = Flags.Fail
//   }

//   uploadEvent(e: ProgressEvent) {
//     this.progress.value += e.loaded / e.total / this.total
//   }
// }


// 时间分片算hash，不用worker也不会卡
// export const sliceAndHash = (file: File) => new Promise(async (resolve) => {
//   hasher.init()
//   const size = file.size
//   console.time("md5")
//   for (let i = 0; i < size; i += CHUNK_SIZE) {
//     await nextTick()
//     const chunk = file.slice(i, i + CHUNK_SIZE)
//     const buf = await read2buf(chunk)
//     hasher.update(new Uint8Array(buf))
//   }
//   const hash = hasher.digest()
//   console.timeEnd("md5")
//   resolve(hash)
// })