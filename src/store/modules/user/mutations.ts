import { MutationTree } from "vuex";
import { currentAuth } from "../../../router";
import { Auth } from '../../../router'
import { forEach, storage } from "../../../utils/shared";
import { Course, State, User } from "./state";

type Mutation = { "type": MutationTypes, "payload": any }

type M<T, P> = {
  type: T,
  payload: P
}

export type Data<Mut extends Mutation> = Pick<Mut, "payload">

export type Login = M<MutationTypes.Login, {
  user: State["userInfo"],
  token: string,
  refreshToken: string
}>
export type ChooseCourse = M<MutationTypes.ChooseCourse, Course[]>
export type Reset = M<MutationTypes.Reset, {
  directionVOList: Course[],
  allCourses: Course[]
}>
export type Intro = M<MutationTypes.ChangeIntro, string>

export const enum MutationTypes {
  Login = "login",
  Reset = "Reset",
  Logout = "Logout",
  ChooseCourse = "ChooseCourse",
  DelCourse = "DelCourse",
  AddCount = "AddCount",
  ChangeIntro = "ChangeIntro",
}

export const mutations: MutationTree<State> = {
  [MutationTypes.Login](state, { payload }: Data<Login>) {
    storage.store(payload.user)
    storage.set("token", payload.token)
    storage.set("refreshToken", payload.refreshToken)
    forEach(payload.user, (k: string, v: any) => {
      (state.userInfo as any)[k] = v
    })
    state.isLogin = true
    switch (payload.user.type) {
      case "admin":
        currentAuth.current |= Auth.ADMIN
        break
      case "super":
        currentAuth.current |= Auth.SUPER_ADMIN
        break
      default:
        currentAuth.current |= Auth.STUDENT
    }
  },
  [MutationTypes.Reset](state, { payload }: Data<Reset>) {
    state.isLogin = !!storage.get("token");
    const userInfo = state.userInfo as User
    if (state.isLogin) {
      const { directionVOList, allCourses } = payload
      storage.set("directionVOList", directionVOList)

      allCourses.forEach(item => state.allCourses.set(item.id, item))

      userInfo.userId = storage.get("userId");
      userInfo.major = storage.get("major");
      userInfo.mail = storage.get("mail");
      userInfo.introduce = storage.get("introduce");
      userInfo.refreshToken = storage.get("refreshToken");
      userInfo.id = storage.get("id");
      userInfo.token = storage.get("token");
      userInfo.grade = storage.get("grade");
      userInfo.registerTime = storage.get("registerTime");
      userInfo.userName = storage.get("userName");
      userInfo.receiveMail = storage.get("receiveMail");
      userInfo.directionVOList = directionVOList;
    }
  },
  [MutationTypes.Logout](state) {
    state.isLogin = false
    storage.clear()
  },
  [MutationTypes.ChooseCourse](state, { payload }: Data<ChooseCourse>) {
    const userInfo = state.userInfo as User
    userInfo.directionVOList = payload
    storage.set("directionVOList", payload)
  },
  [MutationTypes.DelCourse](state, { payload: courseId }: { payload: number }) {
    const userInfo = state.userInfo as User
    userInfo.directionVOList = userInfo.directionVOList.filter(item => item.courseId !== courseId)
    storage.set("directionVOList", userInfo.directionVOList)
  },
  [MutationTypes.ChangeIntro](state, { payload }: Data<Intro>) {
    (state.userInfo as User).introduce = payload
  }
};