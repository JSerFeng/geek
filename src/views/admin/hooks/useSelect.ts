import { ref, reactive, toRaw } from 'vue'

interface OptionItem {
  value: string,
  label: string
}

type Option<T> = T[]

export default function useSelect() {
  let selValue = ref<string>("");
  const options = reactive<Option<OptionItem>>([
    {
      value: "1",
      label: "前端",
    },
    {
      value: "2",
      label: "后端",
    },
    {
      value: "3",
      label: "Python",
    },
  ]);
  function handleSelectClear() {
    selValue.value = ''
  }
  function handleSelectChange(value: string) {
    selValue.value = value
  }
  return {
    selValue,
    options,
    handleSelectClear,
    handleSelectChange
  }
}