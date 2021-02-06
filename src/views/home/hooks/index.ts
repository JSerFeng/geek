import { getWeather } from "../../../api"
import { onMounted, ref } from 'vue'

interface Weather {
  data: {
    wendu: string,
    ganmao: string
  }
}
export const useWeather = () => {
  const temp = ref<string | null>(null)
  const msg = ref<string | null>(null)
  onMounted(async () => {
    const { data } = await getWeather("重庆") as { data: Weather }
    const { wendu, ganmao } = data.data
    temp.value = wendu
    msg.value = ganmao
  })
  return {
    temp,
    msg
  }
}