import { createMD5 } from 'hash-wasm'
import { IHasher } from 'hash-wasm/dist/lib/WASMInterface'

let hasher: IHasher | null = null

let pause = false
let hashIdx = 0
self.onmessage = async (e) => {
  const data = e.data as (ArrayBuffer[]) | boolean
  if (typeof data === "boolean") {
    pause = data
  } else {
    calcHash(data, e)
  }
}

async function calcHash(chunks: ArrayBuffer[], e: any) {
  if (!hasher) {
    hasher = await createMD5()
    hasher.init()
  }

  const len = chunks.length
  console.log("worker开始计算");
  console.time("hash")
  while (hashIdx < len) {
    if (pause) return
    hasher.update(new Uint8Array(chunks[hashIdx]))
    /**@ts-ignore */
    postMessage(hashIdx + 1)
    hashIdx++
  }
  const hash = hasher.digest()
  console.timeEnd("hash")
  hasher = null
  hashIdx = 0
  /**@ts-ignore */
  postMessage([hash, e.data], [...e.data])
}

<<<<<<< HEAD
async function readChunk(hasher: IHasher, file: Blob): Promise<any> {
  return new Promise((resolve, reject) => {
    const rd = new FileReader()
    rd.readAsArrayBuffer(file)
    rd.onload = () => {
      console.time("chunk");
      
      hasher.update(new Uint8Array(rd.result as ArrayBuffer))
      console.timeEnd("chunk");
      resolve()
    }
    rd.onerror = reject
  })
}
=======
// async function readChunk(hasher: IHasher, file: Blob): Promise<any> {
//   return new Promise((resolve, reject) => {
//     const rd = new FileReader()
//     rd.readAsArrayBuffer(file)
//     rd.onload = () => {
//       hasher.update(new Uint8Array(rd.result as ArrayBuffer))
//       /**@ts-ignore */
//       resolve()
//     }
//     rd.onerror = reject
//   })
// }
>>>>>>> 42c7d4a34261261d0ebde8cd85a95acf26dc715d
