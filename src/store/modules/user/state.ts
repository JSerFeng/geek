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
interface User{
  "id": string,
  "userId": string,
  "userName": string,
  "mail": string,
  "password": string,
  "major": string,
  "sex": null | string,
  "image": null | string,
  "introduce": string,
  "grade": string,
  "registerTime": string,
  "receiveMail": boolean
}
interface SuperAdmin {
  "id": 2,
  "adminId": string,
  "adminName": string,
  "password": string,
  "courseName": string,
  "image": null | string,
  "registerTime": null | string,
  "type": "super"
}
export type State = {
  userInfo?: Admin | SuperAdmin | User | {}
}

export const state: State = {}