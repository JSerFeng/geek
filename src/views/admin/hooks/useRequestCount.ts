import { AxiosResponse } from 'axios'
import { reactive, onMounted, toRaw } from 'vue'
import { getPersonCount } from '../../../api/index'
import '../../../mock/admin/index'

interface Date<T> {
    data:T
}

interface personObj {
    font: number,
    end: number,
    py: number,
}

type resType = {
    data: AxiosResponse<personObj> | Date<personObj>
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