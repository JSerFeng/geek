import { createStore, useStore as useBaseStore, Store } from 'vuex'
import { userStore } from './modules/user'
import { userListStore } from "./modules/userInfoList";
import { InjectionKey } from 'vue'
import { State } from './modules/user/state'
import { userListState } from './modules/userInfoList/state'
export interface RootState {
  user: State,
  userList:userListState,
}

export const key: InjectionKey<Store<RootState>> = Symbol()

const store = createStore({
  modules: {
    user: userStore,
    userList:userListStore
  }
})

export const useStore = () => {
  return useBaseStore(key)
}
export default store