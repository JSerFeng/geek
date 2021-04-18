import { MutationTree } from "vuex";
import { Article, Articles } from "../../../api/article";
import { currentAuth } from "../../../router";
import { Auth } from '../../../router'
import { storage } from "../../../utils/shared";
import { Course, State, User } from "./state";

type Mutation = { "type": MutationTypes, "payload": any }

type M<T, P> = {
  type: T,
  payload: P,
}

export type Data<Mut extends Mutation> = Pick<Mut, "payload">

export type Login = M<MutationTypes.Login, {
  user: State["userInfo"],
  token: string,
  refreshToken: string
}>
export type UpdateInfo = M<MutationTypes.UpdateUserInfo, State["userInfo"]>
export type ChooseCourse = M<MutationTypes.ChooseCourse, Course>
export type Reset = M<MutationTypes.Reset, {
  allCourses: Course[]
}>
export type Intro = M<MutationTypes.ChangeIntro, string>



export const enum MutationTypes {
  Login = "login",
  Reset = "Reset",
  UpdateUserInfo = "UpdateUserInfo",
  Logout = "Logout",
  ChooseCourse = "ChooseCourse",
  DelCourse = "DelCourse",
  AddCount = "AddCount",
  ChangeIntro = "ChangeIntro",
  ChangeAvatar = "ChangeIntro",
}

function updateUserInfo(state: State, info: State["userInfo"]) {
  storage.store(info)
  state.isLogin = true
  for (const k in info) {
    /**@ts-ignore */
    state.userInfo[k] = info[k]
  }
  switch (info.type) {
    case "admin":
      currentAuth.current |= Auth.ADMIN
      break
    case "super":
      currentAuth.current |= Auth.SUPER_ADMIN
      break
    default:
      currentAuth.current |= Auth.STUDENT
  }
}

export const mutations: MutationTree<State> = {
  [MutationTypes.Login](state, { payload }: Data<Login>) {
    storage.set("token", payload.token)
    storage.set("refreshToken", payload.refreshToken)
    updateUserInfo(state, payload.user)
  },
  [MutationTypes.UpdateUserInfo](state, { payload: info }: Data<UpdateInfo>) {
    updateUserInfo(state, info)
  },
  [MutationTypes.Reset](state, { payload }: Data<Reset>) {
    if (state.isLogin) {
      const { allCourses } = payload
      state.allCourses = allCourses
    }
  },
  [MutationTypes.Logout](state) {
    state.isLogin = false
    storage.clear()
  },
  [MutationTypes.ChooseCourse](state, { payload }: Data<ChooseCourse>) {
    const userInfo = state.userInfo as User
    userInfo.directionVOList.push(payload)
    storage.set("directionVOList", userInfo.directionVOList)
  },
  [MutationTypes.DelCourse](state, { payload: courseId }: { payload: number }) {
    const userInfo = state.userInfo as User
    userInfo.directionVOList = userInfo.directionVOList.filter(item => item.courseId !== courseId)
    storage.set("directionVOList", userInfo.directionVOList)
  },
  [MutationTypes.ChangeIntro](state, { payload }: Data<Intro>) {
    (state.userInfo as User).introduce = payload
  },
  [MutationTypes.ChangeAvatar](state, { payload: file }: { payload: Blob }) {
    /**@TODO */
    const url = URL.createObjectURL(file);
    (state.userInfo as User).image = url
  },
};