import { useDropUpload } from "../../../utils/shared"
import {apiUploadAvatar} from '../../../api/file'

const AVATAR_FILE_MIME = new Set([
  "image/jpeg",
  "image/gif",
  "image/pipeg",
  "image/png",
])

export const useImgUpload = (userId: string) => {

  const domRef = useDropUpload(
    file => {
      console.log(file);
      return AVATAR_FILE_MIME.has(file.type)
    },
    file => {
      const fd = new FormData()
      fd.append("file", file)
      apiUploadAvatar(userId, fd)
    }
  )
  return domRef
}