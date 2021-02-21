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
  id: Ref<null | HTMLInputElement>,
  name: Ref<null | HTMLInputElement>,
  password: Ref<null | HTMLInputElement>,
  direction: Ref<null | HTMLInputElement>
}

export function useBlueCkeck<T extends Props = Props>(props?: T) {
  const { idRef, nameRef, pasRef, dirRef } = props as Props
  // 控制元素显示的变量 
  let isIdShow = ref<boolean>(false);
  let isNameShow = ref<boolean>(false);
  let isPasShow = ref<boolean>(false);
  let isDirShow = ref<boolean>(false);

  const InfoObj = {
    id: idRef,
    name: nameRef,
    password: pasRef,
    direction: dirRef
  }

  //  判断是否符合提交标准
  let isConfirm: Ref<boolean> = ref<boolean>(true)

  onMounted(() => {

    // setTimeout(() => {
    //   isConfirm.value = false
    // }, 3000);
    idRef.value?.addEventListener("blur", () => {
      if (useIdCheck(idRef.value?.value as string)) {
        isIdShow.value = false;
      } else {
        isIdShow.value = true;
      }

      // isConfirm.value = useConfirm(InfoObj)
      isConfirm.value = false
      // console.log(useConfirm(InfoObj))

    });
    nameRef.value?.addEventListener("blur", () => {
      if (useNameCheck(nameRef.value?.value as string)) {
        isNameShow.value = false;
      } else {
        isNameShow.value = true;
      }
      isConfirm.value = useConfirm(InfoObj)
      console.log(useConfirm(InfoObj))

    });
    pasRef.value?.addEventListener('blur', () => {
      if (usePasCheck(pasRef.value?.value as string)) {
        isPasShow.value = false
      } else {
        isPasShow.value = true
      }
      isConfirm.value = useConfirm(InfoObj)
      console.log(useConfirm(InfoObj))

    })
    dirRef.value?.addEventListener('blur', () => {
      if (useDirCheck(dirRef.value?.value as string)) {
        isDirShow.value = false
      } else {
        isDirShow.value = true
      }
      isConfirm.value = useConfirm(InfoObj)
      console.log(useConfirm(InfoObj))

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
    isConfirm
  }
}