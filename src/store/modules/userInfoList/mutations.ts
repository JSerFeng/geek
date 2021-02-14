import { MutationTree } from "vuex";
import { userListState } from "./state";

export const enum MutationTypes {
  SetUserList = "SET_USER_LIST",
}

export const mutations: MutationTree<userListState> = {
  [MutationTypes.SetUserList](state, payload: userListState) {
    state.userInfo = payload
  },
}