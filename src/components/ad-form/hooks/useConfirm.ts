import { InfoObj } from './useBlurCheck'
import { useIdCheck, useNameCheck, usePasCheck, useDirCheck } from './useCheck'
export function useConfirm(info: InfoObj): boolean {
    const { adminId, adminName, password, courseName } = info
    if (useIdCheck(adminId) && useNameCheck(adminName) && usePasCheck(password as string) && useDirCheck(courseName)) {
        return true
    }
    return false
}