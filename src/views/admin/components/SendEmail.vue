<template>
  <div class="send-email-warp">
    <el-alert
      title="注意:只能选择一个具体报名的方向或者具体的学员发送邮件！"
      type="warning"
    >
    </el-alert>
    <el-input
      class="title-input"
      v-model="title"
      placeholder="请输入标题"
    ></el-input>
    <el-input
      type="textarea"
      :rows="10"
      placeholder="请输入内容"
      v-model="emailContent"
    >
    </el-input>
    <el-select
      @change="handleSelectCourse"
      class="course-select"
      v-model="courseId"
      placeholder="请选择"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-popover
      @hide="handlePopoverHidden"
      placement="top"
      :width="320"
      trigger="click"
    >
      <template #reference>
        <el-button class="select-students">选择学员</el-button>
      </template>
      <ul class="select-student-warp">
        <el-checkbox-group style="margin: 0 auto" v-model="checkList">
          <el-checkbox
            class="check-item"
            :key="item.userId"
            v-for="item in studentList"
            :label="item.userId"
            >{{ item.userName }}</el-checkbox
          >
        </el-checkbox-group>
      </ul>
      <el-pagination
        class="select-pageination"
        layout="prev, pager, next"
        :total="total"
        @current-change="handlePaginationChange"
      >
      </el-pagination>
    </el-popover>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref, reactive, computed, Ref } from "vue";
import { getSignListList, reqAdminSendEmail } from "../../../api/index";
import { ElCheckboxGroup, ElMessage } from "element-plus";
import useSendCheck from "../hooks/useCheckSend";
import { storage } from "../../../utils/shared";
interface option {
  value: "1" | "2" | "3" | "4";
  label: "前端" | "后端" | "移动" | "Python";
}
interface Student {
  grade: null | string;
  image: null | string;
  mail: string;
  major: string;
  userId: string;
  userName: string;
}
export default defineComponent({
  components: {
    ElCheckboxGroup,
  },
  setup(props, ctx) {
    const emailContent = ref<string>("");
    const title = ref<string>("");
    const courseId = ref<1 | 2 | 3 | 4 | "">('');
    const total = ref<number>(0);
    const studentList = ref<Student[]>([]);
    const checkList = ref<string[]>([]);
    const adminId:string = storage.get('adminId')
    console.log(adminId)
    const options = reactive<option[]>([
      {
        value: "1",
        label: "前端",
      },
      {
        value: "2",
        label: "后端",
      },
      {
        value: "3",
        label: "移动",
      },
      {
        value: "4",
        label: "Python",
      },
    ]);
    ctx.expose({
      sendEmail,
    });
    function handleSelectCourse() {
      checkList.value = [];
    }
    function handlePopoverHidden() {
      if (checkList.value.length > 0) {
        courseId.value = "";
      }
    }
    async function handlePaginationChange(index:number){
      const result = await getSignListList(index, 10);
      studentList.value = computed(() => result.data.data.items).value;
      total.value = result.data.data.total;
    }
    function reset (){
      courseId.value = ''
      checkList.value = []
      title.value = ''
      emailContent.value = ''
    }

    async function sendEmail(dialogVisible:Ref<boolean>) {
      // 测试接口的时候传入courseId，checkList， title， emailContent、adminId
      // console.log(
      //   courseId.value,
      //   checkList.value,
      //   title.value,
      //   emailContent.value
      // );
      const isLegal = useSendCheck(
        courseId.value,
        checkList.value,
        title.value,
        emailContent.value
      );
      if (isLegal) {
        const result = await reqAdminSendEmail(
          title.value,
          emailContent.value,
          adminId,
          courseId.value,
          checkList.value
        );
        if (result.error_code === 200) {
          ElMessage({
            type: "success",
            message: result.message,
          });
          dialogVisible.value = false
          reset()
        } else {
          ElMessage({
            type: "error",
            message: result.message,
          });
          reset()
        }
      } else {
        ElMessage({
          type: "error",
          message: "信息不能为空！",
        });
      }
    }
    onMounted(async () => {
      const result = await getSignListList(1, 10);
      studentList.value = computed(() => result.data.items).value;
      total.value = result.data.total;
    });
    return {
      emailContent,
      options,
      courseId,
      total,
      studentList,
      checkList,
      handleSelectCourse,
      handlePopoverHidden,
      title,
      handlePaginationChange
    };
  },
});
</script>

<style lang="scss">
.send-email-warp {
  .title-input {
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .course-select {
    margin-top: 2vh;
  }
  .select-students {
    margin-left: 2vw;
  }
}
.select-student-warp {
  width: 90%;
  height: 90%;
  margin: 0 auto;
  border-radius: 5vh;
  line-height: 3vh;
  display: flex;
  .check-item {
    width: 6vw;
  }
}
.select-pageination {
  margin: 5vh auto 0 auto;
  width: 10vw;
}
</style>