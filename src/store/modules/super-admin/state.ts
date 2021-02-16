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
  items: T[]
}

export type Response<T = Data> = {
  "error_code": number,
  "message": string,
  data:T
}


export type AdminState<T> = {
  adminList: Response | {data:{}}
}

export const state: AdminState<Response | {data:{}}> = {
  adminList: {data:{}}
}