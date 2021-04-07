import { from, merge, Subject } from "rxjs";
import { filter, switchMap, tap, debounceTime, skipWhile } from 'rxjs/operators'
import { Ref, ref, onUnmounted, watchEffect } from "vue";
import { checkEmail, checkUserId } from "../../api/user";
import { ErrorCode } from "../../api/request";
import { EmailRegex, NotNullRegex, UserIdLocalRegex } from "../../config/config";
import { Flags, useLocalCheck } from "../../utils/shared";

/* 本地正则验证 */
const validEmail = useLocalCheck(EmailRegex)
const notNull = useLocalCheck(NotNullRegex)
const userIdCheck = useLocalCheck(UserIdLocalRegex)

interface ICheck {
  (val: Ref<string>): [Ref<Flags>, Ref<string>]
}

export const useCheckFactory = (
  checkMethod: (val: string) => (Promise<[boolean, string]> | [boolean, string]),
  option = {
    debounce: 500
  }
) => (val: Ref<string>): [Ref<Flags>, Ref<string>] => {
  const flag = ref(Flags.Normal)
  const msg = ref("")
  const $input = new Subject<string>()
  const sub = $input.pipe(
    skipWhile(val => !val),
    debounceTime(option.debounce),
    tap(() => {
      flag.value = Flags.Pending
      msg.value = ""
    }),
    switchMap(async val => {
      return await checkMethod(val)
    })
  ).subscribe(([valid, errMsg]) => {
    if (valid) {
      flag.value = Flags.Success
      msg.value = errMsg
    } else {
      flag.value = Flags.Fail
      msg.value = errMsg
    }
  })
  onUnmounted(() => {
    sub.unsubscribe()
  })

  watchEffect(() => {
    $input.next(val.value)
  })
  return [flag, msg]
}

export const useUserIdLocalCheck = useCheckFactory((val) => [userIdCheck(val), "学号长度为10位"])

export const useNullCheck = useCheckFactory(val => [notNull(val), "输入不能为空"])

export const useUserIdCheck: ICheck = useCheckFactory(async (val) => {
  const valid = userIdCheck(val)
  if (!valid) return [false, "学号长度10位"]

  const res = await checkUserId(val)
  switch (res.error_code) {
    case ErrorCode.Success:
      return [true, ""]
    case ErrorCode.Connect_Fail:
      return [false, "网络连接失败"]
    case ErrorCode.HasBeenUsed:
      return [false, res.message]
    default: return [false, "未知错误"]
  }
})

export const useLocalEmailCheck: ICheck = useCheckFactory((val) => {
  const isValid = validEmail(val)
  if (!isValid) return [false, "邮箱格式错误"]
  return [true, ""]
})

export const useEmailCheck: ICheck = useCheckFactory(async (val) => {
  const isValid = validEmail(val)
  if (!isValid) return [false, "邮箱格式错误"]

  const res = await checkEmail(val)
  switch (res.error_code) {
    case ErrorCode.HasBeenUsed:
      return [false, res.message]
    case ErrorCode.Connect_Fail:
      return [false, "网络连接失败"]
    case ErrorCode.Success:
      return [true, ""]
    default:
      return [false, "未知错误"]
  }
})

export const useSameCheck = (sameTo: Ref<string>) => useCheckFactory(val => {
  const equal = val === sameTo.value
  return [equal, equal ? "" : "密码和之前密码不一致"]
})
