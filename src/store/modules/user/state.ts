export type Course = {
  "id": number,
  "courseId": number,
  "addTime": string,
  "courseName": string
}

export interface Admin {
  "id": string,
  "userId": null,
  "adminId": string,
  "adminName": string,
  "password": string,
  "courseName": string,
  "image": null | string,
  "registerTime": string,
  "type": "admin",
  "token": string,
  "refreshToken": string
}
export interface User {
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
  "receiveMail": boolean,
  "type": null,
  "directionVOList": Course[],
  "token": string,
  "refreshToken": string,
}
export interface SuperAdmin {
  "id": 2,
  "userId": null,
  "adminId": string,
  "adminName": string,
  "password": string,
  "courseName": string,
  "image": null | string,
  "registerTime": null | string,
  "type": "super",
  "token": string,
  "refreshToken": string
}
export type State = {
  userInfo: Admin | SuperAdmin | User,
  isLogin: boolean,
  allCourses: Map<number, Course>
}

export const state: State = {
  userInfo: {
    "id": '',
    "userId": '',
    "userName": '',
    "mail": '',
    "password": '',
    "major": '',
    "sex": null,
    "image": null,
    "introduce": '',
    "grade": '',
    "registerTime": '',
    "receiveMail": false,
    "type": null,
    "directionVOList": [],
    "token": '',
    "refreshToken": '',
  },
  isLogin: false,
  allCourses: new Map()
}