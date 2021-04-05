import { ActionTree } from "vuex";
import { AdminState } from "./state";
import { RootState } from '../../index'
import { getAdminInfoList } from '../../../api/index'
import { MutationTypes } from './mutations'
import { ElMessage } from 'element-plus'
import '../../../mock/super-admin/index'
interface Params {
  page?: number,
  rows?: number,
  courseName?: string,
  adminName?: string,
  adminId?: string
}

type Payload<T = undefined> = T

export const enum ActionTypes {
  addAdminListAsycn = 'ADD_ADMIN_LIST_ASYNC'
}

export const actions: ActionTree<AdminState<Response | { data: {} }>, RootState> = {
  async [ActionTypes.addAdminListAsycn]({ commit }, payload?: Params) {
    const { page, rows, courseName, adminId, adminName } = payload as Payload<Params>
    const res = await getAdminInfoList(page, rows, courseName, adminName, adminId)
    if (res.data.error_code === 200) {
      commit(`${MutationTypes.addAdminList}`, res)
    } else {
      ElMessage('网络错误')
    }
  }
}