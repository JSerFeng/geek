<template lang="">
  <div class="wrap p bg-bottom" @click="go">
    <div class="font-wrap">
      <div class="font-main">作业</div>
      <div class="font-vice">查看提交作业</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ElNotification } from '_element-plus@1.0.2-beta.41@element-plus'
// import { ElNotification } from '_element-plus@1.0.2-beta.40@element-plus'
import { useStore } from '../../../store'
const router = useRouter()
const store = useStore()

const go = () => {
  if (store.state.user.isLogin) {
    router.push("/homework")
  } else {
    ElNotification({
      message: "请先登陆"
    })
  }
}
</script>
<style lang="scss" scoped>
@import "../../../main.scss";
.wrap {
  height: 100%;
  position: relative;
  background-color: rgb(201,192,211);
  .bg {
    position: absolute;
    bottom: 0;
    width: 30%;
    left: 50%;
    transform: translateX(-50%);
  }

  .font-vice {
    color: #fff;
  }
}

.bg-bottom {
  &:before {
    background-color: rgb(122, 114, 129);
  }
}
</style>