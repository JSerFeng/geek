import { onMounted, ref, Ref, toRaw, reactive } from 'vue'
import { useDirCheck, useNameCheck, useIdCheck, usePasCheck } from './useCheck'
import { useConfirm } from '../hooks/useConfirm'


export type Props = {
  idRef: Ref<null | HTMLInputElement>
  nameRef: Ref<null | HTMLInputElement>
  pasRef: Ref<null | HTMLInputElement>
  dirRef: Ref<null | HTMLInputElement>
}

export type InfoObj = {
  adminId: string,
  adminName: string,
  password: string | null,
  courseName: string,
  id?:number
}

export function useBlueCkeck<T extends Props = Props>(props?: T) {
  const { idRef, nameRef, pasRef, dirRef } = props as Props
  // 控制元素显示的变量 
  let isIdShow = ref<boolean>(false);
  let isNameShow = ref<boolean>(false);
  let isPasShow = ref<boolean>(false);
  let isDirShow = ref<boolean>(false);

  const infoObj:InfoObj = reactive({
    adminId: '',
    adminName: '',
    password: '',
    courseName: ''
  })

  //  判断是否符合提交标准
  let isConfirm: Ref<boolean> = ref<boolean>(false)

  onMounted(() => {
    idRef.value?.addEventListener("blur", () => {
      if (useIdCheck(idRef.value?.value as string)) {
        isIdShow.value = false;
      } else {
        isIdShow.value = true;
      }
      isConfirm.value = useConfirm(infoObj)
      infoObj.adminId = idRef.value?.value as string
    });
    nameRef.value?.addEventListener("blur", () => {
      if (useNameCheck(nameRef.value?.value as string)) {
        isNameShow.value = false;
      } else {
        isNameShow.value = true;
      }
      isConfirm.value = useConfirm(infoObj)
      infoObj.adminName = nameRef.value?.value as string

    });
    pasRef.value?.addEventListener('blur', () => {
      if (usePasCheck(pasRef.value?.value as string)) {
        isPasShow.value = false
      } else {
        isPasShow.value = true
      }
      isConfirm.value = useConfirm(infoObj)
      infoObj.password = pasRef.value?.value as string

    })
    dirRef.value?.addEventListener('blur', () => {
      if (useDirCheck(dirRef.value?.value as string)) {
        isDirShow.value = false
      } else {
        isDirShow.value = true
      }
      isConfirm.value = useConfirm(infoObj)
      infoObj.courseName = dirRef.value?.value as string

    })
  });

  return {
    idRef,
    nameRef,
    dirRef,
    pasRef,
    isIdShow,
    isPasShow,
    isDirShow,
    isNameShow,
    isConfirm,
    infoObj
  }
}