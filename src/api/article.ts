import request from "./request"
import { Response } from './index'

export interface Articles {
  "total": number,
  "currentPage": number,
  "totalPage": number,
  "rows": number,
  "items": Article[]
}

export interface Article {
  "id": number,
  "courseName": string,
  "adminId": string,
  "adminName": string,
  "image": string,
  "title": string,
  "articleType": string,
  "likeCount": 0,
  "favoriteTime": string,
  "likeStatus": number,
  "favoriteStatus": number,
}

export interface ArticleDetail {
  "id": number,
  "courseName": string,
  "adminId": string,
  "adminName": string,
  "image": string,
  "title": string,
  "content": string,
  "addTime": string
  "articleType": string,
  "likeCount": number,
  "likeStatus": number,
  "favoriteStatus": number,
  "articleFileVOList": {
    "articleId": number,
    "fileName": string,
    "filePath": string,
    "richText": string
  }[]
}

export const apiQueryFavorites = (userId: string, page: number, rows = 10) => request.get("/favorite/queryFavorites", {
  params: {
    userId,
    page,
    rows
  }
}) as Promise<Response<Articles>>

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
  userId: string | null,
  courseName: string | null,
  adminName: string | null,
): Promise<Response<Articles>> => {
  return request.get("/article/queryArticles", {
    params: {
      page,
      rows,
      userId,
      adminName,
      courseName
    }
  })
}

export const apiQueryDetail = (articleId: number) => request.get("/article/queryOneArticle", {
  params: {
    articleId
  }
}) as Promise<Response<ArticleDetail>>

export const apiChangeLikeStatus = (userId: string, articleId: number) => request.post("/like/changeLikeStatus", {
  userId,
  articleId
}) as Promise<Response>

export const apiChangeFavoriteState = (userId: string, articleId: number) => request.post("/favorite/changeFavoriteStatus", {
  userId,
  articleId
}) as Promise<Response>
