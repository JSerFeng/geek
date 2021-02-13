<template>
  <div class="wrapper">
    <div class="icon">
      <i class="el-icon-success"></i>
    </div>
    <h3>
      注册成功，你现在可以去
      <router-link to="/login">
        <span @click="close" class="to-login">登陆</span>
      </router-link>
    </h3>
  </div>
</template>
<script lang="ts" setup>
import { inject } from 'vue';
import { RouterLink } from 'vue-router'

const close = inject<() => any>("close")
</script>
<style lang="scss" scopde>
.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .icon {
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