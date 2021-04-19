import { MutationTree } from 'vuex'
import {  rootState, File } from './state'
export const enum MutationTypes  {
    addFiles = 'ADD_FILES',
    uploadFile = 'UPLOAD_FILE',
    deleteFile = 'DELETE_FILE'
}

interface Payload<T> {
    payload:T
}

export const mutations:MutationTree<rootState> = {
    [MutationTypes.addFiles](state:rootState, payload:Payload<File[]>){
        state.currentFiles = payload.payload
    },
    [MutationTypes.uploadFile](state:rootState, payload:Payload<File>){
        state.currentFiles.push(payload.payload)
    },
    [MutationTypes.deleteFile](state:rootState, payload:Payload<string>){
        state.currentFiles.forEach((file, index)=>{
            if(file.fileName === payload.payload){
                state.currentFiles.splice(index, 1)
            }
        })
    }
}