import { InfoObj } from './useBlueCheck'
import { useIdCheck, useNameCheck, usePasCheck, useDirCheck } from './useCheck'

export function useConfirm(info:InfoObj): boolean {
    const {id, name, password, direction} = info
    if (useIdCheck(id.value!.value as string)&&useNameCheck(name.value!.value as string)&&usePasCheck(password.value!.value as string)&&useDirCheck(direction.value!.value as string)) {
        return false
    }
    return true
}