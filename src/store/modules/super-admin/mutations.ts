import { MutationTree } from "vuex";
import { AdminState, Response } from "./state";

export const enum MutationTypes {
  addAdminList = 'ADD_ADMIN_LIST'
}

export const mutations: MutationTree<AdminState<Response | { data: {} }>> = {
  [MutationTypes.addAdminList](state: AdminState<Response | { data: {} }>, payload: Response) {
    state.adminList = payload
  }
}