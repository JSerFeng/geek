<template>
  <ul class="homework-wrap">
    <li>{{ info.taskName }}</li>
    <li>{{ comCourse(info.courseId) }}</li>
    <li>{{ startTime }}</li>
    <li>{{ closeTime }}</li>
    <li @click="dialogOpen" class="el-icon-edit"></li>
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
        <span style="fontWeight: 600; fontSize: 1rem; marginRight: 7vw"
          >方向:</span
        >
        <el-radio v-model="courseRadio" label="1">前端</el-radio>
        <el-radio v-model="courseRadio" label="2">后端</el-radio>
        <el-radio v-model="courseRadio" label="3">移动</el-radio>
        <el-radio v-model="courseRadio" label="4">Python</el-radio>
      </li>
      <li class="name">
        <span style="fontWeight: 600; fontSize: 1rem; marginRight: 6.5vw"
          >名称:</span
        >
        <el-input
          class="input"
          v-model="courseName"
          placeholder="请输入作业名称"
        ></el-input>
      </li>
      <li class="time">
        <span style="fontWeight: 600; fontSize: 1rem; marginRight: 5vw"
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
        <span style="fontWeight: 600; fontSize: 0.9rem; marginRight: 1vw"
          >是否允许超时提交:</span
        >
        <el-radio v-model="allowSubmitClose" label="1">允许</el-radio>
        <el-radio v-model="allowSubmitClose" label="2">不允许</el-radio>
      </li>
    </ul>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="edithHomeworkDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdithHomework"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  toRaw,
  ComputedRef,
  reactive,
  inject,
  Ref,
  ref
} from "vue";
import { computedCourse } from "../../../utils/shared";
import { updateHomeworkk, deleteHomework } from "../../../api/index";
import {
  ElMessage,
  ElMessageBox,
  ElDialog,
  ElDatePicker,
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
  courseId: 1 | 2 | 3 | 4;
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
    ElDatePicker,
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
    const edithHomeworkDialogVisible = ref<Boolean>(false)
     const courseRadio = ref<'1' | '2' | '3' | '4'>("1");
    const courseName = ref<string>('')
    const submitCloseTime = ref<Date>()
    const allowSubmitClose = ref<'1' | '0'>('1')
    function dialogOpen($event:MouseEvent){
      $event.stopPropagation()
      edithHomeworkDialogVisible.value = true
    }
    async function handleEdithHomework($event: MouseEvent) {
      $event.stopPropagation();
      edithHomeworkDialogVisible.value = false
       // 传入courseId -> courseRadio
      //    adminId -> 登录之后获取
      //    taskName --> courseName
      //    effectiveTime --> submitCloseTime
      //    commitLate --> allowSubmitClose
      const result = await updateHomeworkk({
        //@ts-ignore
        //未知类型错误
        courseId:Number.parseInt(courseRadio.value),
        adminId:'jifdo',
        taskName:courseName.value,
        effectiveTime:submitCloseTime!.value!.getTime().toString(),
        commitLate:Number.parseInt(allowSubmitClose.value) as 0 | 1
      });
      if (result.status === 200) {
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
          const result = await deleteHomework();
          if (result.status === 200) {
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
      dialogOpen
    };
  },
});
</script>
<style lang="scss">
.course-warp {
    line-height: 3rem;
    .name{
      display: flex;
      span{
        display: block;
        width: 3vw;
      }
      .input{
        width: 20vw;
      }
    }
  }
.homework-wrap {
  li{
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