import { MutationTree } from 'vuex'
import {  rootState, File } from './state'
export const enum MutationTypes  {
    addFiles = 'ADD_FILES'
}

interface Payload<T> {
    payload:T
}

export const mutations:MutationTree<rootState> = {
    [MutationTypes.addFiles](state:rootState, payload:Payload<File[]>){
        state.currentFiles = payload.payload
    }
}