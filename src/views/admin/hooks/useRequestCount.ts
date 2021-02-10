import { AxiosResponse } from 'axios'
import { reactive, onMounted, toRaw, computed } from 'vue'
import { getPersonCount } from '../../../api/index'
import '../../../mock/admin/index'

interface personObj {
    font: number,
    end: number,
    py: number,
}

type resType = {
    data: AxiosResponse<personObj> | personObj
}

export const useRequestCount = () => {
    let res = reactive<resType>({
        data: {
            font: 0,
            end: 0,
            py: 0,
        }
    })
    onMounted(async () => {
        res.data = await getPersonCount() 
        console.log(toRaw(res))
    })
    return {
        res
    }
}