import { AxiosResponse } from 'axios'
import { reactive, onMounted, ref, toRaw, computed } from 'vue'
import { getPersonCount, getSignListList } from '../../../api/index'
import '../../../mock/admin/index'

interface Date<T> {
    data:T
}

interface Person {
    "userId": string,
    "userName": string,
    "mail": string,
    "major": string,
    "image": null | string,
    "grade": null | string
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
    const signPersonList = ref<Person[]>([])
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
        const sPersonList = await getSignListList()
        signPersonList.value = sPersonList.data.data.items
    })
    return {
        res,
        signPersonList
    }
}