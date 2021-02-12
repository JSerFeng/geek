<template lang="">
  <div>
    <el-input v-model="userId"/>
    {{ userId }}
    <el-input v-model="password"/>
    {{ password }}
    <el-button @click="login">click</el-button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from '../../../store'
import { ElInput, ElButton } from 'element-plus'

const { dispatch } = useStore()
const userId = ref("")
const password = ref("")
const login = () => {
  dispatch("login", {
    userId: userId.value,
    password: password.value
  })
}

</script>
<style lang="">
  
</style>