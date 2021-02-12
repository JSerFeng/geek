<template lang="">
  <div class="main">
    <div class="login-modal">
      <RouterLink to="/login">登陆</RouterLink>
      <RouterLink to="/login/register">注册</RouterLink>
      <div class="model">
        <router-view v-slot="{ Component }">
          <transition mode="out-in">
            <keep-alive>
              <component :is="Component"/>
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 15px;
  box-sizing: border-box;

  .login-modal {
    width: 50%;
    margin: 0 auto;
  }
}
.model {
  width: 100%;
  height: 100%;
}
.v-enter-active {
  transition: 0.2s;
  transform: translateX(0);
}
.v-enter-from {
  transform: translateX(100%);
}
.v-leave-active {
  transition: 0.2s;
  transform: translateX(100%);
}
.v-leave-from {
  transform: translateX(0);
}
</style>