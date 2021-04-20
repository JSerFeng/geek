<template lang="">
  <div class="login-modal">
    <div class="router-link">
      <RouterLink to="/login/" exact-active-class="active">登陆</RouterLink>
      <RouterLink to="/login/register" exact-active-class="active">注册</RouterLink>
    </div>
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
</template>
<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<style lang="scss" scoped>
.login-modal {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 15px;
  background-color: #fff;
  box-sizing: border-box;
  .router-link {
    position: relative;
    box-sizing: border-box;
    padding: 40px;
    a {
      position: absolute;
      left: 15%;
      top: 50%;
      transition: 0.2s;
      display: inline-block;
      text-decoration: none;
      color: rgb(151, 151, 151);
      transform: translate(200%, -50%);
    }
    .active {
      color: rgba(17, 17, 17, 0.644);
      font-size: 34px;
      transform: translate(0, -50%);
    }
  }
  .model {
    width: 70%;
    margin: 0 auto;
  }
}

.v-enter-active {
  transition: 0.2s;
  transform: translateX(0);
}
.v-enter-from {
  transform: translateX(150%);
}
.v-leave-active {
  transition: 0.2s;
  transform: translateX(150%);
}
.v-leave-from {
  transform: translateX(0);
}
</style>