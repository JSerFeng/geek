<template lang="">
  <div>
    <div class="row">
      <div class="input">
        <el-input v-model="regOpt.userId" placeholder="学号"/>
      </div>
      <CheckMsg :msg="userMsg" :flag="userFlag"/>
    </div>
    <div class="row">
      <div class="input">
        <el-input v-model="regOpt.userName" placeholder="姓名"/>
      </div>
      <CheckMsg :msg="emailMsg" :flag="emailFlag"/>
    </div>
    <div class="row">
      <div class="input">
        <el-input v-model="regOpt.major" placeholder="专业"/>
      </div>
      <CheckMsg :msg="emailMsg" :flag="emailFlag"/>
    </div>
    <div class="row">
      <div class="input">
        <el-input v-model="regOpt.password" placeholder="密码"/>
      </div>
      <CheckMsg :msg="emailMsg" :flag="emailFlag"/>
    </div>
    <div class="row">
      <div class="input">
      <el-input v-model="regOpt.passwordConfirm" placeholder="确认密码"/>
        </div>
      <CheckMsg :msg="emailMsg" :flag="emailFlag"/>
    </div>
    <div class="row">
      <div class="input">
        <el-input v-model="regOpt.email" placeholder="邮箱"/>
      </div>
      <CheckMsg :msg="emailMsg" :flag="emailFlag"/>
    </div>
    <el-button>注册</el-button>
  </div>
</template>

<script lang="ts" setup="">
import { ElInput, ElButton } from 'element-plus'
import { reactive, toRef } from 'vue'
import { useEmailCheck, useUserIdCheck, useNullCheck } from './hooks'
import CheckMsg from './CheckMsg.vue'

const regOpt = reactive({
  userId: "",
  userName: "",
  password: "",
  passwordConfirm: "",
  email: "",
  major: ""
})

const { flag: emailFlag, msg: emailMsg } = useEmailCheck(toRef(regOpt, "email"))
const { flag: userFlag, msg: userMsg } = useUserIdCheck(toRef(regOpt, "userId"))

</script>

<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .input {
    width: 70%;
  }
}
</style>