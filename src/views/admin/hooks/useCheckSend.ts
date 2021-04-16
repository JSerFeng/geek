type UseCheck = (
    courseId: 1 | 2 | 3 | 4 | string,
    checkList: string[],
    title: string,
    content: string
) => boolean

const useSendCheck: UseCheck = (
    courseId: 1 | 2 | 3 | 4 | string,
    checkList: string[],
    title: string,
    content: string
) => {
    if (courseId === '') {
        const isLegal = checkList.length !== 0 &&
            content !== '' &&
            title !== ''
        if (!isLegal) {
            return false
        }
        return true
    } else {
        const isLegal = courseId !== '' &&
            content !== '' &&
            title !== ''
        if (!isLegal) {
            return false
        }
        return true
    }
}

export default useSendCheck