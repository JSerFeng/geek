import { getValue } from '../../../utils/shared'
import { reactive, ref, Ref, toRaw } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useConfirm } from "../../../components/ad-form/hooks/useConfirm";
import { editAdmin } from "../../../api/index";
import { useStore } from '../../../store/index'
import { MutationTypes } from '../../../store/modules/super-admin/mutations'
interface Row {
    id: number;
    adminId: string;
    password: null | string;
    courseName: string;
    adminName: string;
  }

export function useEditAdmin () {
    const Store = useStore()
    let dialogVisible = ref<boolean>(false);
    let adFormRef = ref(null) as Ref<any>;
    const rowInfo: Row = reactive({
        id: 1,
        adminId: "",
        password: "",
        courseName: "",
        adminName: "",
        image: "",
        registerTime: "",
        types: "admin",
      });
      function handleEditAdmin(row: Row) {
        console.log(toRaw(row))
        const { id, adminName, adminId, password, courseName } = row;
        rowInfo.id = id;
        rowInfo.adminId = adminId;
        rowInfo.courseName = courseName;
        rowInfo.password = password;
        rowInfo.adminName = adminName;
        dialogVisible.value = true;
      }
    async function handleConfirmEdit() {
        const updateInfo = {
          ...rowInfo,
          ...getValue(adFormRef.value.infoObj),
        };
        if (JSON.stringify(rowInfo) === JSON.stringify(updateInfo)) {
          ElMessage.error("请核实信息！");
        } else {
          if (useConfirm(updateInfo)) {
            const res = await editAdmin(updateInfo);
            if (res.data.error_code === 200) {
              Store.commit({
                type: `${MutationTypes.editAdmin}`,
                payload: {
                  updateUser: updateInfo,
                },
              });
              dialogVisible.value = false;
            } else {
              ElMessage.error("网络错误！");
            }
          } else {
            ElMessage.error("请核实信息！");
          }
        }
      }
      function handleClose(done: () => void) {
        done();
      }
      
      return {
        handleConfirmEdit,
        handleEditAdmin,
        rowInfo,
        dialogVisible,
        adFormRef,
        handleClose
      }
}