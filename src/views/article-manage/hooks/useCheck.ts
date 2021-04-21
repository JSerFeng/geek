import { ElMessage } from "_element-plus@1.0.2-beta.40@element-plus"

type UseCheck = () => {
    useWordCheck: (title: string, content: string) => boolean
    useMdCheck: (title: string) => boolean
}

const useCheck: UseCheck = () => {
    function useWordCheck(title: string, content: string): boolean {
        if (!title) {
            ElMessage({
                type: 'error',
                message: '标题不能为空！'
            })
            return false
        } else {
            if (!content) {
                ElMessage({
                    type: 'error',
                    message: '内容不能为空'
                })
                return false
            }
            return true
        }
    }
    function useMdCheck(title: string): boolean {
        if (!title) {
            ElMessage({
                type: 'error',
                message: '标题不能为空！'
            })
            return false
        }
        return true
    }
    return {
        useWordCheck,
        useMdCheck
    }
}

export default useCheck