import { BehaviorSubject } from "rxjs"
import { onMounted, onUnmounted, Ref, ref, watchEffect } from "vue"
import { ElMessage } from 'element-plus'
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

// 判断此管理员是否具有发送邮件的条件
export const adminSendEmail = (selValue:string, userIdArr:Set<string>):boolean => {
  if(selValue) {
    if(userIdArr.size !== 0) {
      ElMessage('只能选择一个具体报名的方向或者具体的学员发送邮件！')
      return false
    }
    return true
  }else{
    if(userIdArr.size === 0) {
      ElMessage('只能选择一个具体报名的方向或者具体的学员发送邮件！')
      return false
    }
    return true
  }
}


export const getRegistTime = (time:any):string => {
  if(!time){
    return '无'
  }
  return time
}