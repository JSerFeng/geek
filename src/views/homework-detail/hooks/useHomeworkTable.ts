// 中间作业详情部分的逻辑
import { computed, ref, Ref } from 'vue'
import { DetailInfo, Person } from '../../../store/modules/admin/state'
import { getDetailHomeworkInfo } from '../../../api/index'
import { useRoute } from 'vue-router'

export default function useHomeworkTable(personList:Ref<DetailInfo<Person, File>>) {
  const Route = useRoute();
  const taskId = (Route.params.id as any) as number;
  // 对请求到的结果进行处理，得出可以方便展示的personList
  function comPersonList(result: any) {
    return computed(() => {
      result.data.items.forEach((item: DetailInfo<Person, File>) => {
        item.userName = item.userVO.userName;
      });
      return result.data.items;
    }).value;
  }
  async function handlePaginationChange(index: number) {
    const result = await getDetailHomeworkInfo(taskId, index, 5);
    console.log(result)
    personList.value = comPersonList(result);
  }
  return {
    comPersonList,
    handlePaginationChange,
  }
}