import { storage } from "../utils/shared";
import request from "./request";
import { Response } from './index'
import { Course, State } from "../store/modules/user/state";

export const logout = () => request.post('/user/logout', {
  refreshToken: storage.get("refreshToken")
}) as Promise<Response>

export const login = async (userId: string, password: string) => request.post("/user/login", { userId, password }) as any as Response<{ user: State['userInfo'] }>

export const apiUpdateUserInfo = () => request.post("/user/updateInfo") as Promise<Response<State['userInfo']>>

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
) => request.post("/user/register", { userId, userName, password, mail, major, activeCode }) as Promise<Response>

export const chooseCourse = (courseId: number) => request.post("/user/chooseCourse", { courseId }) as Promise<Response>

export const delCourse = (courseId: number) => request.post("/user/delCourse", { courseId }) as Promise<Response>

export const queryCourse = () => request.post("/course/queryCourse") as Promise<Response<Course[]>>

export const queryMyCourse = () => request.post("/course/queryMyCourse") as Promise<Response<Course[]>>

export const findBackPassword = (userId: string, newPassword: string, activeCode: string) => request.post("/user/findBackPassword", {
  userId,
  newPassword,
  activeCode
}) as Promise<Response>

export const changeUserIntro = (userId: string, introduction: string) => request.post("/user/setIntroduce", {
  userId,
  introduce: introduction
}) as Promise<Response>

