<template>
  <div class="check-homework">
    <router-link to="/admin">
      <AdBeacon boxStyle="left" title="招生管理" />
    </router-link>
    <router-link to="/homwwork/status">
      <AdBeacon boxStyle="right" title="完成状况" />
    </router-link>
    <virtual-list
      :size="10"
      :list="homeworkList"
      :itemHeight="45"
      title="作 业 管 理"
      :containerHeight="550"
    >
      <template v-slot:default="{ item }">
        <span @click="handleToHomeworkDetail(item.id, item.taskFileVOList)">
          <HomeworkItem :item="item" />
        </span>
      </template>
    </virtual-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRaw } from "vue";
import VirtualList from "./components/virtualList.vue";
import HomeworkItem from "./components/HomeworkItem.vue";
import { getAdminHomework } from "../../api/index";
import AdBeacon from "../../components/ad-beacon/AdBeacon.vue";
import { useStore } from '../../store/index'
import { useRouter } from 'vue-router'
import { MutationTypes } from '../../store/modules/admin/mutation'
export interface File {
    addTime: string;
    fileName: string;
    filePath: string;
}

export interface Homework<T> {
  addTime: string;
  adminId: string;
  closeTime: string;
  commitLate: number;
  courseId: number;
  filePath: null | string;
  id: number;
  isClosed: number;
  taskFileVOList: T[];
  taskName: string;
  weight: number;
}
export default defineComponent({
  components: {
    VirtualList,
    HomeworkItem,
    AdBeacon,
  },
  setup() {
    const getHomework = getAdminHomework;
    const homeworkList = ref<Homework<File>[]>([]);
    const Router = useRouter()
    const Store = useStore()
    function handleToHomeworkDetail (id:number, files:File[]) {
      Router.push('/homework/detail/' + id)
      Store.commit({
        type:`${MutationTypes.addFiles}`,
        payload:files
      })
    }
    onMounted(async () => {
      const result = await getHomework();
      homeworkList.value = computed(() => result.data.data.taskPOList).value;
    });
    return {
      homeworkList,
      handleToHomeworkDetail
    };
  },
});
</script>
<style lang="scss">
*{
  text-decoration: none;
  color: black;
}
</style>