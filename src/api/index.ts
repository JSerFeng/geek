import request, { ErrorCode } from "./request"
import axios from "axios";
import '../mock/admin/index'
import { ElNotification } from "element-plus";
import { State } from '../store/modules/user/state'

export interface Response<T = any> {
  error_code: ErrorCode,
  message: string,
  data: T
}

export const getWeather = async (cityName = "重庆") => {
  try {
    const res = await axios.get("http://wthrcdn.etouch.cn/weather_mini?city=" + cityName)
    return res
  } catch ({ message }) {
    ElNotification({ message })
  }
}

export const login = async (userId: string, password: string) => request.post("/user/login", { userId, password }) as any as Response<{ user: State['userInfo'] }>

export const checkEmail = async (mail: string) => request.post("/user/checkEmail", { mail }) as any as Response

export const checkUserId = async (userId: string) => request.post("/user/checkUserId", { userId }) as any as Response

export const sendActiveMail = (type: number) => (userId: string, mail: string) => request.post("/user/sendActiveMail", {
  userId,
  mail,
  codeType: type
}) as any as Response

export const register = (
  userId: string,
  userName: string,
  password: string,
  mail: string,
  major: string,
  activeCode: string
) => request.post("/user/register", { userId, userName, password, mail, major, activeCode })

<<<<<<< HEAD
export const getPersonCount = (courseId?: string) => axios.post('/admin', { courseId }) as any as Response

export const adminSendEmail = (
  title: string,
  text: string,
  adminId?: string,
  courseId?: string,
  userIdList?: string,
) => axios.post('/admin/sendDailyMail', { adminId, courseId, userIdList, title, text }) as any as Response

export const getUserInfoList = (
  page?: number,
  rows?: number,
  courseId?: number
) => axios.get('/admin/queryUsersInfo', { params: { page, rows, courseId } }) as any as Response
=======
export const getPersonCount = () => request.post("")
>>>>>>> 02d3a35bd69cecd60ff4c42dba4f914a26b31de2
