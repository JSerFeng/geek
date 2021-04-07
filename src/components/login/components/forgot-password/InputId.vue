<template>
  <keep-alive>
    <div class="input-id">
      <h3 class="title">输入你的学号和新的密码</h3>
      <div class="flex ac input-container">
        <GInput v-model="email" placeholder="邮箱" class="g-input" />
        <CheckMsg :flag="emailFlag" :msg="eamilMsg" />
      </div>
      <div class="flex ac input-container">
        <GInput v-model="userId" placeholder="学号" class="g-input" />
        <CheckMsg :flag="valueFlag" :msg="valueMsg" />
      </div>
      <div class="flex ac input-container">
        <GInput v-model="newPassword" placeholder="新密码" class="g-input" />
        <CheckMsg :flag="pwdFlag" :msg="pwdMsg" />
      </div>
      <div class="flex ac input-container">
        <GInput v-model="confirmPassword" placeholder="确认新密码" class="g-input" />
        <CheckMsg :flag="confirmFlag" :msg="confirmMsg" />
      </div>
      <GButton @click="goNext" type="broke" :disabled="!allSuccess">继续</GButton>
    </div>
  </keep-alive>
</template>
<script  lang="ts" setup="">
import { GInput, GButton } from '../../../geek'
import CheckMsg from '../CheckMsg.vue'
import { useSameCheck, useNullCheck, useUserIdLocalCheck, useLocalEmailCheck } from '../../hooks'
import { computed, inject } from 'vue'
import type { Ref } from 'vue'
import { Flags } from '../../../../utils/shared'

const email = inject<Ref<string>>("email")!
const userId = inject<Ref<string>>("userId")!
const newPassword = inject<Ref<string>>("newPassword")!
const confirmPassword = inject<Ref<string>>("confirmPassword")!

const [emailFlag, eamilMsg] = useLocalEmailCheck(email)
const [valueFlag, valueMsg] = useUserIdLocalCheck(userId)
const [pwdFlag, pwdMsg] = useNullCheck(newPassword)
const [confirmFlag, confirmMsg] = useSameCheck(newPassword)(confirmPassword)

/*进入下一页*/
const push = inject<() => void>("push")!
const allSuccess = computed(() => [valueFlag, pwdFlag, confirmFlag].every(item => item.value === Flags.Success))
const goNext = () => {
  /**验证是否所有表单通过验证 */
  if (allSuccess.value) {
    push()
  }
}
</script>
<style lang="scss" scoped>
.input-id {
  font-size: large;
  font-weight: 100;
  padding: 30px 15px;
}
.title {
  font-weight: 100;
  margin: 0 0 20px;
}
.input-container {
  margin: 10px 0;
}
.g-input {
  width: 60%;
  font-size: 20px;
  margin-right: 10px;
}
</style>