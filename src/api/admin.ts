import request from "./request";
import { Response } from './index'
import { isUndef } from "../utils/shared";

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

export const apiAddAnnounce = (
  adminId: string,
  courseId: number | undefined = undefined,
  title: string,
  content: string,
  file?: File
): Promise<Response<number>> => {
  const fd = new FormData()
  fd.set("adminId", adminId)
  !isUndef(courseId) && fd.set("courseId", courseId.toString())
  fd.set("title", title)
  fd.set("content", content)
  file && fd.set("file", file)

  return request.post("/announce/addAnnounce", fd)
}


export const delAnnounce = (id: number) => request.get("/announce/delAnnounce/" + id) as Promise<Response>

