import { Subject, timer } from "rxjs"
import { exhaustMap, map, takeUntil, tap } from "rxjs/operators"
import { onUnmounted, Ref, ref } from "vue"
import { storage } from "../../utils/shared"


const now = () => Date.now()

/**
 * 存储/得到 到期时间，返回剩余的秒数
 */
export const useCalcTime = () => {
  const currentTime = now()

  const expire: number = Number(storage.get("sendExpireTime"))
  if (expire && expire > currentTime) {
    return expire - currentTime + 10
  } else {
    storage.set("sendExpireTime", currentTime + 30000 + 10 + "")
    return 30000 + 10
  }
}

/**控制发送之后的剩余秒数显示
 *
 * @param sendRequest 需要发送的请求
 * @param sendText 按钮上面的文字，以此改变显示时间
 * @param sendDisable 控制是否可以点击的ref
 */
const createCounting = (ms: number, restTime: number) => timer(0, ms).pipe(takeUntil(timer(restTime)))

export const useCountingSend = (sendRequest: () => any, sendText: Ref<string>, sendDisable: Ref<boolean>) => {
  const sendBtn$ = new Subject()
  let restTime = 0

  const sub = sendBtn$.pipe(
    tap(() => {
      restTime = useCalcTime()
      sendDisable.value = true
    }),
    exhaustMap(() => createCounting(1000, useCalcTime())),
    map(n => Math.floor(restTime / 1000 - n)),
    tap(n => {
      if (n === 30) {
        sendRequest()
      }
    })
  ).subscribe(n => {
    sendText.value = `再次发送(${n}秒)`
    if (n === 0) {
      sendText.value = "再次发送"
      sendDisable.value = false
    }
  })

  onUnmounted(() => {
    sub.unsubscribe()
  })

  return sendBtn$
}