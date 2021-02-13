<template lang="">
  <div>
    <g-input v-model="userId" placeholder="用户名"/>
    <g-input v-model="password" placeholder="密码"/>
    <g-button @click="login" type="broke" class="login-btn">登陆</g-button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from '../../../store'
import { useRouter } from 'vue-router'
import type { Actions } from '../../../store/modules/user/actions'
import GInput from '../../g-input/GInput.vue'
import GButton from '../../g-button/GButton.vue'
import { ElNotification } from 'element-plus';
import { ActionTypes } from '../../../store/modules/user/actions';
import { ErrorCode } from '../../../api/request';

const { dispatch } = useStore()
const router = useRouter()
const userId = ref("")
const password = ref("")

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
      }
    }
  } else {
    ElNotification({ message: "请填写用户名和密码" })
  }
}

</script>
<style lang="scss" scoped>
.login-btn {
  width: 100%;
  font-size: 20px;
}
</style>