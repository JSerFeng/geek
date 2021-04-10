import { md5 } from 'hash-wasm'

self.onmessage = async (e) => {
  const ui8 = new Uint8Array(e.data as ArrayBuffer)
  const hash = await md5(ui8)
  postMessage({
    type: "hash",
    hash
  }, "*")
}
