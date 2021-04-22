<template lang="">
  <div class="m">
    <div @click.sync="goBack" class="el-icon-back p"></div>
    <SendAuthCode :request="request" :confirm="confirm" :address="email"></SendAuthCode>
  </div>
</template>
<script lang="ts" setup>
import { findBackPassword, sendActiveMail } from '../../../../api/user';
import SendAuthCode from '../../../sendAuthCode/SendAuthCode.vue'
import { EmailType } from '../../../../config/config'
import { inject } from 'vue'
import type { Ref } from 'vue'
import { ErrorCode } from '../../../../api/request';

const email = inject<Ref<string>>("email")!
const userId = inject<Ref<string>>("userId")!
const newPassword = inject<Ref<string>>("newPassword")!
const goBack = inject<() => void>("pop")!
const goNext = inject<() => void>("push")!

const confirm = async (code: string) => {
  const res = await findBackPassword(userId.value, newPassword.value, code)
  if (res.error_code === ErrorCode.Success) {
    goNext()
  }
}

/**邮件类型请求 */
const req = sendActiveMail(EmailType.Password)

const request = () => req(userId.value, email.value)
</script>
<style lang="scss">
.m {
  background-color: #fff;
}
</style>