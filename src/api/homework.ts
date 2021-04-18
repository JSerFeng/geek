import request from "./request";
import { Response } from '.'


export interface ApiMyHomeworkRecord {
  "total": number,
  "workPOList": {
    "id": number,
    "taskId": number,
    "courseId": number,
    "userId": string,
    "userVO": null,
    "addTime": string,
    "score": number,
    "weight": null,
    "filePath": string | null,
    "workFileVOList": []
  }[]
}

export interface ApiHomeworkRecord {
  "total": 10,
  "taskPOList": {
    "id": number,
    "courseId": number,
    "adminId": string,
    "taskName": string,
    "addTime": string,
    "closeTime": string,
    "commitLate": number,
    "isClosed": number,
    "weight": number,
    "taskFileVOList": {
      "fileName": string,
      "filePath": string,
      "addTime": string
    }[],
    "filePath": null
  }[]
}

export const apiQueryMyHomeworkRecord = (userId: string, courseId: number) => request.post("/work/queryAllMyWorks", {
  userId,
  courseId
}) as Promise<Response<ApiMyHomeworkRecord>>

export const apiQueryHomework = (courseId: number | null) => request.get("/task/queryTasks", {
  params: {
    courseId
  }
}) as Promise<Response<ApiHomeworkRecord>>

export const apiUploadHomeworkRecord = (taskId: number, courseId: number, userId: string) => request.post("/work/addWork", {
  taskId, courseId, userId
}) as Promise<Response<number>>

export const apiQueryOneWork = (userId: string, taskId: number) => request.get("/work/queryOneWork", {
  params: {
    userId, taskId
  }
}) as Promise<Response<{
  "id": number,
  "taskId": number,
  "courseId": number,
  "userId": string,
  "userVO": null,
  "addTime": "string",
  "score": 8,
  "weight": string,
  "filePath": string,
  "workFileVOList": {
    "fileName": string,
    "filePath": string,
    "addTime": string
  }[]
}>>

export const apiDeleteRecord = (userId: string, id: number) => request.post("/work/deleteWork", {
  userId, id
}) as Promise<Response>
