<template>
  <div class="check-homework">
    <router-link to="/admin">
      <AdBeacon boxStyle="left" title="招生管理" />
    </router-link>
    <router-link to="/taskStatus">
      <AdBeacon boxStyle="right" title="完成状况" />
    </router-link>
    <h1 class="title">作 业 管 理</h1>
    <virtual-list
      class="virtual-list"
      :size="10"
      :list="homeworkList"
      :itemHeight="45"
      :containerHeight="550"
    >
      <template v-slot:default="{ item }">
        <span @click="handleToHomeworkDetail(item.id, item.taskFileVOList)">
          <HomeworkItem :item="item" />
        </span>
      </template>
    </virtual-list>
    <div @click="publishHomeworkDialogVisible = true" class="publish-homework">
      发布作业
    </div>
    <el-dialog
      :center="true"
      title="发布作业"
      v-model="publishHomeworkDialogVisible"
      width="50%"
    >
      <!-- :before-close="handlePublishHomeworkClose" -->
      <ul class="course-warp">
        <li class="course">
          <span style="fontweight: 600; fontsize: 1rem; marginright: 7vw"
            >方向:</span
          >
          <el-radio v-model="courseRadio" label="1">前端</el-radio>
          <el-radio v-model="courseRadio" label="2">后端</el-radio>
          <el-radio v-model="courseRadio" label="3">Python</el-radio>
          <el-radio v-model="courseRadio" label="4">移动</el-radio>
          <el-radio v-model="courseRadio" label="5">设计</el-radio>
          <el-radio v-model="courseRadio" label="6">产品</el-radio>
        </li>
        <li class="name">
          <span style="fontweight: 600; fontsize: 1rem; marginright: 6.5vw"
            >名称:</span
          >
          <el-input
            class="input"
            v-model="courseName"
            placeholder="请输入作业名称"
          ></el-input>
        </li>
        <li class="time">
          <span style="fontweight: 600; fontsize: 1rem; marginright: 5vw"
            >截止时间:</span
          >
          <el-date-picker
            popper-class="pick-close-time"
            v-model="submitCloseTime"
            type="date"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </li>
        <li class="submit">
          <span style="fontweight: 600; fontsize: 0.9rem; marginright: 1vw"
            >是否允许超时提交:</span
          >
          <el-radio v-model="allowSubmitClose" label="1">允许</el-radio>
          <el-radio v-model="allowSubmitClose" label="0">不允许</el-radio>
        </li>
      </ul>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="publishHomeworkDialogVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" @click="handlePublishHomework"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  Ref,
  onMounted,
  provide,
  ref,
  toRaw,
} from "vue";
import VirtualList from "./components/virtualList.vue";
import HomeworkItem from "./components/HomeworkItem.vue";
import { getAdminHomework, publishHomework } from "../../api/index";
import AdBeacon from "../../components/ad-beacon/AdBeacon.vue";
import { useStore } from "../../store/index";
import { Router, useRouter } from "vue-router";
import { MutationTypes } from "../../store/modules/admin/mutation";
import {
  ElMessage,
  ElMessageBox,
  ElDialog,
  ElRadio,
  ElDatePicker,
} from "element-plus";
import { deleteTaskById, editTaskById, storage } from "../../utils/shared";
import usePublishTask from "./hooks/usePublishTask";
export interface File {
  addTime: string;
  fileName: string;
  filePath: string;
}

export interface Homework<T> {
  addTime: string;
  adminId: string;
  closeTime: string;
  commitLate: 0 | 1;
  courseId: number;
  filePath: null | string;
  id: number;
  isClosed: number;
  taskFileVOList: T[];
  taskName: string;
  weight: number;
}

