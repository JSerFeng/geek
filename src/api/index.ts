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

export const getPersonCount = () => request.post("")