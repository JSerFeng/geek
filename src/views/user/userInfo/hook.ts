import { file2buffer, useDropUpload } from "../../../utils/shared"
import { apiUploadAvatar } from '../../../api/file'
import { ErrorCode } from "../../../api/request"
import { useStore } from "../../../store"
import { ActionTypes } from "../../../store/modules/user/actions"
import { getHash, makeHash } from "../../../utils/bigFile"

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