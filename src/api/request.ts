import axios from 'axios'
import { ElNotification } from 'element-plus'
import { storage } from '../utils/shared'

type PendingQueue = ((...args: any) => void)[]

// const BASE_URL = 'http://localhost:3000/api'
const BASE_URL = 'http://120.79.138.134/'

const CONNECT_LIMIT = 6 // 最大网络连接数
const TIMEOUT = 1000 * 30 //最大请求到期时间 10s

export enum ErrorCode {
  Success = 200,
  Reject = 400,
  HasBeenUsed = 410,
  Error = 420,
  RefreshToken_Expire_Code = 432,
  No_Token = 425,
  Token_Expire_Code = 430,
  UserIdOrPasswordWrong = 435,
  Connect_Fail = 500,
  Abort = 510,
}

/** 当前请求数 */
let requestNum = 0
let pendingQueue: PendingQueue = []
let isRefreshing = false

/** 跳过token检查的请求 */
const whiteList = new Set([
  'http://wthrcdn.etouch.cn/',
  '/user/resetToken',
  '/user/login',
  '/user/register',
  '/user/checkEmail',
  '/user/checkUserId',
  '/user/sendActiveMail',
  '/user/logout',
  '/user/findBackPassword',
  '/user/checkUserLegality',
  '/token',
  '/course/queryCourse',
  '/article/queryArticles',
  '/article/queryOneArticle',
  '/announce/queryAnnounce',
  '/announce/queryOneAnnounce',
])


/**所有的大文件上传请求的取消函数会被放入这个队列 */
let pause = false
const BIG_FILE_URL = /announceUpload/;
let cancelQueue: Map<any, () => void> = new Map()
export const { port1: recvPort, port2: providePort } = new MessageChannel()
recvPort.onmessage = (e) => {
  if (e.data === true) {
    for (const [_, cancel] of cancelQueue) {
      cancel()
    }
    cancelQueue.clear()
    pause = true
  } else {
    pause = false
  }
}

const request = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
})

request.interceptors.request.use(
  async config => {
    requestNum++
    /*将取消请求的方法存在cancelQueue中，以后好取消全部的请求*/
    if (BIG_FILE_URL.test(config.url || '')) {
      if (!pause) {
        config.cancelToken = new axios.CancelToken(c => {
          cancelQueue.set(config, c)
        })
      } else {
        config.cancelToken = new axios.CancelToken(c => c())
      }
    }

    /**不需要token的请求 */
    if (!storage.get('token') && !whiteList.has(config.url!)) {
      config.cancelToken = new axios.CancelToken(c => c())
      return config
    }

    /**需要token的验证 */
    if (!config.headers.priority && (isRefreshing || requestNum > CONNECT_LIMIT)) { //如果正在请求新的token，代表当前token是过期了的
      try {
        await block() //等待前面的请求完
      } catch (e) {//这里表示等待时间过长, 仍然取消请求
        config.cancelToken = new axios.CancelToken(c => c())
        config.data.message = '超时'
        return config
      }
    }
    config.headers = {
      token: storage.get("token") || "",
      contentType: 'application/json;charset=utf-8',
    }
    return config
  },
  (err) => {
    /**请求发送前极少数可能出现此情况 */
    console.log("未知错误", err);
  }
)

request.interceptors.response.use(
  async res => {
    try {
      /**清掉已经得到结果的请求的cancel函数 */
      if (cancelQueue.has(res.config)) {
        cancelQueue.delete(res.config)
      }


      if (res.data.error_code === ErrorCode.Token_Expire_Code) {
        /**
         *  token过期有两种情况
         *  1.第一次过期, 重新请求token并且重新发送请求，将新的结果返回
         *  2.并发请求中，全部过期，但是刚才有一个请求已经检测到过期，
         *    于是已经重新获取token了，需要将这个请求重新发送
         *  两种情况的判定：通过isRefreshing来确定
         */
        if (!isRefreshing) { //第一次过期
          const notify = ElNotification({
            duration: 0,
            message: "亲很久没有登陆了，尝试自动登录中..."
          })
          try {
            console.log('refresh tk');
            await refreshToken()
            notify.close()
            ElNotification({
              message: "自动登陆成功^_^"
            })
          } catch (e) { //连refreshToken也失效了，需要重新登陆了
            notify.close()
            ElNotification({
              message: "需要重新登陆-_-|"
            })
            storage.clear()
            return e
          }
        } else {
          await block()
          console.log('re send after get new tk');
        }
        res.config.headers.priority = 1 //以高优先级立即重新去请求结果
        //返回新的请求
        const newRes = await request.request(res.config)
        return newRes
      }
      return res
    } finally {
      requestNum--
      send()
    }
  },
  err => {
    /** 只有网络连接失败和取消请求（没有携带token）会走到这里 */
    try {
      if (axios.isCancel(err)) { //是被取消的请求
        if (!storage.get('token')) { //因为没有token取消的，需要重新登陆
          return {
            data: {
              data: err,
              message: "未登陆",
              error_code: ErrorCode.No_Token
            }
          }
        }
        return {
          ...err,
          data: {
            message: "请求取消",
            error_code: ErrorCode.Abort
          }
        }
      }
      /** 网络异常或者有其它未知情况错误：比如说监听了ajax上传的回调函数。回调函数执行出错 */
      return {
        data: {
          data: err,
          message: "网络异常",
          error_code: ErrorCode.Connect_Fail
        }
      }
    } finally {
      requestNum--
      send()
    }
  }
)

request.interceptors.response.use(
  res => {
    switch (res.data.error_code) {
      case ErrorCode.HasBeenUsed:
      case ErrorCode.Reject:
      case ErrorCode.Abort:
      case ErrorCode.Success: {
        return res.data
      }
      default:
        ElNotification({
          message: res.data.message
        })
        return res.data
    }
  }
)

async function refreshToken() {
  try {
    isRefreshing = true
    const refreshToken = storage.get('refreshToken')
    const res = await request.post('/user/resetToken', {
      refreshToken
    }, {
      headers: {
        priority: 1 //刷新token是高权限请求可以在请求拦截器中直接插队执行
      }
    })
    if (!res.data.data && !res.data.data.token && !res.data.data.refreshToken) {
      console.log('refresh fail');
      throw {
        ...res,
        data: {
          error_code: ErrorCode.RefreshToken_Expire_Code
        }
      }
    }
    storage.set('token', res.data.data.token)
    storage.set('refreshToken', res.data.data.refreshToken)
  } catch (error) {  //如果refreshToken也过期, 清空过期期间的请求
    pendingQueue = []
    throw {
      ...error,
      data: {
        error_code: ErrorCode.RefreshToken_Expire_Code
      }
    }
  } finally {
    isRefreshing = false
  }
}

function block() {
  return new Promise((resolve, reject) => {
    const timerId: number = window.setTimeout(() => {
      reject(undefined)
    }, TIMEOUT)
    pendingQueue.push(() => {
      clearTimeout(timerId)
      resolve(undefined)
    })
  })
}

function send() {
  if (!isRefreshing && pendingQueue.length) {
    const resolve = pendingQueue.shift()!
    resolve(undefined)
  }
}

export default request