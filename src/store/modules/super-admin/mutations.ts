import { MutationTree } from "vuex";
import { toRaw } from 'vue'
import { AdminState, Response, AddAdminPayload } from "./state";
export const enum MutationTypes {
  addAdminList = 'ADD_ADMIN_LIST',
  addAdmin = 'ADD_ADMIN'
}

export const mutations: MutationTree<AdminState<Response | { data: {} }>> = {
  [MutationTypes.addAdminList](state: AdminState<Response | { data: {} }>, payload: Response) {
    state.adminList = payload
  },
  [MutationTypes.addAdmin](state: any, payload:AddAdminPayload) {
    state.adminList.data.data.items.push(payload.payload)
    console.log(toRaw(state.adminList.data.data.items))
  }
}