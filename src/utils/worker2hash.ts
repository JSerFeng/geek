import { createMD5 } from 'hash-wasm'
import { IHasher } from 'hash-wasm/dist/lib/WASMInterface'

self.onmessage = async (e) => {
  let hasher = await createMD5()
  hasher.init()
  const chunks = e.data as Blob[]
  
  const len = chunks.length
  console.log("worker开始计算");
  console.time("md5")
  for (let i = 0; i < len; i ++) {
    const chunk = chunks[i]
    await readChunk(hasher, chunk)
  }
  const hash = hasher.digest()
  console.timeEnd("md5")
  /**@ts-ignore */
  postMessage(hash)
}

async function readChunk(hasher: IHasher, file: Blob): Promise<any> {
  return new Promise((resolve, reject) => {
    const rd = new FileReader()
    rd.readAsArrayBuffer(file)
    rd.onload = () => {
      hasher.update(new Uint8Array(rd.result as ArrayBuffer))
      resolve()
    }
    rd.onerror = reject
  })
}
