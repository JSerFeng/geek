import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, ref, toRaw } from 'vue'
import { deleleAdmins, deleteAdmin } from '../../../api/index'
import { useStore } from '../../../store/index'
import { deleteTaskById, getIdList } from '../../../utils/shared'
import { MutationTypes } from '../../../store/modules/super-admin/mutations'
interface Row {
    id: number;
    adminId: string;
    password: null | string;
    courseName: string;
    adminName: string;
  }
export function useDeleteAdmins () {
    const Store = useStore()
    let multipleTable = ref<any>(null);
    let multipleSelection: string[] = [];
    async function handleDeleteAdmins() {
        ElMessageBox.confirm("此操作将永久删除这些管理员, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            const adminIdArr = computed(() => Store.state.superAdmin.adminIdList);
           
            const res = await deleleAdmins(adminIdArr.value);
            if (res.error_code === 200) {
              Store.commit({
                type:`${MutationTypes.deleteAdmins}`,
                payload:adminIdArr.value
              })
              ElMessage.success(res.message);
            } else {
              ElMessage.error(res.message);
            }
          })
          .catch(() => {
            ElMessage("取消删除！");
          });
      }

      function handleSelectionChange(value: any) {
        multipleTable = value;
        const adminIdArr = getIdList(multipleTable)
        Store.commit({
          type:`${MutationTypes.submitAdminIdList}`,
          payload:adminIdArr
        })
      }

      function deAdmin(row: Row) {
        ElMessageBox.confirm(`确定要删除 "${row.adminName}" 吗？`, '', {
          confirmButtonText: "确定",
          cancelButtonText: '取消',
          center: true,
        }).then(async() => {
            const result =await deleteAdmin(row.adminId)
            console.log(result)
            if(result.error_code === 200){
              Store.commit({
                type:`${MutationTypes.deleteAdmin}`,
                payload:row.adminId
              })
              ElMessage({
                type: 'success',
                message: '删除成功!'
              });
            }else{
              ElMessage.error('网络错误!')
            }
          }).catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消删除'
            });
          });
        };
      return {
          handleDeleteAdmins,
          handleSelectionChange,
          deAdmin
      }
}