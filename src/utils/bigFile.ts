import { ElNotification } from 'element-plus'
import { md5 } from 'hash-wasm'
import { ref } from 'vue'
import { apiBigFileCheck, apiBigFileMerge, apiBigFileUpload } from '../api/file'
import { ErrorCode } from '../api/request'
import { file2buffer, Flags } from './shared'
import worker from './worker2hash?worker'

const CHUNK_SIZE = 1024 * 1024 * 10

const hashMaker = new worker()


export async function makeHash(file: ArrayBuffer) {
  hashMaker.postMessage({
    type: "hash",
    file
  }, [file])
}



export function useBigFileUpload(
  bigFile: File,
  courseId: number,
  id: number
) {
  const checkStatus = ref(Flags.Pending)
  const progress = ref(0)
  const done = ref(false)

  let _hash = ""
  let _file: ArrayBuffer | null = null
  const retry = async () => {
    const fileBuf = _file ? _file : _file = await file2buffer(bigFile)
    const size = fileBuf.byteLength
    const total = Math.ceil(size / CHUNK_SIZE)
    checkStatus.value = Flags.Pending
    const hash = _hash ? _hash : _hash = await getHash(fileBuf)

    progress.value = 0
    done.value = false
    checkStatus.value = Flags.Pending

    /**预检查是不是已经上传 */
    const preData = await apiBigFileCheck(hash, CHUNK_SIZE)
    let startPos = 0
    checkStatus.value = Flags.Success
    if (preData.error_code === ErrorCode.Success) {
      if (!preData.data) {
        progress.value += total
        done.value = true
        return
      }
      startPos = preData.data
    } else if (preData.error_code !== ErrorCode.Reject) {
      ElNotification({
        message: "与服务器连接失败"
      })
      return
    }

    const chunks = getFileSlice(fileBuf, startPos)
    const allPromise = chunks.map(
      (chunk, i) => apiBigFileUpload(chunk, i + startPos, total, size, courseId, hash)
        .then(res => {
          if (res.error_code !== ErrorCode.Error) {
            throw res
          }
        })
    )

    try {
      await Promise.all(allPromise)

      const res = await apiBigFileMerge(hash, id)
      if (res.error_code !== ErrorCode.Success) {
        throw res
      }
    } catch (err) {
      ElNotification({
        message: "上传失败，请在网络环境更好的时候继续，或刷新网页后续传"
      })
      console.log("upload fail: ", err);
    }
  }
  retry()

  return [checkStatus, progress, done, retry]
}


export const getHash = (file: ArrayBuffer) => new Promise((resolve) => {
  hashMaker.postMessage(file, [file])
  const listener = (e: any) => {
    resolve(e.data as string)
    hashMaker.removeEventListener("message", listener)
  }
  hashMaker.addEventListener("message", listener)
}) as Promise<string>

export const getFileSlice = (file: ArrayBuffer, startPos: number, cb?: (chunk: ArrayBuffer | null, idx: number, done: boolean) => void) => {
  const size = file.byteLength
  const chunks: ArrayBuffer[] = []
  for (let i = startPos * CHUNK_SIZE; i < size; i += CHUNK_SIZE) {
    const chunk = file.slice(i, i + CHUNK_SIZE)
    chunks.push(chunk)
    cb && cb(chunk, i, false)
  }
  cb && cb(null, -1, true)
  return chunks
}