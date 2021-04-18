import { apiUploadHomeworkRecord } from "../../../api/homework"
import { apiUploadHomework } from '../../../api/file'
import { ErrorCode } from "../../../api/request"
import { ref } from "vue"
import { Flags } from "../../../utils/shared"


export const useUploadHomework = () => {
  const progress = ref(0)
  const flag = ref(Flags.Normal)

  const uploadHomework = async (taskId: number, courseId: number, userId: string, file: File) => {
    flag.value = Flags.Pending
    let res = await apiUploadHomeworkRecord(taskId, courseId, userId)
    if (res.error_code !== ErrorCode.Success) {
      flag.value = Flags.Fail
      return false
    }
    res = await apiUploadHomework(res.data.toString(), file, e => {
      progress.value = e.loaded / e.total
    })
    if (res.error_code !== ErrorCode.Success) {
      flag.value = Flags.Fail
      return false
    }
    flag.value = Flags.Success
    return true
  }

  return [progress, flag, uploadHomework]
}