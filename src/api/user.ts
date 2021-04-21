import { storage } from "../utils/shared";
import request from "./request";
import { Response } from './index'
import { Course, State } from "../store/modules/user/state";
import { ROW } from "../config/config";

export interface ApiAnnounce {
  "total": number,
  "currentPage": number,
  "totalPage": number,
  "rows": number,
  "items": {
    "id": number,
    "courseId": number,
    "adminId": string,
    "title": string,
    "addTime": string
  }[]
}

export interface ApiAnnounceDetail {
  "id": number,
  "courseId": number,
  "adminId": string,
  "adminName": string,
  "image": string,
  "title": string,
  "content": string,
  "addTime": string,
  "fileName": string,
  "filePath": string
}

export const logout = () => request.post('/user/logout', {
  refreshToken: storage.get("refreshToken")
}) as Promise<Response>

export const login = async (userId: string, password: string) => request.post("/user/login", { userId, password }) as any as Response<{ user: State['userInfo'] }>

export const apiUpdateUserInfo = () => request.get("/user/updateInfo") as Promise<Response<State['userInfo']>>

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

export const chooseCourse = (userId: string, courseId: number) => request.post("/user/chooseCourse", { userId, courseId }) as Promise<Response>

export const delCourse = (userId: string, courseId: number) => request.post("/user/delCourse", { userId, courseId }) as Promise<Response>

export const queryCourse = () => request.get("/course/queryCourse") as Promise<Response<Course[]>>

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

export const apiGetAnnounce = (page?: number, courseId?: number, rows?: number) => request.get("/announce/queryAnnounce", {
  params: {
    page: page || null,
    rows: rows || ROW,
    courseId: courseId || null
  }
}) as Promise<Response<ApiAnnounce>>

export const apiGetAnnounceDetail = (id: number) => request.get(`/announce/queryOneAnnounce/${id}`) as Promise<Response<ApiAnnounceDetail>>

export const apiChangePassword = (userId: string, password: string, newPassword: string, refreshToken: string) => request.post("/user/resetPassword", {
  userId, password, newPassword, refreshToken
}) as Promise<Response>

export const apiDelAnnounce = (id: number) => request.get("/announce/delAnnounce/" + id) as Promise<Response>

export const apiChangeMailStatus = (userId: string) => request.post("/user/changeReceiveMailStatus", {
  userId
}) as Promise<Response>