export interface PublishHomework {
  courseId: number;
  adminId: string;
  taskName: string;
  effectiveTime: string;
  commitLate?: 0 | 1; //作业是否可以超时提交（0代表不能超时提交，1代表能），不传默认为0
  isClosed?: 0 | 1; //作业是否关闭提交通道（0代表作业还能提交，1代表不能），默认0
  weight?: number; //此次作业权重，不传默认为1
}
export default defineComponent({
  components: {
    VirtualList,
    HomeworkItem,
    AdBeacon,
    ElMessage,
    ElMessageBox,
    ElDialog,
    ElRadio,
    ElDatePicker,
  },
  setup() {
    const getHomework = getAdminHomework;
    const homeworkList = ref<Homework<File>[]>([]);
    const Router: Router = useRouter();
    const Store = useStore();
    const publishHomeworkDialogVisible = ref<boolean>(false);
    const courseRadio = ref<string>("1");
    const courseName = ref<string>("");
    const submitCloseTime = ref<Date>();
    const allowSubmitClose = ref<"1" | "0">("1");
    const adminId = storage.get("adminId");
    provide<Ref<Homework<File>[]>>("homeworkData", homeworkList);
    provide<(homeworkList: any[], taskId: number) => any[]>(
      "deleteHomeworkById",
      deleteTaskById
    );
    provide<(homeworkList: any[], content: any) => any[]>(
      "editTaskById",
      editTaskById
    );
    function handleToHomeworkDetail(id: number, files: File[]) {
      Router.push("/taskDetail/" + id);
      Store.commit({
        type: `${MutationTypes.addFiles}`,
        payload: files,
      });
    }
    async function handlePublishHomework() {
      if (usePublishTask(courseName.value, submitCloseTime.value!)) {
        publishHomeworkDialogVisible.value = false;
        // 传入courseId -> courseRadio
        //    adminId -> 登录之后获取
        //    taskName --> courseName
        //    effectiveTime --> submitCloseTime
        //    commitLate --> allowSubmitClose
        homeworkList.value.push({
          ...{
            addTime: "2021-04-19 00:29:04",
            adminId: "2019211300",
            closeTime: "2021-04-29 00:00:00",
            commitLate: 1,
            courseId: 1,
            filePath: null,
            id: 20,
            isClosed: 0,
            taskFileVOList: [],
            taskName: "hello",
            weight: 1,
          },
          ...{
            courseId: Number.parseInt(courseRadio.value),
            adminId,
            taskName: courseName.value,
            effectiveTime: submitCloseTime!.value!.getTime().toString(),
            commitLate: Number.parseInt(allowSubmitClose.value) as 0 | 1,
          },
        });
        const result = (await publishHomework({
          courseId: Number.parseInt(courseRadio.value),
          adminId,
          taskName: courseName.value,
          effectiveTime: submitCloseTime!.value!.getTime().toString(),
          commitLate: Number.parseInt(allowSubmitClose.value) as 0 | 1,
        })) as any;
        if (result.error_code === 200) {
          ElMessage({
            type: "success",
            message: "发布成功！",
          });
          courseName.value = ''
        } else {
          ElMessage({
            type: "error",
            message: "网络错误！",
          });
          courseName.value = ''
        }
      }
    }
    onMounted(async () => {
      const result = await getHomework(adminId);
      homeworkList.value = computed(() => result.data.taskPOList).value;
    });
    return {
      homeworkList,
      handleToHomeworkDetail,
      handlePublishHomework,
      publishHomeworkDialogVisible,
      courseRadio,
      courseName,
      submitCloseTime,
      allowSubmitClose,
    };
  },
});
</script>
<style lang="scss">

.check-homework {
  
  @media screen and (min-width: 800px) {
    .course-warp {
      line-height: 3rem;
      .name {
        display: flex;
        span {
          display: block;
          width: 3vw;
        }
        .input {
          width: 20vw;
        }
      }
    }
    .virtual-list {
      margin-left: -20vh;
    }
    .publish-homework {
      position: absolute;
      left: 165vh;
      top: 30vh;
      border: 3vh solid #b3caea;
      // outline: 3vh solid #D6E3F5;
      box-shadow: 0 0 5vh 2vh #b3caea;
      width: 25vh;
      font-size: 3vh;
      height: 25vh;
      border-radius: 50%;
      cursor: pointer;
      text-align: center;
      line-height: 25vh;
      background-color: #f4f7fd;
      transition: all 0.3s;
      background-image: repeating-radial-gradient(white, #dbe6f3);
      &:hover {
        transform: scale(1.1);
  color: black;

      }
    }
  }
  @media screen and (max-width: 799px) {
    .course-warp {
      line-height: 3rem;
      .name {
        display: flex;
        span {
          display: block;
          width: 3vw;
        }
        .input {
          width: 20vw;
        }
      }
    }
    .virtual-list {
      transform: scale(0.6) translateY(-20%);
      position: relative;
      left: -15%;
    }
    .publish-homework {
      position: absolute;
      top: 70vh;
      left: 50%;
      border: 3vh solid #b3caea;
      // outline: 3vh solid #D6E3F5;
      box-shadow: 0 0 5vh 2vh #b3caea;
      width: 25vh;
      transform: scale(0.7) translateX(-70%);
      font-size: 3vh;
      height: 25vh;
      border-radius: 50%;
      cursor: pointer;
      text-align: center;
      line-height: 25vh;
      background-color: #f4f7fd;
      transition: all 0.3s;
      background-image: repeating-radial-gradient(white, #dbe6f3);
    }
  }
  .title {
    width: 80%;
    margin: 5vh auto;
    text-align: center;
    color: white;
  }
}
</style>