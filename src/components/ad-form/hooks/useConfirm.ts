import { InfoObj } from './useBlueCheck'
import { useIdCheck, useNameCheck, usePasCheck, useDirCheck } from './useCheck'

export function useConfirm(info: InfoObj): boolean {
    const { adminId, adminName, password, courseName } = info
    if (useIdCheck(adminId) && useNameCheck(adminName) && usePasCheck(password) && useDirCheck(courseName)) {
        return true
    }
    return false
}