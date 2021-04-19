<template>
  <div class="homework-status">
    <h1 class="title">完成状况</h1>
    <router-link to="/checkTask">
      <AdBeacon boxStyle="left" title="作业管理" />
    </router-link>
    <el-tabs :stretch='true' tab-position="left" v-model="tableActiveeName" class="table">
      <el-tab-pane class="item" label="前端" name="first">
        <FrontEndCom />
      </el-tab-pane>
      <el-tab-pane class="item" label="后端" name="second">
        <EndCom />
      </el-tab-pane>
      <el-tab-pane class="item" label="Python" name="third">
        <PythonCom />
      </el-tab-pane>
      <el-tab-pane class="item" label="移动" name="fourth">
        <AndroidCom />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import VirtualList from "../check-homework/components/virtualList.vue";
import AdBeacon from "../../components/ad-beacon/AdBeacon.vue";
import { ElTabs, ElTabPane } from "element-plus";
import FrontEndCom from "./components/FrontEndCom.vue";
import EndCom from "./components/EndCom.vue";
import PythonCom from "./components/PythonCom.vue";
import AndroidCom from "./components/AndroidCom.vue";

type ActiveName = "first" | "second" | "third" | "fourth";

export default defineComponent({
  components: {
    VirtualList,
    AdBeacon,
    ElTabPane,
    ElTabs,
    FrontEndCom,
    AndroidCom,
    EndCom,
    PythonCom,
  },
  setup() {
    const tableActiveeName = ref<ActiveName>("first");
    return {
      tableActiveeName,
    };
  },
});
</script>
<style lang="scss">
.homework-status {
  .title{
    width: 50%;
    text-align: center;
    margin: 5vh auto 0 auto;
  }
  @media screen and (min-width: 799px) {
    .table {
      width: 70%;
      height: 1000px;
      margin: 10vw auto;
      background-color: #EEF1EF;
      margin-top: 60px;
    }
   .el-tabs__item{
      height: 150px;
      line-height: 150px;
    }
  }
  @media screen and (max-width: 800px) {
    .table {
      width: 60%;
      margin: 10vw auto;
    }
    .el-tabs__item{
      height: 200px;
      line-height: 100px;
    }
  }
}
</style>