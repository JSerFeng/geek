interface UserInfoItem {
  userId: string,
  userName: string,
  mail: string,
  major: string,
  image: null | string,
  grade: null | string
}
type UserInfoObj = {
  total: number,
  currentPage: number,
  totalPage: number,
  rows: number,
  items: UserInfoItem[]
}
const user: UserInfoObj = {
  "total": 4,
  "currentPage": 1,
  "totalPage": 1,
  "rows": 10,
  "items": [
      {
          "userId": "2019211290",
          "userName": "喜喜",
          "mail": "1114550440@qq.com",
          "major": "信管",
          "image": null,
          "grade": null
      },
      {
          "userId": "2019666",
          "userName": "验证邮箱",
          "mail": "2534232295@qq.com",
          "major": "电子商务",
          "image": "/image/picture5-2019666.jpg",
          "grade": null
      },
      {
          "userId": "2019777",
          "userName": "kkk",
          "mail": "wangjiahui20011014@163.com",
          "major": "信管",
          "image": null,
          "grade": null
      },
      {
          "userId": "201922222",
          "userName": "come",
          "mail": "wangjiahui20011014@163.com",
          "major": "电商",
          "image": null,
          "grade": "2021"
      }
  ]
}
export type State = {
  userInfoList?: {}
}

export const state: State = {}