import { from, merge } from "rxjs";
import { filter, switchMap, tap, map, skip, debounceTime } from 'rxjs/operators'
import { Ref, ref, onUnmounted, watch } from "vue";
import { checkEmail, checkUserId } from "../../api";
import { ErrorCode } from "../../api/request";
import { EmailRegex, NotNullRegex } from "../../config/config";
import { debounce, Flags, fromVInput, useLocalCheck } from "../../utils/shared";

/**本地正则验证 */
const validEmail = useLocalCheck(EmailRegex)
const notNull = useLocalCheck(NotNullRegex)

export const useUserIdCheck = (val: Ref<string>) => {
  const flag = ref(Flags.Normal)
  const msg = ref("")
  const input$ = fromVInput(val)
  const sub = input$.pipe(
    skip(1),
    tap(() => { flag.value = Flags.Pending }),
    debounceTime(500),
    filter(notNull),
    switchMap(checkUserId),
    map((res: any) => {
      switch (res.error_code) {
        case ErrorCode.Success:
          return { flag: Flags.Success, msg: "" }
        case ErrorCode.Connect_Fail:
          return { flag: Flags.Fail, msg: "网络连接失败" }
        case ErrorCode.HasBeenUsed:
          return { flag: Flags.Fail, msg: res.message }
        default: return { flag: Flags.Fail, msg: "未知错误" }
      }
    })
  ).subscribe(res => {
    flag.value = res.flag
    msg.value = res.msg
  })
  onUnmounted(() => {
    sub.unsubscribe()
  })
  return { flag, msg }
}

export const useEmailCheck = (val: Ref<string>) => {
  const flag = ref(Flags.Normal)
  const msg = ref("")
  const input$ = fromVInput(val)
  const localCheck$ = input$.pipe(
    map(val => {
      const isValid = validEmail(val)
      return {
        flag: isValid ? Flags.Pending : Flags.Fail, /**等待网络检查 */
        msg: isValid ? "" : "格式错误"
      }
    })
  )
  const netCheck$ = input$.pipe(
    debounceTime(500),
    filter(validEmail),
    switchMap(val => {
      return from(checkEmail(val))
    }),
    map((data) => {
      switch (data.error_code) {
        case ErrorCode.HasBeenUsed:
          return { flag: Flags.Fail, msg: data.message }
        case ErrorCode.Connect_Fail:
          return { flag: Flags.Fail, msg: "网络连接失败" }
        case ErrorCode.Success:
          return { flag: Flags.Success, msg: "" }
        default:
          return { flag: Flags.Fail, msg: "未知错误" }
      }
    })
  )
  const sub = merge(localCheck$, netCheck$).pipe(
    skip(1) //第一次什么也没填，忽略掉
  ).subscribe((res) => {
    flag.value = res.flag
    msg.value = res.msg
  })
  onUnmounted(() => {
    sub.unsubscribe()
  })
  return { flag, msg }
}

export const useNullCheck = (val: Ref<string>) => {
  const flag = ref(Flags.Normal)
  const msg = ref("")
  watch(val, (value) => {
    const isNull = !notNull(value)

    if (isNull) {
      flag.value = Flags.Fail
      msg.value = "输入不能为空"
    } else {
      flag.value = Flags.Success
      msg.value = ""
    }
  })
  return { flag, msg }
}

export const useSameCheck = (sameTo: Ref<string>, val: Ref<string>) => {
  const flag = ref(Flags.Normal)
  const msg = ref("")
  watch([sameTo, val], debounce(([pwd, confirm]: [string, string]) => {
    if (pwd && confirm) {
      if (pwd === confirm) {
        flag.value = Flags.Success
      }
      else {
        flag.value = Flags.Fail
        msg.value = "两次密码不一致"
      }
    }
  }, 500))
  return { flag, msg }
}