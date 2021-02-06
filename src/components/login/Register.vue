<template lang="">
  <el-input v-model="regOpt.userId" placeholder="学号"/>
  <el-input v-model="regOpt.userName" placeholder="姓名"/>
  <el-input v-model="regOpt.password" placeholder="密码"/>
  <el-input v-model="regOpt.passwordConfirm" placeholder="确认密码"/>
  <el-input v-model="regOpt.mail" placeholder="邮箱"/>
  <el-input v-model="regOpt.major" placeholder="专业"/>
  <el-button>注册</el-button>
</template>

<script lang="ts" setup="">
import { ElInput, ElButton } from 'element-plus'
import { reactive } from 'vue'

const regOpt = reactive({
  userId: "",
  userName: "",
  password: "",
  passwordConfirm: "",
  mail: "",
  major: ""
})
</script>

<style lang="scss">
  
</style>