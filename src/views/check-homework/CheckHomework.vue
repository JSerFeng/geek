<template>
  <div class="long-list">
    <el-tabs class="homework-tab" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane  label="作业管理" name="first">
        <HomeworkManagement/>
      </el-tab-pane>
      <el-tab-pane   label="作业详情" name="second">作业详情</el-tab-pane>
      <el-tab-pane   label="查看成绩" name="third">查看成绩</el-tab-pane>
      <el-tab-pane   label="提交情况" name="fourth">提交情况</el-tab-pane>
    </el-tabs>
  </div>
</template>
/*TODO*/
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { ElTabPane, ElTabs } from "element-plus";
import HomeworkManagement from './components/HomeworkManagement.vue'
export default defineComponent({
  data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab:number, event:Event) {
      }
    },
  components: {
    ElTabs,
    ElTabPane,
    HomeworkManagement
  },
  setup() {
    
  },
});
</script>
<style lang="scss">
.long-list {
  width: 95%;
  height: 550px;
  border-radius: 50px;
  margin: 10vh auto;
  border: 1px solid #EEF1EF;
  box-shadow: -1px -1px 3px #ffffff, 1.5px 1.5px 3px rgba(174, 174, 192, 0.4);
  .homework-tab{
    width: 170vh;
    margin: 5vh auto;
    height: 80%;
    .el-tabs__item{
      width: 35vh;
      text-align: center;
    }
  }
}
</style>