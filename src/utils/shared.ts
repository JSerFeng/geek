import { BehaviorSubject } from "rxjs"
import { onMounted, toRaw, onUnmounted, Ref, ref, watchEffect, onBeforeUnmount, UnwrapRef } from "vue"
import { ElMessage, ElNotification } from 'element-plus'
import { ErrorCode } from "../api/request"
import { Response } from "../api"
import "./shared.scss"
import { useStore } from "../store"

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
    } catch (e) {
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
    if (typeof target !== "object" || target === null) {
      console.warn(target, "is not object")
      return
    }
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
    Reflect.ownKeys(objOrArr).forEach((key: keyof T) => fn(key, objOrArr[key as string]))
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
export const adminSendEmail = (selValue: string, userIdArr: Set<string>): boolean => {
  if (selValue) {
    if (userIdArr.size !== 0) {
      ElMessage('只能选择一个具体报名的方向或者具体的学员发送邮件！')
      return false
    }
    return true
  } else {
    if (userIdArr.size === 0) {
      ElMessage('只能选择一个具体报名的方向或者具体的学员发送邮件！')
      return false
    }
    return true
  }
}


export const getRegistTime = (time: any): string => {
  if (!time) {
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

  return [data, flag, dispatchRequest]
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

export function getValue<T extends { [key: string]: any }>(obj: T) {
  const res = {} as Record<keyof T, T[keyof T]>
  for (let i in obj) {
    if (obj[i]) {
      res[i] = obj[i]
    }
  }
  return res
}

export function deleteUser<T extends K[], K extends { adminId: string }>(userList: T, adminId: string): T {
  for (let i: number = 0; i < userList.length; i++) {
    if (userList[i].adminId === adminId) {
      userList.splice(i, 1)
    }
  }
  return userList
}

export function getIdList(userList: Admin[]): string[] {
  const res = userList.map((i: Admin) => {
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

export const useWithLoadingRef = <T>(defaultValue: T, defaultFlag: Flags = Flags.Normal): [Ref<Flags>, Ref<UnwrapRef<T>>] => {
  const newFlag = ref(defaultFlag)
  return [newFlag, ref(defaultValue)]
}

const openFileSelection = (): Promise<File | null> => new Promise((resolve) => {
  const file$ = document.createElement("input")
  file$.type = "file"
  file$.classList.add("file-input")
  function handleFileChange(e: Event) {
    const files = (e.target as HTMLInputElement).files
    resolve((files && files[0]) || null)
    file$.removeEventListener("change", handleFileChange)
  }
  file$.addEventListener("change", handleFileChange)
  file$.addEventListener("click", () => {
    document.body.removeChild(file$)
  })
  document.body.appendChild(file$)
  file$.click()
})

export function useDropUpload(
  checkFile: (file: File) => ([boolean, string] | Promise<[boolean, string]>),
  uploadFn?: (file: File) => any
): Ref<HTMLElement | undefined>;

export function useDropUpload(
  checkFile: (file: File) => (boolean | Promise<boolean>),
  uploadFn?: (file: File) => any
): Ref<HTMLElement | undefined>;

export function useDropUpload(
  checkFile: (file: File) => (boolean | Promise<boolean> | [boolean, string] | Promise<[boolean, string]>),
  uploadFn?: (file: File) => any
): Ref<HTMLElement | undefined> {
  checkFile = typeof checkFile === "function" ? checkFile : (file) => !!file
  const domRef = ref<HTMLElement>()
  const handler = async (e: Event) => {
    e.preventDefault();
    (e.target as HTMLElement).classList.remove("active-drag")
    const dataTransfer = (e as DragEvent).dataTransfer!
    dataTransfer.dropEffect = "link"
    const file = dataTransfer.files[0]
    if (!file) {
      ElNotification({
        message: "未选择文件"
      })
      return
    }
    const result = await checkFile(file)
    let valid: boolean
    let errMsg: string
    if (Array.isArray(result)) {
      valid = result[0]
      errMsg = result[1]
    } else {
      valid = result
      errMsg = "文件格式不符合要求"
    }
    if (!valid) {
      ElNotification({
        message: errMsg
      })
      return
    }
    uploadFn && uploadFn(file)
    resetStyle()
  }
  const handleClick = async () => {
    const file = await openFileSelection()
    if (!file) {
      ElNotification({
        message: "未选择文件"
      })
      return
    }
    const result = await checkFile(file)
    let valid: boolean
    let errMsg: string
    if (Array.isArray(result)) {
      valid = result[0]
      errMsg = result[1]
    } else {
      valid = result
      errMsg = "文件格式不符合要求"
    }
    if (!valid) {
      ElNotification({
        message: errMsg
      })
      return
    }
    uploadFn && uploadFn(file)
  }
  const handleDragstart = (e: Event) => {
    e.preventDefault();
    (e as DragEvent).dataTransfer!.effectAllowed = "link"
  }
  const handleDragover = (e: Event) => {
    e.preventDefault();
    (e as DragEvent).dataTransfer!.dropEffect = "link"
    addStyle()
  }
  const handleDragEnd = (e: Event) => {
    e.preventDefault();
    resetStyle()
  }
  const addStyle = () => {
    if (domRef.value) {
      domRef.value.classList.add("active-drag")
    }
  }
  const resetStyle = () => {
    if (domRef.value) {
      domRef.value.classList.remove("active-drag")
    }
  }
  onMounted(() => {
    if (domRef.value) {
      domRef.value!.addEventListener("click", handleClick)
      domRef.value!.addEventListener("drop", handler)
      document.addEventListener("dragstart", handleDragstart)
      document.addEventListener("dragover", handleDragover)
      document.addEventListener("drop", handleDragEnd)
    }
  })
  onBeforeUnmount(() => {
    if (domRef.value) {
      console.log("移除监听");
      domRef.value!.removeEventListener("click", handleClick)
      domRef.value!.removeEventListener("drop", handler)
      document.removeEventListener("dragstart", handleDragstart)
      document.removeEventListener("dragover", handleDragover)
      document.removeEventListener("drop", handleDragEnd)
    }
  })
  return domRef
}

type CourseName = 'Python' | '前端' | '后端' | '移动' | ''

export const computedCourse = (courseId: number): CourseName => {
  if (courseId === 1) return '前端'
  if (courseId === 2) return '后端'
  if (courseId === 3) return 'Python'
  if (courseId === 4) return '移动'
  return ''
}
export const file2buffer = (file: Blob) => new Promise((resolve, reject) => {
  // const reader = new FileReader()
  // reader.readAsArrayBuffer(file)
  // reader.onload = () => {
  //   resolve(reader.result as ArrayBuffer)
  // }
  // reader.onerror = (err) => {
  //   reject(err)
  // }

}) as Promise<ArrayBuffer>

export const showFileSize = (size: number = 0) => {
  if (!size) {
    return ""
  } else {
    let ext = ["Byte", "Kb", "M", "G", "TB(文件过大，不适宜发送)"]
    let i = 0
    let ret = size
    let mod = 0
    while (size >= 1024) {
      i++
      mod = size % 1024
      size = Math.floor(size / 1024)
      ret = size
    }

    return (ret + mod / 1024).toFixed(2) + ext[i]
  }
}

// 根据taskId删除对应homeworkList中的任务
export function deleteTaskById(homeworkList: Array<any>, taskId: number) {
  homeworkList.forEach((item, index) => {
    if (item.id === taskId) {
      console.log(index, homeworkList[index].id, taskId);
      homeworkList.splice(index, 1)
    }
  })
  return homeworkList
}

export function editTaskById(homeworkList: Array<any>, content: any) {
  homeworkList.forEach(item => {
    if (item.id === content.id) {
      item.taskName = content.taskName
      item.commitLate = content.commitLate
      item.courseId = content.courseId
      item.closeTime = content.effectiveTime
    }
  })
  console.log(toRaw(homeworkList))
  return homeworkList
}

export const isUndef = (x: unknown): x is (undefined | null) => {
  return typeof x === "undefined" || x === null
}

/**控制调度 */
const channel = new MessageChannel()
const port1 = channel.port1
const port2 = channel.port2

let pendingQueue: (() => void)[] = []
let activeQueue: Set<() => void> | null = null

port1.onmessage = () => {
  if (pendingQueue.length) {
    activeQueue = new Set([...pendingQueue])
    pendingQueue.length = 0
    pendingQueue = []
    for (const job of activeQueue) {
      job()
    }

    port2.postMessage(null)
  }
}

export const nextTick = (fn?: () => void) => new Promise(resolve => {
  /**@ts-ignore */
  pendingQueue.push(resolve)
  if (fn) {
    pendingQueue.push(fn)
  }
  port2.postMessage(null)
})

export interface Article {
  addTime: string;
  adminId: null | string;
  adminName: null | string;
  articleFileVOList: null | any[];
  articleType: string;
  content: string;
  courseName: null | string;
  favoriteStatus: number;
  id: number;
  image: null | string;
  likeCount: number;
  likeStatus: number;
  title: string;
}

export function deleteArticleById (id:number, articleList:Article[]){
  articleList.forEach((item, index)=>{
    if(item.id === id){
      articleList.splice(index, 1)
    }
  })}
export const checkIfLogin = (cb: (isLogin: boolean) => void) => {
  const store = useStore()
  cb(store.state.user.isLogin)
}


const SEC = 1000
const MIN = SEC * 60
const HOUR = MIN * 60
const DAY = HOUR * 24
const MONTH = DAY * 30
const YEAR = MONTH * 12
export const getTime = (time: string | Date | number) => {
  if (!time) return "未知时间"
  const now = Date.now()
  if (typeof time === "string") {
    time = Date.parse(time)
  } else if (typeof time === "object") {
    time = time.getTime()
  }
  const duration = now - time
  if (duration > YEAR) {
    return Math.floor(duration / YEAR) + "年前"
  } else if (duration > MONTH) {
    return Math.floor(duration / MONTH) + "月前"
  } else if (duration > DAY) {
    return Math.floor(duration / DAY) + "天前"
  } else if (duration > HOUR) {
    return Math.floor(duration / HOUR) + "小时前"
  } else if (duration > MIN) {
    return Math.floor(duration / MIN) + "分钟前"
  } else {
    return "刚刚"
  }
}
export const remainTime = (time: string | Date | number) => {
  const now = Date.now()
  if (typeof time === "string") {
    time = Date.parse(time)
  } else if (typeof time === "object") {
    time = time.getTime()
  }
  const duration = time - now
  if (duration > YEAR) {
    return Math.floor(duration / YEAR) + "年后"
  } else if (duration > MONTH) {
    return Math.floor(duration / MONTH) + "月后"
  } else if (duration > DAY) {
    return Math.floor(duration / DAY) + "天后"
  } else if (duration > HOUR) {
    return Math.floor(duration / MONTH) + "小时后"
  } else if (duration > MIN) {
    return Math.floor(duration / MIN) + "分钟后"
  } else {
    return "立刻"
  }
}

export const backToTop = () => {
  const view = document.querySelector(".view-main")!
  let prev = Infinity
  const frame = () => {
    if (view.scrollTop > prev) return
    prev = view.scrollTop
    view.scrollTop -= Math.ceil(view.scrollTop / 10)
    if (view.scrollTop > 0) {
      requestAnimationFrame(frame)
    }
  }
  frame()
}

export const getStudentScore = () => {

}