import { onMounted, ref, Ref } from 'vue'

interface Dialog {
    dialogVisible:Ref<boolean>,
    handleClose:(done:() => void) => void,
    root:Ref<null|HTMLDivElement>
}

export default function useDialog():Dialog {
    let dialogVisible = ref(false) as Ref<boolean>
    const root = ref(null) as Ref<null|HTMLDivElement>
    const handleClose = () => {
        dialogVisible.value = !dialogVisible.value;
    }
    onMounted(() => {
    })
    return {
        dialogVisible,
        handleClose,
        root
    }
}