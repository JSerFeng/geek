<template lang="">
    <div class="operation-homework-status">
         <virtual-list
          :containerWidth="120"
          :size="10"
          :list="operationPersonList"
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
        <div id="operation"></div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRaw } from "vue";
import VirtualList from "../../check-homework/components/virtualList.vue";
import { getHomeworkStatus } from "../../../api/index";
import { calculateAverageScore, computedStatistics, Student } from '../../../utils/calculate'
import * as echarts from "echarts";
export default defineComponent({
  components: {
    VirtualList,
  },
  setup() {
    const operationPersonList = ref<Student[]>([]);
    onMounted(async () => {
      // 这里要传入方向的ID，也就是 1
      const result = await getHomeworkStatus(6);
      operationPersonList.value = computed(() => result.data.users).value;
      const arr = calculateAverageScore(operationPersonList.value)
      const [middle, average, range, quartile, variance, deviation] = computedStatistics(arr)
      const chartDom = document.getElementById("operation") as HTMLDivElement
      const myChart = echarts.init(chartDom);
      const option = {
        tooltip: {},
        legend: {
          data: ["预算分配（Allocated Budget）", "实际开销（Actual Spending）"],
        },
        radar: {
          indicator: [
            { name: "中位数", max: 10 },
            { name: "平均分", max: 10 },
            { name: "极差", max: 10 },
            { name: "四分位差", max: 10 },
            { name: "方差", max: 3 },
            { name: "标准差", max: 3 },
          ],
        },
        series: [
          {
            name: "预期 vs 实际",
            type: "radar",
            data: [
              {
                value: [10, 10, 10, 10, 3, 3],
                name: "峰值",
              },
              {
                value: [middle, average, range, quartile, variance, deviation],
                name: "实际值",
              },
            ],
          },
        ],
      };

      option && myChart.setOption(option);
    });
    return {
      operationPersonList,
    };
  },
});
</script>
<style lang="scss">
#operation{
  width: 55vw;
  height: 55vh;
  margin: 4vh auto;
}
@media screen and (max-width: 799px) {
  .operation-homework-status {
    transform: scale(0.5);
    margin-left: -15vw;
    margin-top: -20vh;
    .item {
      display: flex;
      font-size: 14px;
      &:hover {
        font-size: 18px;
      }
      li {
        width: 19vh;
      }
    }
  }
}
@media screen and (min-width: 800px) {
  .operation-homework-status {
    .item {
      display: flex;
      font-size: 14px;
      &:hover {
        font-size: 18px;
      }
      li {
        width: 19vh;
      }
    }
  }
}
</style> 