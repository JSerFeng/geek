import { MutationTree } from "vuex";
import { State } from "./state";

export const enum Types {
  Login = "Login"
}

export const mutations: MutationTree<State> = {
  [Types.Login](state, payload: State) {
    state.userInfo = payload
  }
}