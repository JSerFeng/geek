<template>
  <div class="register">
    <div class="row">
      <div class="input">
        <el-input v-model="regOpt.userId" placeholder="学号" />
      </div>
      <CheckMsg :flag="userFlag" :msg="userMsg" />
    </div>
    <div class="row">
      <div class="input">
        <el-input v-model="regOpt.userName" placeholder="姓名" />
      </div>
      <CheckMsg :flag="nameFlag" :msg="nameMsg" />
    </div>
    <div class="row">
      <div class="input">
        <el-input v-model="regOpt.major" placeholder="专业" />
      </div>
      <CheckMsg :flag="majorFlag" :msg="majorMsg" />
    </div>
    <div class="row">
      <div class="input">
        <el-input v-model="regOpt.password" placeholder="密码" />
      </div>
      <CheckMsg :flag="passwordFlag" :msg="passwordMsg" />
    </div>
    <div class="row">
      <div class="input">
        <el-input v-model="regOpt.passwordConfirm" placeholder="确认密码" />
      </div>
      <CheckMsg :flag="passwordConfirmFlag" :msg="passwordConfirmMsg" />
    </div>
    <div class="row">
      <div class="input">
        <el-input v-model="regOpt.email" placeholder="邮箱" />
      </div>
      <CheckMsg :msg="emailMsg" :flag="emailFlag" />
    </div>
    <el-button @click="open">注册</el-button>
    <Modal ref="modal" :width="'80%'" :height="'80%'" :onClose="reset">
      <SendEmail :address="regOpt.email" ref="resetStack" />
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { ElInput, ElButton, ElNotification } from 'element-plus'
import { reactive, toRef, computed, ref, onMounted, inject, provide, onUnmounted } from 'vue'
import { useEmailCheck, useNullCheck, useUserIdCheck, useSameCheck } from '../hooks'
import CheckMsg from './CheckMsg.vue'
import { Flags } from '../../../utils/shared';
import StackWindows from '../../stackWindows/StackWindows.vue'
import type { Expose } from '../../stackWindows/StackWindows.vue'
import ExampleA from '../../stackWindows/examples/compA.vue'
import ExampleB from '../../stackWindows/examples/compB.vue'
import ExampleC from '../../stackWindows/examples/compC.vue'
import type { Ref, Component } from 'vue'
import Modal from '../../modal/Modal.vue'
import { register } from '../../../api';
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
const { flag: emailFlag, msg: emailMsg } = useEmailCheck(toRef(regOpt, "email"))
const { flag: userFlag, msg: userMsg } = useUserIdCheck(toRef(regOpt, "userId"))

/**非空检验 */
const { flag: nameFlag, msg: nameMsg } = useNullCheck(toRef(regOpt, "userName"))
const { flag: majorFlag, msg: majorMsg } = useNullCheck(toRef(regOpt, "major"))
const { flag: passwordFlag, msg: passwordMsg } = useNullCheck(toRef(regOpt, "password"))

/**检验密码是否一致 */
const { flag: passwordConfirmFlag, msg: passwordConfirmMsg } = useSameCheck(
  toRef(regOpt, "password"),
  toRef(regOpt, "passwordConfirm")
)

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
const modal: Ref<Component | null> = ref(null)
const open = () => {
  modal.value.open()
}
const resetStack: Ref<any> = ref(null)
const reset = () => {
  if (resetStack.value) {
    resetStack.value.reset()
  }
}
provide("close", () => {
  modal.value.close()
})
provide("register", (authCode) => {
  if (true) {
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

//防止误刷新
function onBeforeLoad(e) {
  const dialogText = '确定刷新吗，如果刷新需要重新注册';
  e.returnValue = dialogText;
  return dialogText;
};
onMounted(() => {
  window.addEventListener("beforeunload", onBeforeLoad)
})
onUnmounted(() => {
  window.removeEventListener("beforeunload", onBeforeLoad)
  sub.unsubscribe()
})
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
    width: 70%;
  }
}

.email-modal {
  h3 {
    font-weight: 100;
  }
}
</style>