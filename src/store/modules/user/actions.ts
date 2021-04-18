import { ActionTree } from "vuex";
import { State, User } from "./state";
import { RootState } from '../../index'
import { Response } from "../../../api";
import {
  MutationTypes,
  Login as MLogin,
  Reset,
  UpdateInfo,
} from './mutations'
import { ErrorCode } from "../../../api/request";
import { logout, login, chooseCourse, delCourse, queryCourse, changeUserIntro, apiUpdateUserInfo } from "../../../api/user";
import { apiUploadAvatar } from "../../../api/file";
import { storage } from "../../../utils/shared";
import { ROW } from "../../../config/config";

type A<T, P> = {
  type: T,
  payload: P
}
type Data<Act extends { payload: any }> = {
  payload: Pick<Act, "payload">["payload"]
}

export enum ActionTypes {
  Login = "login-user",
  Logout = "logout",
  UpdateUserInfo = "UpdateUserInfo",
  Reset = "reset",
  ChooseCourse = "ChooseCourse",
  DelCourse = "DelCourse",
  ChangeIntro = "ChangeIntro",
  ChangeAvatar = "ChangeIntro",
}

type Login = A<ActionTypes.Login, {
  userId: string,
  password: string
}>

export type Actions =
  | Login

export const actions: ActionTree<State, RootState> = {
  async [ActionTypes.UpdateUserInfo]({ state, commit }) {
    let token = storage.get("token")
    if (!token) {
      return
    }
    const res = await apiUpdateUserInfo()
    if (res.error_code === ErrorCode.Success) {
      commit<UpdateInfo>({
        type: MutationTypes.UpdateUserInfo,
        payload: res.data
      })
    }
  },
  async [ActionTypes.Login]({ commit, dispatch }, { payload }: Data<Login>) {
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
  async [ActionTypes.Reset]({ commit, state }) {
    if (state.isLogin) {
      /**每次登陆都请求一下某些可能会变的数据，重新存储下来 */
      const allCourses = await queryCourse()
      if (allCourses.error_code !== ErrorCode.Success) {
        allCourses.data = []
      }
      commit<Reset>({
        type: MutationTypes.Reset,
        payload: {
          allCourses: allCourses.data
        }
      })
    }
  },
  async [ActionTypes.ChooseCourse]({ commit, state }, courseId: number) {
    const res = await chooseCourse(courseId)
    if (res.error_code !== ErrorCode.Success) {
      return res
    }
    const addCourse = state.allCourses.find(item => item.courseId === courseId)
    commit({ type: MutationTypes.ChooseCourse, payload: addCourse })
  },
  async [ActionTypes.DelCourse]({ commit }, courseId: number) {
    const res = await delCourse(courseId)
    if (res.error_code !== ErrorCode.Success) {
      return res
    }
    commit({ type: MutationTypes.DelCourse, payload: courseId })
  },
  async [ActionTypes.ChangeIntro]({ state, commit }, intro: string) {
    if (!intro) return false
    const res = await changeUserIntro((state.userInfo as User).userId, intro)
    if (res.error_code === ErrorCode.Success) {
      commit({
        type: MutationTypes.ChangeIntro,
        payload: intro
      })
      return res
    }
    return false
  },
  async [ActionTypes.ChangeAvatar]({ state, commit }, file: File) {
    const userInfo = state.userInfo as User

    const res = await apiUploadAvatar(userInfo.userId, file)
    if (res.error_code === ErrorCode.Success) {
      commit({
        type: MutationTypes.ChangeAvatar,
        payload: file
      })
    }
  },
}
