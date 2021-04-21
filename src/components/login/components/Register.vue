<template>
  <div class="register">
    <div class="row">
      <div class="input">
        <g-input v-model="regOpt.userId" placeholder="学号" />
      </div>
      <CheckMsg :flag="userFlag" :msg="userMsg" />
    </div>
    <div class="row">
      <div class="input">
        <g-input v-model="regOpt.userName" placeholder="姓名" />
      </div>
      <CheckMsg :flag="nameFlag" :msg="nameMsg" />
    </div>
    <div class="row">
      <div class="input">
        <g-input v-model="regOpt.major" placeholder="专业" />
      </div>
      <CheckMsg :flag="majorFlag" :msg="majorMsg" />
    </div>
    <div class="row">
      <div class="input">
        <g-input type="password" v-model="regOpt.password" placeholder="密码" />
      </div>
      <CheckMsg :flag="passwordFlag" :msg="passwordMsg" />
    </div>
    <div class="row">
      <div class="input">
        <g-input type="password" v-model="regOpt.passwordConfirm" placeholder="确认密码" />
      </div>
      <CheckMsg :flag="passwordConfirmFlag" :msg="passwordConfirmMsg" />
    </div>
    <div class="row">
      <div class="input">
        <g-input v-model="regOpt.email" placeholder="邮箱" />
      </div>
      <CheckMsg :msg="emailMsg" :flag="emailFlag" />
    </div>
    <g-button class="btn" @click="open" :disabled="!allValid">注册</g-button>
    <Modal ref="modal" :width="'80%'" :height="'80%'" :onClose="reset">
      <SendEmail ref="resetStack" />
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import { ElNotification } from 'element-plus'
import { GButton, GInput } from '../../geek'
import { reactive, toRef, computed, ref, provide } from 'vue'
import { useEmailCheck, useNullCheck, useUserIdCheck, useSameCheck } from '../hooks'
import { useRefreshCheck } from '../../../utils/shared'
import CheckMsg from './CheckMsg.vue'
import { Flags } from '../../../utils/shared';
import type { Ref } from 'vue'
import Modal from '../../modal/Modal.vue'
import { register } from '../../../api/user';
import SendEmail from './sendEmail/SendEmail.vue'

const regOpt = reactive({
  userId: "",
  userName: "",
  password: "",
  passwordConfirm: "",
  email: "",
  major: ""
})

/**检验有没有被用过 */
const [emailFlag, emailMsg] = useEmailCheck(toRef(regOpt, "email"))
const [userFlag, userMsg] = useUserIdCheck(toRef(regOpt, "userId"))

/**非空检验 */
const [nameFlag, nameMsg] = useNullCheck(toRef(regOpt, "userName"))
const [majorFlag, majorMsg] = useNullCheck(toRef(regOpt, "major"))
const [passwordFlag, passwordMsg] = useNullCheck(toRef(regOpt, "password"))

/**检验密码是否一致 */
const [passwordConfirmFlag, passwordConfirmMsg] = useSameCheck(toRef(regOpt, "password"))(toRef(regOpt, "passwordConfirm"))

/**检验是否全部输入都合法 */
const flagCollection = ref([emailFlag, userFlag, nameFlag, majorFlag, passwordFlag, passwordConfirmFlag])
const allValid = computed(() => {
  let i = 0
  while (i < flagCollection.value.length) {
    if (flagCollection.value[i].value !== Flags.Success) {
      return false
    }
    i++
  }
  return true
})

/**展开页面 */
const modal: Ref<{ open(): void, close(): void } | null> = ref(null)
const open = () => {
  modal.value!.open()
}

/**为了让注册成功退出弹窗后能够重置到注册面板而不是显示成功面板 */
const resetStack: Ref<any> = ref(null)
const reset = () => {
  if (resetStack.value) {
    resetStack.value.reset()
  }
}

provide("close", () => {
  modal.value!.close()
})
provide("register", (authCode: string) => {
  if (allValid.value) {
    return register(
      regOpt.userId, regOpt.userName, regOpt.password, regOpt.email, regOpt.major, authCode
    )
  } else {
    ElNotification({
      message: "请检查信息是否全部无误填写完毕"
    })
    return Promise.resolve(null)
  }
})

provide("userId", toRef(regOpt, "userId"))
provide("email", toRef(regOpt, "email"))
//防止误刷新
useRefreshCheck()
</script>

<style lang="scss" scoped>
.register {
  width: 100%;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .input {
    width: 80%;
  }
}

.email-modal {
  h3 {
    font-weight: 100;
  }
}

.btn {
  width: 80%;
}
</style>