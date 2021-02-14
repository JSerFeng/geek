<template>
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
  <div id="div1"></div>
  <el-select
    @clear="handleSelectClear"
    clearable
    class="course-select"
    v-model="selValue"
    @change="handleSelectChange"
    placeholder="请选择方向"
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
    placement="top-start"
    title="选择要发送的学员"
    :width="230"
    trigger="hover"
  >
    <template #reference>
      <el-button>选择要发送的学员</el-button>
    </template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleTabsClick">
      <el-tab-pane ref="fonttab" label="前端" name="1">
        <el-checkbox
          v-model="checkedList[index]"
          v-for="(item, index) in userInfo.data.data.items"
          :key="index"
          @change="
            (value) => {
              checkChange(item.userId, value);
            }
          "
          :label="item.userId"
          >{{ item.userName }}</el-checkbox
        >
      </el-tab-pane>
      <el-tab-pane label="后端" name="2">
        <el-checkbox
          v-model="checkedList[index]"
          v-for="(item, index) in userInfo.data.data.items"
          :key="index"
          @change="
            (value) => {
              checkChange(item.userId, value);
            }
          "
          :label="item.userId"
          >{{ item.userName }}</el-checkbox
        ></el-tab-pane
      >
      <el-tab-pane label="Python" name="3">
        <el-checkbox
          v-model="checkedList[index]"
          v-for="(item, index) in userInfo.data.data.items"
          :key="index"
          @change="
            (value) => {
              checkChange(item.userId, value);
            }
          "
          :label="item.userId"
          >{{ item.userName }}</el-checkbox
        ></el-tab-pane
      >
    </el-tabs>
    <el-pagination
      @update:current-page="handlePaginationClick"
      layout="prev, pager, next"
      :total="userInfo.data.data.total"
    >
    </el-pagination>
  </el-popover>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref, reactive, Ref, toRaw } from "vue";
import E from "wangeditor";
import { useGetUserInfo } from "../hooks/useUserInfo";
import useSelect from "../hooks/useSelect";
import { adminSendEmail } from "../../../utils/shared";
import { reqAdminSendEmail} from '../../../api/index'
import { ElMessage } from 'element-plus'
export default defineComponent({
  setup(props, context) {
    context.expose({
      handleSendEmailClick,
    });
    let editor:any
    let title = ref("") as Ref<string>;
    const checkedList = reactive<boolean[]>([]);
    const activeName = ref(1) as Ref<number>;
    const userIdArr: Set<string> = new Set<string>([]);
    let {
      options,
      handleSelectChange,
      handleSelectClear,
      selValue,
    } = useSelect();
    const {
      getUserInfo,
      userInfo,
      handleTabsClick,
      handlePaginationClick,
      paramsObj,
    } = useGetUserInfo();
    onMounted(() => {
      editor = new E("#div1");
      editor.create();
    });
    async function handleSendEmail(
      selValue: string,
      userIdArr: Set<string>,
      adminId: string = "1"
    ) {
      const res = await reqAdminSendEmail(title.value,editor.txt.text(),adminId,selValue,userIdArr)
      if(res.data.error_code !== 200){
        ElMessage('网络错误')
      }else{
        ElMessage(res.data.message)
      }
    }
    function handleSendEmailClick() {
      if (adminSendEmail(selValue.value, userIdArr)) {
        handleSendEmail(selValue.value, userIdArr, "jonfdsa");
      }
    }
    function checkChange(id: string, isSet: boolean): void {
      if (isSet) {
        userIdArr.add(id);
      } else {
        userIdArr.delete(id);
      }
      console.log(toRaw(userIdArr));
    }

    return {
      title,
      options,
      checkedList,
      getUserInfo,
      userInfo,
      activeName,
      handleTabsClick,
      handlePaginationClick,
      paramsObj,
      userIdArr,
      checkChange,
      handleSelectChange,
      handleSelectClear,
      selValue,
      handleSendEmailClick,
    };
  },
});
</script>

<style lang="scss">
.title-input {
  margin-bottom: 10px;
  margin-top: 10px;
}
.course-select {
  margin-top: 10px;
  margin-right: 20px;
}
</style>