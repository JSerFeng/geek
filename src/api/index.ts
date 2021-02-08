import request from "./request"
import axios from "axios";

export const getWeather = async (cityName = "重庆") => {
  try {
    const res = await axios.get("http://wthrcdn.etouch.cn/weather_mini?city=" + cityName)
    return res
  } catch ({ message }) {
    // showMsg.warn(message)
  }
}

export const login = async (userId: string, password: string) => {
  return await request.post("/user/login", { userId, password })
}

export const checkEmail = async (mail: string) => {
  return await request.post("/user/checkEmail", { mail })
}

export const checkUserId = async (mail: string) => {
  return await request.post("/user/checkUserId", { mail })
}