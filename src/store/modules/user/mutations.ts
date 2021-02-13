import { MutationTree } from "vuex";
import { State } from "./state";

type Mutation = { "type": MutationTypes, "payload": any }

type M<T, P> = {
  type: T,
  payload: P
}
export type Data<Mut extends Mutation> = Pick<Mut, "payload">

export type Login = M<MutationTypes.Login, State["userInfo"]>

export const enum MutationTypes {
  Login = "login",
  Dec = "Dec"
}


export const mutations: MutationTree<State> = {
  [MutationTypes.Login](state, { payload }: Data<Login>) {
    state.userInfo = payload
  }
}