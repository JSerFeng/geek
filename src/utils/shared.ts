import { Ref, ref, watchEffect } from "vue"
import { ErrorCode } from "../api/request"

export enum Flags {
  Fail = 0,
  Success = 1,
  Pending = 2,
  Waiting = 3
}

export const storage = {
  get(key: string) {
    return localStorage.getItem(key)
  },
  set(key: string, val: string | number | Record<any, any>) {
    if (typeof val === 'object') {
      val = JSON.stringify(val)
    } else if (typeof val === 'number') {
      val = val + ""
    }
    return localStorage.setItem(key, val)
  },
  clear() {
    return localStorage.clear()
  }
}
export const useLocalCheck = (regex: RegExp, title = "格式错误") => (content: Ref) => {
  const flag = ref(Flags.Waiting)
  const msg = ref("")
  watchEffect(() => {
    if (!content.value) {
      flag.value = Flags.Waiting
    } else if (regex.test(content.value)) {
      flag.value = Flags.Success
    } else {
      flag.value = Flags.Fail
      msg.value = title
    }
  })
  return { flag, msg }
}

export const useNetCheck = (
  checkFn: (data: string) => any
) => (content: Ref<string>, flag = ref(Flags.Pending), msg = ref("")) => {
  watchEffect(async () => {
    flag.value = Flags.Pending
    try {
      const res = await checkFn(content.value)
      flag.value = Flags.Success
      msg.value = res.message
    } catch (e) {
      flag.value = Flags.Fail
      msg.value = e.message
    }
  })
  return { flag, msg }
}

export const repeatMap = <T>(times: number, fn: (i: number) => T): T[] => {
  let i = 0;
  let res: T[] = new Array(times);
  for (; i < times; i++) {
    res.push(fn(i))
  }
  return res
}