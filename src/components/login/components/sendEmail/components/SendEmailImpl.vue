<template>
  <div class="wrap">
    <SendAuthCode address="1114550440@qq.com" :request="sendEmail" :confirm="confirm">
      <template v-slot:header>我们需要验证你的邮箱</template>
    </SendAuthCode>
  </div>
</template>
<script lang="ts" setup>
import SendAuthCode from '../../../../sendAuthCode/SendAuthCode.vue'
import { inject } from 'vue'
import { sendActiveMail } from '../../../../../api';
import { ErrorCode } from '../../../../../api/request';

const sendEmail = sendActiveMail(1).bind(null, "123", "1114550440@qq.com")

const next = inject("next")
const back = inject("back")
const register = inject("register")

const confirm = async (auth: string) => {
  const res = await register(auth)
  if (res && res.error_code === ErrorCode.Success) {
    next()
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>