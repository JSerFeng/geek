import { useStore } from '../../../store/index'
import { ActionTypes } from '../../../store/modules/super-admin/actions'

interface UsePage {
    handlePagenationChange:(value:number) => void
}

export function usePagenationChange ():UsePage {
    const Store = useStore()
    async function handlePagenationChange (value:number) {
        await Store.dispatch(`${ActionTypes.addAdminListAsycn}`, {page:value});
      }
      return {
          handlePagenationChange
      }
}