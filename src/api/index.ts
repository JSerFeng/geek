import request, { ErrorCode } from "./request"
import axios from "axios";
<<<<<<< HEAD
import '../mock/admin/index'
=======
import { ElNotification } from "element-plus";

interface Response<T = any> {
  error_code: ErrorCode,
  message: string,
  data: T
}

>>>>>>> login
export const getWeather = async (cityName = "重庆") => {
  try {
    const res = await axios.get("http://wthrcdn.etouch.cn/weather_mini?city=" + cityName)
    return res
  } catch ({ message }) {
    ElNotification({ message })
  }
}

export const login = async (userId: string, password: string) => request.post("/user/login", { userId, password }) as any as Response

<<<<<<< HEAD
export const getPersonCount = async (courseId?: string) => {

  const personCount = await axios.post('/admin', { courseId })
  return personCount
}
export const checkEmail = async (mail: string) => {
  return await request.post("/user/checkEmail", { mail })
}
=======
export const checkEmail = async (mail: string) => request.post("/user/checkEmail", { mail }) as any as Response

export const checkUserId = async (userId: string) => request.post("/user/checkUserId", { userId }) as any as Response

export const sendActiveMail = (type: number) => (userId: string, mail: string) => request.post("/user/sendActiveMail", {
  userId,
  mail,
  codeType: type
}) as any as Response
>>>>>>> login

export const register = (
  userId: string,
  userName: string,
  password: string,
  mail: string,
  major: string,
  activeCode: string
) => request.post("/user/register", { userId, userName, password, mail, major, activeCode })