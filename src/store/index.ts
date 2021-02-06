import { createStore, useStore as useBaseStore, Store } from 'vuex'
import { userStore } from './modules/user'
import { InjectionKey } from 'vue'
import { State } from './modules/user/state'

interface RootState {
  user: State
}

export const key: InjectionKey<Store<RootState>> = Symbol()

const store = createStore({
  modules: {
    user: userStore
  }
})

export const useStore = () => {
  return useBaseStore(key)
}
export default store