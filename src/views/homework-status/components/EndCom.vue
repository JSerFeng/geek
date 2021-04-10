<template lang="">
    <div class="end-homework-status">
         <virtual-list
          :containerWidth="120"
          :size="10"
          :list="endPersonList"
          :itemHeight="45"
          title=""
          :containerHeight="470"
        >
          <template v-slot:default="{ item }">
            <ul class="item">
              <li>{{item.userName}}</li>
              <li>{{item.userId}}</li>
              <li>{{item.major}}</li>
              <li>{{item.submitCount}}</li>
              <li>{{item.avgScore}}</li>
            </ul>
          </template>
        </virtual-list>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRaw } from 'vue'
import VirtualList from '../../check-homework/components/virtualList.vue'
import { HomeworkStatusPerson } from '../../../store/modules/admin/state'
import { getHomeworkStatus } from '../../../api/index'
export default defineComponent({
    components:{
        VirtualList
    },
    setup() {
    const endPersonList = ref<HomeworkStatusPerson[]>([])
    onMounted(async()=>{
        // 这里要传入方向的ID，也就是 2
        const result = await getHomeworkStatus()
        endPersonList.value = computed(()=>result.data.data.users).value
        console.log(toRaw(endPersonList.value))
    })
    return {
      endPersonList
    };
  },
})
</script>
<style lang="scss">
    .end-homework-status{
      .item{
        display: flex;
        font-size: 14px;
        &:hover{
            font-size: 18px;
          }
        li{
          width: 19vh;
          
        }
      }
    }
</style>