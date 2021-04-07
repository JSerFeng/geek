<template lang="">
  <div>
    <div class="input-item">
      <GInput v-model="userId" placeholder="学号"/>
      <CheckMsg :flag="userFlag" :msg="userMsg"></CheckMsg>
    </div>
    <div class="input-item">
      <GInput v-model="password" placeholder="密码"/>
      <CheckMsg :flag="pwdFlag" :msg="pwdMsg"></CheckMsg>
    </div>
    <a class="a-tip p" @click="openFindPassword">忘记密码?</a>
    <ForgotPassword ref="operator" />
    <GQueryBtn :request="login" type="broke" class="login-btn">登陆</GQueryBtn>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from '../../../store'
import { useRouter } from 'vue-router'
import type { Actions } from '../../../store/modules/user/actions'
import { GInput, GQueryBtn } from '../../geek'
import { ElNotification } from 'element-plus';
import { ActionTypes } from '../../../store/modules/user/actions';
import { ErrorCode } from '../../../api/request';
import ForgotPassword from './forgot-password/ForgotPassword.vue'
import type { ExposeMethods } from './forgot-password/ForgotPassword.vue'
import CheckMsg from './CheckMsg.vue'
import { useNullCheck, useUserIdLocalCheck } from '../hooks';

const { dispatch } = useStore()
const router = useRouter()
const userId = ref("")
const password = ref("")

const [userFlag, userMsg] = useUserIdLocalCheck(userId)
const [pwdFlag, pwdMsg] = useNullCheck(password)

const login = async () => {
  if (userId.value && password.value) {
    const res = await dispatch<Actions>({
      type: ActionTypes.Login,
      payload: {
        userId: userId.value,
        password: password.value
      }
    })
    if (res.error_code === ErrorCode.Success) {
      switch (res.data?.user?.type) {
        case "admin":
          router.push("/admin")
        case "super":
          router.push("/super")
        default:
          router.push("/")
      }
    }
  } else {
    ElNotification({ message: "请填写用户名和密码" })
  }
}

const operator = ref<ExposeMethods | null>(null)
const openFindPassword = () => {
  operator.value?.open()
}
</script>
<style lang="scss" scoped>
.login-btn {
  width: 100%;
  font-size: 20px;
}

.a-tip {
  color: rgb(90, 90, 90);
  font-size: 14px;
}
</style>