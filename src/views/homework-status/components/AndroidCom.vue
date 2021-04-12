<!-- <template lang="">
    <div class="android-homework-status">
         <virtual-list
          :containerWidth="120"
          :size="10"
          :list="androidPersonList"
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
    const androidPersonList = ref<HomeworkStatusPerson[]>([])
    onMounted(async()=>{
        // 这里要传入方向的ID，也就是 4
        const result = await getHomeworkStatus()
        androidPersonList.value = computed(()=>result.data.data.users).value
        console.log(toRaw(androidPersonList.value))
    })
    return {
      androidPersonList
    };
  },
})
</script>
<style lang="scss">
    .android-homework-status{
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
</style> -->