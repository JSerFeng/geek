import { Ref, watchEffect } from "vue";
import { checkEmail, checkUserId } from "../../api";
import { Flags, useLocalCheck, useNetCheck } from "../../utils/shared";

/**邮箱本地正则验证 */
const checkEmailLocal = useLocalCheck(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)
/**邮箱远程验证 */
const checkEmailNet = useNetCheck(checkEmail)

/**用户id本地正则验证 */
const checkIdLocal = useLocalCheck(/\w+/)
/**用户id远程验证 */
const checkIdNet = useNetCheck(checkUserId)

export const useEmailCheck = (email: Ref<string>) => {
  let { flag, msg } = checkEmailLocal(email)

  watchEffect(() => {
    if (flag.value === Flags.Success) {
      checkEmailNet(email, flag, msg)
    }
  })

  return {
    flag, msg
  }
}

export const useUserIdCheck = (userId: Ref<string>) => {
  const { flag, msg } = checkIdLocal(userId)
  watchEffect(() => {
    if (flag.value === Flags.Success) {
      checkIdNet(userId, flag, msg)
    }
  })
  return {
    flag, msg
  }
}

export const useNullCheck = useLocalCheck(/\w/, "不能输入空字符")