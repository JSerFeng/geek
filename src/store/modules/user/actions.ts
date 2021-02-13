import { ActionTree } from "vuex";
import { State } from "./state";
import { RootState } from '../../index'
import { login } from "../../../api";
import {
  MutationTypes,
  Login as MLogin
} from './mutations'
import { ErrorCode } from "../../../api/request";

type A<T, P> = {
  type: T,
  payload: P
}
type Data<Act extends { payload: any }> = {
  payload: Pick<Act, "payload">["payload"]
}


export const enum ActionTypes {
  Inc = "inc",
  Dec = "dec",
  Login = "login-user"
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
    const res = await login(userId, password)
    if (res.error_code === ErrorCode.Success) {
      commit<MLogin>({ type: MutationTypes.Login, payload: res.data.user })
    }
    return res
  }
}
