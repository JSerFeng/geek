import { login } from '../../../api'
import { State } from './state'
import { ActionTree } from 'vuex'
import { Types } from './mutations'
interface Login { userId: string, password: string }

export const actions: ActionTree<State, State> = {
  async login({ commit }, payload: Login) {
    const {userId, password} = payload
    
    try {
      const res = await login(userId, password)
      commit(Types.Login, res.data.user)
    } catch (e) {
      console.log(e);
    }
  }
}