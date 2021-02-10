<template lang="">
  <div class="main">
    <RouterLink to="/login/dologin">登陆</RouterLink>
    <RouterLink to="/login/register">注册</RouterLink>
    <div class="model">
      <router-view v-slot="{ Component }">
        <transition mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<style lang="scss" scoped>
.main {
  width: 50%;
  height: 100%;
  margin: 0 auto;
  background-color: #fff;
  padding: 15px;
  box-sizing: border-box;
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