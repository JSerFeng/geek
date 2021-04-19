<template>
  <ul class="homework-wrap">
    <li>{{ info.taskName }}</li>
    <li>{{ comCourse(info.courseId) }}</li>
    <li>{{ startTime }}</li>
    <li>{{ closeTime }}</li>
    <li @click="editOpen" class="el-icon-edit"></li>
    <li @click="handleDeleteHomework" class="el-icon-delete"></li>
  </ul>
  <el-dialog
    :center="true"
    title="修改作业 "
    v-model="edithHomeworkDialogVisible"
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
        <el-radio v-model="courseRadio" label="4">移动</el-radio>
        <el-radio v-model="courseRadio" label="3">Python</el-radio>
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
        <el-time-picker v-model="submitCloseTime" placeholder="任意时间点">
        </el-time-picker>
      </li>
      <li class="submit">
        <span style="fontweight: 600; fontsize: 0.9rem; marginright: 1vw"
          >是否允许超时提交:</span
        >
        <el-radio v-model="allowSubmitClose" label="1">允许</el-radio>
        <el-radio v-model="allowSubmitClose" label="2">不允许</el-radio>
      </li>
    </ul>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="edithHomeworkDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdithHomework">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  ComputedRef,
  reactive,
  inject,
  Ref,
  ref,
  toRaw,
} from "vue";
import { computedCourse, storage } from "../../../utils/shared";
import { updateHomeworkk, deleteHomework } from "../../../api/index";
import {
  ElMessage,
  ElMessageBox,
  ElDialog,
  ElTimePicker,
  ElInput,
  ElRadio,
  ElButton,
} from "element-plus";

export interface EditHomework {
  id: number;
  courseId: 1 | 2 | 3 | 4; //作业对应的方向
  adminId: string;
  taskName: string;
  effectiveTime: string;
  commitLate: 0 | 1; //作业是否可以超时提交（0代表不能超时提交，1代表能），不传默认为0
  isClosed: 0 | 1; //作业是否关闭提交通道（0代表作业还能提交，1代表不能），默认0
  weight: number;
}

interface File {
  fileName: string;
  filePath: string;
  addTime: string;
}

export interface Info<F> {
  id: number;
  courseId: string;
  adminId: string;
  taskName: string;
  addTime: string;
  closeTime: string;
  commitLate: 0 | 1;
  isClosed: 0 | 1;
  weight: number;
  taskFileVOList: F[];
  filePath: null | string;
}

export default defineComponent({
  components: {
    ElDialog,
    ElTimePicker,
    ElInput,
    ElRadio,
    ElButton,
  },
  props: ["item"],
  setup(props) {
    const info = reactive<Info<File>>(props.item);
    const taskId: ComputedRef<number> = computed(() =>
      Number.parseInt(props.item.id)
    );
    // 日期格式 --> yyyy-MM-dd HH:mm:ss
    const startTime: ComputedRef<string> = computed(() => {
      const arr = props.item.addTime;
      return arr[5] + arr[6] + "-" + arr[8] + arr[9];
    });
    const closeTime: ComputedRef<string> = computed(() => {
      const arr = props.item.closeTime;
      return arr[5] + arr[6] + "-" + arr[8] + arr[9];
    });
    const comCourse = computedCourse;
    const data = (inject("homeworkData") as any) as Ref<any[]>;
    const deleteHomeworkById = inject<
      (homeworkList: any[], taskId: number) => any[]
    >("deleteHomeworkById");
    const editTaskById = inject<(homeworkList: any[], content: any) => any[]>(
      "editTaskById"
    );
    const edithHomeworkDialogVisible = ref<Boolean>(false);
    const courseRadio = ref<string>(info.courseId.toString());
    const courseName = ref<string>(info.taskName);
    const submitCloseTime = ref<Date>();
    const allowSubmitClose = ref<"1" | "2">("1");
    const adminId:string = storage.get('adminId')
    function editOpen(e: MouseEvent) {
      e.stopPropagation();
      edithHomeworkDialogVisible.value = true;
    }
    async function handleEdithHomework($event: MouseEvent) {
      $event.stopPropagation();
      // 传入courseId -> courseRadio
      //    adminId -> 登录之后获取
      //    taskName --> courseName
      //    effectiveTime --> submitCloseTime
      //    commitLate --> allowSubmitClose
      const content = {
        courseId: Number.parseInt(courseRadio.value),
        adminId: adminId,
        taskName: courseName.value,
        effectiveTime: submitCloseTime!.value!.getTime(),
        commitLate: Number.parseInt(allowSubmitClose.value) as 0 | 1,
        id:taskId.value
      };
      console.log(new Date(content.effectiveTime).toLocaleString());
      //@ts-ignore
      //未知类型错误
      const result = await updateHomeworkk(content);
      console.log(result)
      if (result.error_code === 200) {
        // effectiveTime: 2021/4/18下午5:18:04
        // 日期格式 --> yyyy-MM-dd HH:mm:ss
        const effectiveTime: ComputedRef<string> = computed(() => {
          const localTime = new Date(content.effectiveTime)
            .toLocaleString()
            .toString();
          if (localTime[6] === "/") {
            const arr = [...localTime];
            arr.splice(5, 0, "0");
            return arr.join("");
          }
          return localTime;
        });
        editTaskById!(data.value, {
          ...content,
          effectiveTime: effectiveTime.value,
        });
        console.log(data);
        edithHomeworkDialogVisible.value = false;
        ElMessage({
          type: "success",
          message: "作业修改成功！",
        });
      } else {
        ElMessage({
          type: "error",
          message: "网络错误！",
        });
      }
    }
    async function handleDeleteHomework($event: MouseEvent) {
      $event.stopPropagation();
      ElMessageBox.confirm("此操作将永久删除此作业, 是否继续?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 这里要传入作业id和adminId 作业id就是 taskId
          const result = await deleteHomework({id:taskId.value, adminId}) as any
          console.log(result)
          if (result.error_code === 200) {
            deleteHomeworkById!(data.value, taskId.value);
            ElMessage({
              type: "success",
              message: "删除成功！",
            });
          } else {
            ElMessage({
              type: "error",
              message: "网络错误！",
            });
          }
        })
        .catch(() => {
          ElMessage({
            type: "warning",
            message: "取消删除",
          });
        });
    }
    return {
      comCourse,
      startTime,
      closeTime,
      handleEdithHomework,
      handleDeleteHomework,
      info,
      edithHomeworkDialogVisible,
      courseRadio,
      courseName,
      submitCloseTime,
      allowSubmitClose,
      editOpen,
    };
  },
});
</script>
<style lang="scss">
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
.homework-wrap {
  li {
    line-height: 11vh;
  }
  .el-icon-edit {
    line-height: 11vh;
  }
  .el-icon-delete {
    line-height: 11vh;
    margin-left: -10vh;
  }
  cursor: pointer;
  font-size: 17px;
  &:hover {
    color: #cecece;
    font-size: 19px;
  }
  display: flex;
  li {
    width: 20%;
  }
}
</style>