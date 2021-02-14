interface UserInfoItem {
  userId: string,
  userName: string,
  mail: string,
  major: string,
  image: null | string,
  grade: null | string
}
interface UserInfoObj <T> {
  total: number,
  currentPage: number,
  totalPage: number,
  rows: number,
  items: T[]
}



export type userListState = {
  userInfo?: {} | {userInfo:UserInfoObj<UserInfoItem>}
}

export const state: userListState = {
  userInfo:{},
}