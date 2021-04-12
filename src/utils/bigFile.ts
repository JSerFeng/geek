import { ElNotification } from 'element-plus'
import { ref, Ref } from 'vue'
import { apiBigFileCheck, apiBigFileMerge, apiBigFileUpload } from '../api/file'
import { ErrorCode } from '../api/request'
import { file2buffer, Flags } from './shared'
import worker from './worker2hash?worker'

const CHUNK_SIZE = 1024 * 1024 * 64

const hashMaker = new worker()

const getHash = (chunks: Blob[]) => new Promise(resolve => {
  hashMaker.postMessage(chunks)

  hashMaker.onmessage = (e: any) => {
    resolve(e.data as string)
  }
}) as Promise<string>

export function useBigFileUpload(
  courseId: number,
  id: number
): [Ref<Flags>, Ref<number>, (file: File) => () => void] {
  const checkStatus = ref(Flags.Normal)
  const progress = ref(0.00)

  const upload = (
    bigFile: File
  ) => {
    let _hash = ""
    let _file: ArrayBuffer | null = null
    const retry = async () => {
      let hash: string;
      console.log("计算切片中");
      let chunks: Blob[] = await getFileSlice(bigFile, 0);
      console.log("切片完毕");

      try {
        // fileBuf = _file ? _file : _file = await file2buffer(bigFile)
        console.log("计算hash");
        hash = await getHash(chunks)
        console.log("hash完毕");
      } catch (e) {
        ElNotification({
          message: "文件过大"
        })
        return
      }
      const size = bigFile.size
      // /**分片个数 */
      const total = Math.ceil(size / CHUNK_SIZE)

      /**预检查是不是已经上传 */
      const preData = await apiBigFileCheck(hash, CHUNK_SIZE)
      let startPos = 0
      checkStatus.value = Flags.Success
      if (preData.error_code === ErrorCode.Success) {
        if (!preData.data) {
          progress.value = 1.00
          return
        }
        startPos = preData.data
        progress.value = startPos / total
      } else if (preData.error_code !== ErrorCode.Reject) {
        ElNotification({
          message: "与服务器连接失败"
        })
        return
      }

      const onUploadProgress = (e: ProgressEvent) => {
        progress.value += (1 / total) * (e.loaded / e.total)
      }

      const allPromise = chunks.map(
        (chunk, i) => apiBigFileUpload(
          chunk, i + startPos, total, size, courseId, hash, onUploadProgress
        ).then(res => {
          if (res.error_code !== ErrorCode.Success) {
            throw res
          }
          return res
        })
      )

      try {
        await Promise.all(allPromise)
        progress.value = 1

        const res = await apiBigFileMerge(hash, id)
        if (res.error_code !== ErrorCode.Success) {
          throw res
        }
      } catch (err) {
        ElNotification({
          message: "上传失败，请在网络环境更好的时候继续上传，刷新网页后仍继续上传"
        })
        console.log("upload fail: ", err);
      }
    }
    retry()
    return retry
  }

  return [checkStatus, progress, upload]
}



const channel = new MessageChannel()
const port1 = channel.port1
const port2 = channel.port2

let _resolve: (data: any) => void
const nextTick = () => new Promise(resolve => {
  _resolve = resolve
  port2.postMessage(0)
})

port1.onmessage = () => {
  if (_resolve) {
    /**@ts-ignore */
    _resolve()
  }
}

export const getFileSlice = async (file: File, startPos: number) => {
  const size = file.size
  const chunks: Blob[] = []
  for (let i = startPos; i < size; i += CHUNK_SIZE) {
    await nextTick()
    chunks.push(file.slice(i, i + CHUNK_SIZE))
  }
  return chunks
}