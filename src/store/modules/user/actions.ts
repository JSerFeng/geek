import { ActionTree } from "vuex";
import { State } from "./state";
import { RootState } from '../../index'
import { Response } from "../../../api";
import {
  MutationTypes,
  Login as MLogin,
  Reset
} from './mutations'
import { ErrorCode } from "../../../api/request";
import { logout, login, queryMyCourse, chooseCourse, delCourse, queryCourse } from "../../../api/user";

type A<T, P> = {
  type: T,
  payload: P
}
type Data<Act extends { payload: any }> = {
  payload: Pick<Act, "payload">["payload"]
}


export const enum ActionTypes {
  Login = "login-user",
  Logout = "logout",
  Reset = "reset",
  ChooseCourse = "ChooseCourse",
  DelCourse = "DelCourse"
}

type Login = A<ActionTypes.Login, {
  userId: string,
  password: string
}>

export type Actions =
  | Login

export const actions: ActionTree<State, RootState> = {
  async [ActionTypes.Login]({ commit }, { payload }: Data<Login>) {
    const { userId, password } = payload
    const res = await login(userId, password) as Response<{
      token: string,
      refreshToken: string,
      user: State["userInfo"]
    }>
    if (res.error_code === ErrorCode.Success) {
      commit<MLogin>({ type: MutationTypes.Login, payload: res.data })
    }
    return res
  },
  async [ActionTypes.Logout]({ commit }) {
    const res = await logout()
    if (res.error_code === ErrorCode.Success) {
      commit(MutationTypes.Logout)
    }
  },
  async [ActionTypes.Reset]({ commit }) {
    /**每次登陆都请求一下某些可能会变的数据，重新存储下来 */
    const myCourses = await queryMyCourse()
    if (myCourses.error_code !== ErrorCode.Success) {
      myCourses.data = []
    }
    const allCourses = await queryCourse()
    if (allCourses.error_code !== ErrorCode.Success) {
      allCourses.data = []
    }
    commit<Reset>({
      type: MutationTypes.Reset,
      payload: {
        directionVOList: myCourses.data,
        allCourses: allCourses.data
      }
    })
  },
  async [ActionTypes.ChooseCourse]({ commit }, courseId: number) {
    const res = await chooseCourse(courseId)
    if (res.error_code !== ErrorCode.Success) {
      return res
    }
    const queryRes = await queryMyCourse()
    if (queryRes.error_code !== ErrorCode.Success) {
      return queryRes
    }
    commit({ type: MutationTypes.ChooseCourse, payload: queryRes.data })
  },
  async [ActionTypes.DelCourse]({ commit }, courseId: number) {
    const res = await delCourse(courseId)
    if (res.error_code === ErrorCode.Success) {
      commit({ type: MutationTypes.DelCourse, payload: courseId })
    }
  }
}
