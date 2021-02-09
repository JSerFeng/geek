import { AxiosResponse } from 'axios'
import { reactive, onMounted, toRaw } from 'vue'
import { getPersonCount } from '../../../api/index'
import '../../../mock/admin/index'

interface personObj {
    font: number,
    end: number,
    py: number,
    design: number,
    mobile: number
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
            design: 0,
            mobile: 0
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