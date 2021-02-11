import { BehaviorSubject } from "rxjs"
import { Ref, ref, watchEffect } from "vue"

export enum Flags {
  Fail = 0,
  Success = 1,
  Pending = 2,
  Normal = 3
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

export const debounce = (cb: Function, ms: number = 500) => {
  let timer: number | null = null
  return (...args: any) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(cb.bind(null, ...args), ms)
  }
}

export const useLocalCheck = (regex: RegExp | null = null) => (val: string) => {
  return !regex || regex.test(val)
}

export const useNetCheck = (
  checkFn: (data: string) => any
) => (content: Ref<string>, flag = ref(Flags.Pending), msg = ref("")) => {
  flag.value = Flags.Pending
  watchEffect(async () => {
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

export const fromVInput = (val: Ref<string>) => {
  const subject = new BehaviorSubject(val.value)
  watchEffect(() => {
    subject.next(val.value)
  })
  return subject
}