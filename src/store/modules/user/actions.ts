import { ActionTree } from "vuex";
import { State } from "./state";
import { RootState } from '../../index'
import { MutationTypes } from './mutations'

const enum ActionTypes {
  Inc = "inc",
  Dec = "dec"
}
type Actions = ActionTree<State, RootState>

export const actions: Actions = {
  async [ActionTypes.Inc]({ commit }, msg: State) {
    commit(MutationTypes.Login, msg)
    // commit(MutationTypes.Login, 123) //should throw an error
  },
  async [ActionTypes.Dec]({ commit }) {
    commit(MutationTypes.Exit)
  }
}
