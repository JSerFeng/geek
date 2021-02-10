import { MutationTree } from "vuex";
import { State } from "./state";

export const enum MutationTypes {
  Login = "login",
  Exit = "exit"
}

export const mutations: MutationTree<State> = {
  [MutationTypes.Login](state, payload: State) {
    state.userInfo = payload
  }
}