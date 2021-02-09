import request from "./request"
import axios from "axios";
import '../mock/admin/index'
export const getWeather = async (cityName = "重庆") => {
  try {
    const res = await axios.get("http://wthrcdn.etouch.cn/weather_mini?city=" + cityName)
    return res
  } catch ({message}) {
    // showMsg.warn(message)
  }
}

export const login = async (userId: string, password: string) => {
  console.log("api");
  console.log(userId, password);
  
  return await request.post("/user/login", { userId, password })
}

export const getPersonCount = async (courseId?:string) => {

  const personCount = await axios.post('/admin',{courseId})
  return personCount
}