<template>
  <div>
    <h3 class="header">
      <slot name="header">我们需要验证</slot>
      {{ props.address }}
    </h3>
    <g-button @click="send" type="reverse" class="send-btn" :disabled="sendDisable">{{ sendText }}</g-button>
    <div class="code-input">
      <CodeInput v-model="authCode" />
    </div>

    <g-button class="confirm-btn" type="broke" @click="confirm" :loading="loading">
      <slot name="confirmBtn">注册</slot>
    </g-button>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import { ElNotification } from 'element-plus'
import { useCountingSend } from './hooks';
import CodeInput from '../code-input/CodeInput.vue'
import {GButton} from "../geek"

const props = defineProps<{
  address: string,
  request: (...arsg: any) => any,
  confirm: (authCode: string) => any
}>()

const sendText = ref("发送验证码")
const sendDisable = ref(false)

const sendBtn$ = useCountingSend(props.request, sendText, sendDisable);
const send = (e: Event) => {
  sendBtn$.next(e)
}

const authCode = ref("")
const loading = ref(false)
const confirm = async () => {
  if (authCode.value.trim().length === 6) {
    loading.value = true
    await props.confirm(authCode.value)
    loading.value = false
  } else {
    ElNotification({
      message: "请输入6位验证码"
    })
  }
}
</script>

<style lang="scss" scoped>
.header {
  font-weight: 100;
  font-size: 26px;
}
.send-btn {
  display: block;
  margin: 0 auto;
}
.confirm-btn {
  font-size: 20px;
  margin: 0 auto;
  display: block;
}

.code-input {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 10px 0;
}
</style>