import { storage } from '../../../utils/shared'
import { actions } from './actions'
import { mutations } from './mutations'
import { state } from './state'

export const userStore = {
  state,
  actions,
  mutations,
  getters: {
    isLogin() {
      return !!storage.get("token")
    }
  }
}