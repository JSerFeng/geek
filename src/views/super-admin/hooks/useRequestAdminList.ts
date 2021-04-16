import { onMounted, reactive, toRaw, watch } from 'vue'
import  store, { useStore } from '../../../store/index'
import { ActionTypes } from '../../../store/modules/super-admin/actions'

interface TableData<T = any> {
    data:T,
    total:number
}

interface Admin {
    id:number,
    adminId:string,
    courseName:string,
    image:null | string,
    adminName:string,
    type:'admin',
    password:string | null,
    registerTime:null | string
}

export function useRequestAdminList () {
    const Store = useStore()
    const tableData = reactive<TableData<Admin[]>>({
        data: [
          {
            adminId: "2019133111",
            adminName: "来了",
            courseName: "后端JAVA",
            id: 5,
            image: null,
            password: null,
            registerTime: null,
            type: "admin",
          },
        ],
        total:0
      });
      onMounted(async () => {
        await Store.dispatch(`${ActionTypes.addAdminListAsycn}`, {page:1});
        console.log(Store)
        tableData.data = Store.state.superAdmin.adminList.data.data.items;
        tableData.total = Store.state.superAdmin.adminList.data.data.total
      });
      watch(()=>Store.state.superAdmin.adminList.data.data.items,(val)=>{
        tableData.data = val
      })
    return {
        tableData
    }
}