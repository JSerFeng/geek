import { useStore } from '../../../store/index'
import { ActionTypes } from '../../../store/modules/super-admin/actions'
import { ref, Ref,  } from 'vue'
import { ElMessage } from 'element-plus'

interface SearchAdmin {
    handleSearchAdmin:(name:string) => void,
    searchInput:Ref<string>
}

export function useSearchAdmin ():SearchAdmin {
    const Store = useStore()
    let searchInput = ref<string>("");


    async function search (name:string) {
        await Store.dispatch(`${ActionTypes.addAdminListAsycn}`, {adminName:name});
    }
    async function handleSearchAdmin() {
        if(searchInput.value !== '') {
            search(searchInput.value)
        }else{
            ElMessage('用户名不能为空！')
        }
    }

    return {
        handleSearchAdmin,
        searchInput
    }
}