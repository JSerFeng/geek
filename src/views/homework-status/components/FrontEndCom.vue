<template lang="">
    <div class="front-homework-status">
         <virtual-list
          :containerWidth="120"
          :size="10"
          :list="frontPersonList"
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
        <div id="front"></div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRaw } from "vue";
import VirtualList from "../../check-homework/components/virtualList.vue";
import { HomeworkStatusPerson } from "../../../store/modules/admin/state";
import { getHomeworkStatus } from "../../../api/index";
import * as echarts from "echarts";
export default defineComponent({
  components: {
    VirtualList,
  },
  setup() {
    const frontPersonList = ref<HomeworkStatusPerson[]>([]);
    onMounted(async () => {
      // 这里要传入方向的ID，也就是 1
      const result = await getHomeworkStatus();
      frontPersonList.value = computed(() => result.data.data.users).value;
      console.log(toRaw(frontPersonList.value));

      var chartDom = document.getElementById("front") as HTMLDivElement
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {},
        legend: {
          data: ["预算分配（Allocated Budget）", "实际开销（Actual Spending）"],
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5],
            },
          },
          indicator: [
            { name: "中位数", max: 6500 },
            { name: "均值", max: 16000 },
            { name: "极差", max: 30000 },
            { name: "四分位差", max: 38000 },
            { name: "方差", max: 52000 },
            { name: "标准差", max: 25000 },
          ],
        },
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: "峰值",
              },
              {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: "实际值",
              },
            ],
          },
        ],
      };

      option && myChart.setOption(option);
    });
    return {
      frontPersonList,
    };
  },
});
</script>
<style lang="scss">
#front{
  width: 55vw;
  height: 55vh;
  margin: 4vh auto;
}
@media screen and (max-width: 799px) {
  .front-homework-status {
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
  .front-homework-status {
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