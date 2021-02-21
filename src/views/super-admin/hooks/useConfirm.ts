import { useConfirm } from '../../../components/ad-form/hooks/useConfirm'
import { ref, Ref, toRaw } from 'vue'
import { ElMessage } from 'element-plus'
import { addAdmin } from '../../../api/index'
import { useStore } from '../../../store/index'
import { MutationTypes } from '../../../store/modules/super-admin/mutations'
export function useConfirmHook () {
    let adForm = ref<any>(null);
    let dialogVisible = ref<boolean>(false) as Ref<boolean>;
    const Store = useStore()
    function handleClose(done: () => void) {
        done();
      }
      async function handleConfirm() {
        if (useConfirm(adForm.value.infoObj)) {
          const res = await addAdmin(adForm.value.infoObj);
  
          if (res.data.error_code === 200) {
            Store.commit({
                type:`${MutationTypes.addAdmin}`,
                payload:adForm.value.infoObj
            })
            ElMessage.success("添加成功！");
            dialogVisible.value = false;
          } else {
            ElMessage.error("网络错误！");
          }
        } else {
          ElMessage.error("请核实一下信息！");
        }
        console.log(toRaw(Store.state.superAdmin))
        console.log(adForm.value.infoObj);
      }

      return {
          handleClose,
          handleConfirm,
          dialogVisible,
          adForm
      }
}