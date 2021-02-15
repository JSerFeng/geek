import { BehaviorSubject } from "rxjs"
import { onMounted, onUnmounted, Ref, ref, watchEffect } from "vue"
import request, { ErrorCode } from "../api/request"
import { Response } from "../api"
import { Data } from "../store/modules/user/mutations"

export enum Flags {
  Fail = 0,
  Success = 1,
  Pending = 2,
  Normal = 3
}

export const storage = {
  get(key: string) {
    try {
      const item = localStorage.getItem(key)
      return item && JSON.parse(item)
    } catch(e) {
      return localStorage.getItem(key)
    }
  },
  set(key: string, val: string | number | Record<any, any>) {
    if (typeof val === 'object') {
      val = JSON.stringify(val)
    } else if (typeof val === 'number') {
      val = val + ""
    }
    return localStorage.setItem(key, val)
  },
  store(target: Record<any, any>) {
    forEach(target, (k, v) => {
      if (v) {
        if (typeof v === 'object') {
          v = JSON.stringify(v)
        }
        localStorage.setItem(k, v + "")
      }
    })
  },
  clear() {
    return localStorage.clear()
  }
}

export const forEach = <T extends Record<string, any> | Array<any>>(
  objOrArr: T,
  fn: T extends Array<any>
    ? (val: T[keyof T], i: number) => void
    : (k: string, v: any) => void
) => {
  if (objOrArr instanceof Array) {
    return objOrArr.forEach(fn)
  } else {
    Reflect.ownKeys(objOrArr).forEach(key => fn(key, objOrArr[key as string]))
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

export const useRefreshCheck = () => {
  function onBeforeLoad(e: BeforeUnloadEvent) {
    const dialogText = '确定刷新吗，如果刷新需要重新填写注册';
    e.returnValue = dialogText;
    return dialogText;
  };
  onMounted(() => {
    window.addEventListener("beforeunload", onBeforeLoad)
  })
  onUnmounted(() => {
    window.removeEventListener("beforeunload", onBeforeLoad)
  })
}

export const useRequest = <DataType extends any = any, T extends Array<any> = Array<any>>(
  fn: (...args: T) => Promise<Response<DataType>>
) => (...args: T): [Ref<Response<DataType> | null>, Ref<Flags>, () => void] => {
  const data: Ref<Response<DataType> | null> = ref(null)
  const flag = ref<Flags>(Flags.Pending)

  const dispatchRequest = () => {
    fn(...args).then(
      res => {
        if (res.error_code === ErrorCode.Success) {
          flag.value = Flags.Success
        } else {
          flag.value = Flags.Fail
        }
        data.value = res
      }
    )
  }
  dispatchRequest()

  const retry = () => {
    dispatchRequest()
  }

  return [data, flag, retry]
}