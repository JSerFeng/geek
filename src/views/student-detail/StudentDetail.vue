<template>
  <div class="studnet-detail">
    <router-link to="/admin">
      <AdBeacon boxStyle="left" title="招生管理"
    /></router-link>
    <h1 class="title">招生详情</h1>
    <el-radio-group class="course-selection" v-model="courseId">
      <el-radio-button @click="handleTabsClick" class="item" label="1"
        >前端</el-radio-button
      >
      <el-radio-button @click="handleTabsClick" class="item" label="2"
        >后端</el-radio-button
      >
      <el-radio-button @click="handleTabsClick" class="item" label="3"
        >Python</el-radio-button
      >
      <el-radio-button @click="handleTabsClick" class="item" label="4"
        >移动</el-radio-button
      >
    </el-radio-group>
    <ul class="student-list-warp">
      <li class="item" :key="item.userId" v-for="item in studentList">
        <div class="img"><img :src="item.image" alt="" /></div>
        <div class="info">
          <ul class="header">
            <li class="name">{{ item.userName }}</li>
            <li>{{ item.userId }}</li>
            <li>{{ item.major }}</li>
          </ul>
          <div class="footer">{{ item.mail }}</div>
        </div>
      </li>
    </ul>
    <el-pagination
    @current-change="handlePaginationChange"
      class="student-detail-pagnination"
      layout="prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import { ElRadioGroup, ElRadioButton, ElPagination } from "element-plus";
import { getSignListList } from "../../api/index";
import SignPerson from "../admin/components/SignPerson.vue";
import AdBeacon from "../../components/ad-beacon/AdBeacon.vue";
interface Student {
  grade: null | string;
  image: null | string;
  mail: string;
  major: string;
  userId: string;
  userName: string;
}

export default defineComponent({
  props: {
    info: {
      type: String,
    },
  },
  components: {
    ElRadioButton,
    ElRadioGroup,
    SignPerson,
    ElPagination,
    AdBeacon,
  },
  setup() {
    const courseId = ref<1 | 2 | 3 | 4>(1);
    const studentList = ref<Student[]>([]);
    const total = ref<number>();
    const currentPage = ref<number>(1)

    async function handleTabsClick() {
      const result = await getSignListList(currentPage.value, 10, courseId.value);
      studentList.value = computed(() => result.data.data.items).value;
      total.value = result.data.data.total;
      console.log(currentPage.value, courseId.value)
    }
    async function handlePaginationChange (index:number){
        currentPage.value = index
        const result = await getSignListList(currentPage.value, 10, courseId.value);
      studentList.value = computed(() => result.data.data.items).value;
      total.value = result.data.data.total;
    }
    onMounted(async () => {
      const result = await getSignListList(currentPage.value, 10, 1);
      studentList.value = computed(() => result.data.data.items).value;
      total.value = result.data.data.total;
    });
    return {
      courseId,
      total,
      studentList,
      handleTabsClick,
      handlePaginationChange
    };
  },
});
</script>
<style lang="scss">
.studnet-detail {
  .title {
    width: 80%;
    margin: -5vh auto 5vh auto;
    text-align: center;
  }
  background-color: rgba($color: #fff, $alpha: 0.7);
  width: 95%;
  border-radius: 50px;
  height: 700px;
  margin: 10vh auto;
  box-shadow: -1px -1px 3px #ffffff, 1.5px 1.5px 3px rgba(174, 174, 192, 0.4);
  .course-selection {
    margin: 0 auto;
    text-align: center;
    display: block;
    width: 86vw;
    .item {
      width: 20%;
      text-align: center;
    }
  }
  .student-list-warp {
    width: 75%;
    margin: 3vh auto;
    display: flex;
    height: 50vh;
    flex-wrap: wrap;
    .item {
      border-bottom: 1px solid #cecece;
      margin: 5px auto;
      padding-bottom: 5px;
      width: 48%;
      height: 10vh;
      display: flex;
      .img {
        height: 100%;
        width: 16%;
        margin-left: 1vw;
        background-color: red;
        border: 1px solid #cecece;
        background-color: #eef1ef;
        border-radius: 50%;
      }
      .info {
        .header {
          display: flex;
          line-height: 5vh;
          li {
            width: 7vw;
          }
          .name {
            font-weight: 600;
          }
        }
        .footer {
          width: 100%;
          margin-left: 2.6vw;
        }
      }
    }
  }
}
.student-detail-pagnination {
  display: block;
  margin: 13vh auto;
  text-align: center;
  width: 20%;
}
.el-radio-button__inner {
  width: 100%;
}
</style>