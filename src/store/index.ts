import { createStore, useStore as useBaseStore, Store } from 'vuex'
import { userStore } from './modules/user'
import { userListStore } from "./modules/userInfoList";
import { adminStore } from './modules/super-admin/index'
import { InjectionKey } from 'vue'
import { State } from './modules/user/state'
import { userListState } from './modules/userInfoList/state'
import { AdminState } from './modules/super-admin/state'

export interface RootState {
  user: State,
  userList:userListState,
  superAdmin:AdminState<any>
}

export const key: InjectionKey<Store<RootState>> = Symbol()

const store = createStore({
  modules: {
    user: userStore,
    userList:userListStore,
    superAdmin:adminStore
  }
})

export const useStore = () => {
  return useBaseStore(key)
}
export default store