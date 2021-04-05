import { MutationTree } from "vuex";
import { AdminState, Response, AddAdminPayload } from "./state";
import { updateUser, deleteUser, filterAdminId } from "../../../utils/shared";
export const enum MutationTypes {
  addAdminList = 'ADD_ADMIN_LIST',
  addAdmin = 'ADD_ADMIN',
  editAdmin = 'EDIT_ADMIN',
  deleteAdmin = 'DELETE_ADMIN',
  submitAdminIdList = 'SUBMIT_ADMIN_ID_LIST',
  deleteAdmins = 'DELETE_ADMINS'
}

interface Admin {
  "id": string,
  "adminId": string,
  "adminName": string,
  "password": string,
  "courseName": string,
  "image": null | string,
  "registerTime": string,
  "type": "admin"
}

interface Payload<T = Admin> {
  payload:T
}

type AdminList<T> = T[]

export const mutations: MutationTree<AdminState<Response | { data: {} }>> = {
  [MutationTypes.addAdminList](state: AdminState<Response | { data: {} }>, payload: Response) {
    state.adminList = payload
  },
  [MutationTypes.addAdmin](state: any, payload:AddAdminPayload) {
    state.adminList.data.data.items.push(payload.payload)
  },
  [MutationTypes.editAdmin](state:any, payload:Payload<{updateUser:Admin}>){
    state.adminList.data.data.items = updateUser<AdminList<Admin>, Admin>(state.adminList.data.data.items,payload.payload.updateUser)
  },
  [MutationTypes.deleteAdmin](state:any,payload:Payload<string>) {
    state.adminList.data.data.items = deleteUser<Admin[],Admin>(state.adminList.data.data.items,payload.payload)
  },
  [MutationTypes.submitAdminIdList](state:any, payload:Payload<string[]>) {
    state.adminIdList = payload.payload
  },
  [MutationTypes.deleteAdmins](state:any, payload:Payload<string[]>) {
    state.adminList.data.data.items = filterAdminId(state.adminList.data.data.items, payload.payload)
  }
}