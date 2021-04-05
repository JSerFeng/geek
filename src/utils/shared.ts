import { BehaviorSubject } from "rxjs"
import { onMounted, onUnmounted, Ref, ref, watchEffect, toRaw } from "vue"
import { ElMessage } from 'element-plus'
import request, { ErrorCode } from "../api/request"
import { Response } from "../api"
import { Data } from "../store/modules/user/mutations"
import { useLink } from "vue-router"

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
    // @ts-ignore
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

interface Admin {
  "id": string,
  "adminId": string,
  "adminName": string,
  "password": string,
  "courseName": string,
  "image": null | string,
  "registerTime": string,
  "type": "admin"
}

type AdminList<T> = T[]

export function updateUser<T extends K[], K extends Admin>(arr: T, item: K): AdminList<Admin> {
  for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === item.id) {
          arr[i] = item
      }
  }
  return arr
}

export  function getValue<T extends {[key: string]: any}> (obj:T) {
  const res = {} as Record<keyof T,T[keyof T]>
  for(let i in obj){
      if(obj[i]){
          res[i] = obj[i]
      }
  }
  return res
}

export function deleteUser<T extends K[], K extends { adminId: string }>(userList: T, adminId: string): T {
  for (let i:number = 0; i < userList.length; i++) {
      if (userList[i].adminId === adminId) {
          userList.splice(i, 1)
      }
  }
  return userList
}

export function getIdList (userList:Admin[]):string[] {
  const res = userList.map((i:Admin)=>{
    return i.adminId
  })
  return res
}

export function filterAdminId(adminIdList: Admin[], deleteArr: string[]) {
  for (let i = 0; i < adminIdList.length; i++) {
      for (let j = 0; j < deleteArr.length; j++) {
          if (adminIdList[i].adminId === deleteArr[j]) {
              adminIdList.splice(i, 1)
          }
      }
  }
  return adminIdList
}