import { Ref, onMounted, onUnmounted, ref } from 'vue'

export function useAddEvent() {

  // 元素的ref
  let idRef = ref<null | HTMLInputElement>(null);
  let nameRef = ref<null | HTMLInputElement>(null);
  let pasRef = ref<null | HTMLInputElement>(null);
  let dirRef = ref<null | HTMLInputElement>(null);

  const refArr: Ref<null | HTMLInputElement>[] = [
    idRef,
    nameRef,
    pasRef,
    dirRef,
  ];

  onMounted(() => {
    refArr.forEach((ref) => {
      ref.value?.addEventListener("blur", () => {
        ref.value?.classList.remove("scale");
      });
    });
    refArr.forEach((ref: Ref<null | HTMLInputElement>, i: number) => {
      ref.value?.addEventListener("focus", () => {
        ref.value?.classList.add("scale");
        refArr.forEach(
          (item: Ref<null | HTMLInputElement>, index: number) => {
            if (index !== i) {
              item.value?.classList.remove("scale");
            }
          }
        );
      });
    });
  });

  onUnmounted(() => {
    refArr.forEach((ref) => {
      ref.value?.removeEventListener('focus', () => { })
    })
  })

  return {
    idRef,
    nameRef,
    pasRef,
    dirRef
  }
}