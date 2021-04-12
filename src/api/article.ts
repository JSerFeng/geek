import request from "./request"
import { Response } from './index'

export interface Articles {
  "total": number,
  "currentPage": number,
  "totalPage": number,
  "rows": number,
  "items": {
    "id": number,
    "courseName": string,
    "adminId": string,
    "adminName": string,
    "image": string,
    "title": string,
    "content": string,
    "addTime": string,
    "articleType": string,
    "likeCount": number,
    "likeStatus": string,
    "favoriteStatus": string,
    "articleFileVOList": null
  }[]
}
export interface MyFavorites {
  "total": number,
  "currentPage": number,
  "totalPage": number,
  "rows": number,
  "items": {
    "id": number,
    "courseName": string,
    "adminId": string,
    "adminName": string,
    "image": null | string,
    "title": string,
    "articleType": string,
    "likeCount": 0,
    "favoriteTime": string
  }[]
}

export const apiQueryFavorites = (userId: string, page: number, rows = 10) => request.get("/favorite/queryFavorites", {
  params: {
    userId,
    page,
    rows
  }
}) as Promise<Response<MyFavorites>>

export const apiQueryMyArticles = (userId: string, page: number, rows = 10) => request.get("/article/queryMyArticles", {
  params: {
    userId,
    page,
    rows
  }
}) as Promise<Response<Articles>>

export const apiQueryArticles = (
  page: number,
  rows = 10,
  options: {
    userId: string | null,
    adminName: string | null,
    courseName: string | null
  }
): Promise<Response<Articles>> => {
  return request.get("/article/queryArticles", {
    params: {
      page,
      rows,
      ...options
    }
  })
}
