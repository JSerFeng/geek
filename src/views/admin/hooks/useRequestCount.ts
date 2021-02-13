import { AxiosResponse } from 'axios'
import { reactive, onMounted, toRaw } from 'vue'
import { getPersonCount } from '../../../api/index'
import '../../../mock/admin/index'

interface personObj {
    font: number,
    end: number,
    py: number,
}

type resType = {
    data: AxiosResponse<personObj> | { data: personObj }
}

export const useRequestCount = () => {
    let res = reactive<resType>({
        data: {
            data: {
                font: 0,
                end: 0,
                py: 0,
            }
        }
    })
    onMounted(async () => {
        res.data = await getPersonCount()
    })
    return {
        res
    }
}