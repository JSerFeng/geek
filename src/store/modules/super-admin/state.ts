import type { InfoObj } from '../../../components/ad-form/hooks/useBlurCheck'

interface Admin {
  "id": string,
  "adminId": string,
  "adminName": string,
  "password": string,
  "courseName": string,
  "image": null | string,
  "registerTime": string,
  "type": "admin"
}

interface Data<T = Admin> {
  "total": number,
  "currentPage": number,
  "totalPage": number,
  "rows": number,
  "items": T[]
}

export type Response<T = Data> = {
  "error_code": number,
  "message": string,
  "data":T
}

export type AddAdminPayload<T = InfoObj> = {
  type:string, 
  payload:T
}

export type AdminState<T> = {
  adminList: Response | {data:{data:{}}},
  adminIdList:string[]
}

export const state: AdminState<Response | {data:{}}> = {
  adminList: {data:{data:{}}},
  adminIdList:[]
}