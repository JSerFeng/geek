<template>
  <div class="wrapper">
    <div class="_icon">
      <i class="el-icon-success" style="color: rgb(127, 255, 144);"></i>
    </div>
    <h3>
      <slot>
        成功
        <br />
        <span @click="toLogin" class="to-login">去登陆</span>
      </slot>
    </h3>
  </div>
</template>
<script lang="ts" setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const close = inject<() => any>("close")!
const toLogin = () => {
  close()
  router.push("/login")
}

</script>
<style lang="scss" scopde>
.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;

  ._icon {
    color: rgb(107, 216, 92);
    font-size: 50px;
    margin: 10% auto;
    text-align: center;
  }

  h3 {
    padding: 0;
    margin: 0;
    text-align: center;
    font-weight: 50;
    font-size: 26px;
    .to-login {
      cursor: pointer;
      color: rgb(107, 216, 92);
      text-decoration: underline;
    }
  }
}
</style>