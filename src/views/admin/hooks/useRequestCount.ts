import {  onMounted, ref,  computed } from 'vue'
import { getPersonCount, getSignListList } from '../../../api/index'

interface Person {
    "userId": string,
    "userName": string,
    "mail": string,
    "major": string,
    "image": null | string,
    "grade": null | string
}

export const useRequestCount = () => {
    const frontPerson = ref<number>(0)
    const endPerson = ref<number>(0)
    const pythonPerson = ref<number>(0)
    const androidPerson = ref<number>(0)
    const designPerson = ref<number>(0)
    const operationPerson = ref<number>(0)
    const signPersonList = ref<Person[]>([])
    onMounted(async () => {
        frontPerson.value = (await getPersonCount(1)).data
        endPerson.value = (await getPersonCount(2)).data    
        pythonPerson.value = (await getPersonCount(3)).data    
        androidPerson.value = (await getPersonCount(4)).data 
        designPerson.value = (await getPersonCount(5)).data 
        operationPerson.value = (await getPersonCount(6)).data 
        const result = (await getSignListList()).data
        signPersonList.value = computed(()=>result.items).value
    })
    return {
        frontPerson,
        endPerson,
        pythonPerson,
        androidPerson, 
        signPersonList,
        operationPerson,
        designPerson
    }
}