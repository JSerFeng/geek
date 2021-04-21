import { storage, useDropUpload } from "../../../utils/shared"
import { apiChangePassword, logout } from '../../../api/user'
import { ErrorCode } from "../../../api/request"
import store, { useStore } from "../../../store"
import { ActionTypes } from "../../../store/modules/user/actions"
import { ElNotification } from 'element-plus'
import { ref, Ref } from 'vue'
interface ModalMethods {
  close(): void
  open(): void
}

const AVATAR_FILE_MIME = new Set([
  "image/jpeg",
  "image/gif",
  "image/pipeg",
  "image/png",
])

export const useImgUpload = () => {
  const store = useStore()
  const domRef = useDropUpload(
    file => {
      return AVATAR_FILE_MIME.has(file.type)
    },
    async file => {
      store.dispatch(ActionTypes.ChangeAvatar, file)
    }
  )
  return domRef
}

export const useChangePassword = (
  changePasswordModal: Ref<ModalMethods | undefined | null>
): [
    Ref<string>,
    Ref<string>,
    Ref<string>,
    () => Promise<boolean>,
    () => void
  ] => {
  const oldPassword = ref("")
  const newPassword = ref("")
  const newPasswordConfirm = ref("")

  const changePassword = async () => {
    const refreshTK = storage.get("refreshToken")
    const userId = store.state.user.userInfo.userId
    if (!userId || !refreshTK) {
      ElNotification({
        message: "登陆状态不对劲，尝试重新登陆"
      })
      return false
    }
    const res = await apiChangePassword(userId, oldPassword.value, newPassword.value, refreshTK)
    if (res.error_code === ErrorCode.Success) {
      ElNotification({
        message: "修改成功"
      })
      changePasswordModal.value!.close()
      return true
    }
    return false
  }
  const openChangePassword = () => {
    changePasswordModal.value!.open()
  }

  return [
    oldPassword, newPassword, newPasswordConfirm,
    changePassword, openChangePassword
  ]
}
