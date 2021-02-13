<template>
  <el-input
    class="title-input"
    v-model="title"
    placeholder="请输入标题"
  ></el-input>
  <div id="div1"></div>
  <el-select class="course-select" v-model="selValue" placeholder="请选择方向">
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
    :width="200"
    trigger="hover"
  >
    <template #reference>
      <el-button>选择要发送的学员</el-button>
    </template>
    这里是一个分页器
  </el-popover>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref, reactive, Ref, toRaw } from "vue";
import E from "wangeditor";
import { useGetUserInfo } from '../hooks/useUserInfo'

export default defineComponent({
  created() {
    console.log(toRaw(this.userInfo))
  },
  setup() {
    let title = ref("") as Ref<string>;
    let selValue = ref("") as Ref<string>;
    let visible = ref(false) as Ref<boolean>;
    const checked = ref(false) as Ref<boolean>;
    const { getUserInfo, userInfo } = useGetUserInfo()
    const options = reactive([
      {
        value: "font",
        label: "前端",
      },
      {
        value: "end",
        label: "后端",
      },
      {
        value: "py",
        label: "Python",
      },
    ]);
    onMounted(() => {
      const editor = new E("#div1");
      editor.create();
    });
   
    return {
      title,
      options,
      selValue,
      visible,
      checked,
      getUserInfo,
      userInfo
    };
  },
});
</script>

<style lang="scss">
.title-input {
  margin-bottom: 10px;
}
.course-select {
  margin-top: 10px;
  margin-right: 20px;
}
</style>