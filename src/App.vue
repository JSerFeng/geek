<template>
  <div class="main">
    <!-- <video class="bg-video" src="./assets/bg.mp4" loop autoplay /> -->
    <router-view v-slot="{ Component, route }">
      <WithTransition :path="route.path">
        <component :is="Component" />
      </WithTransition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
/**
 * 你好学弟|学妹，愿：                                   
 * 看到此代码的人找到一份好工作，愿你开心打code，金钱多多多
 * 代码看不懂的地方 联系：
 *    1114550440 冯学长 | 2149857139 曾学长 | you
 *    PS: obviously写的更好的用户端部分是冯学长写的，垃圾的管理端是曾学长写的
 * !!!完全阅读此代码前置技术栈包含: 
 *  vue3全家桶
 *  script setup语法糖
 *  rxjs基础
 *  ts
 */
import { RouterView } from 'vue-router'
import { useStore } from './store'
import { ActionTypes } from './store/modules/user/actions'
import WithTransition from './components/withTransition/WithTransition.vue'
import { onMounted } from 'vue';

const store = useStore()
onMounted(() => {
  store.dispatch(ActionTypes.Reset)
})
</script>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  // transform: translateZ(0);
}
.flex {
  display: flex;
}
.jc {
  justify-content: center;
}
.jb {
  justify-content: space-between;
}
.je {
  justify-content: space-evenly;
}
.ja {
  justify-content: space-around;
}
.ac {
  align-items: center;
}
ul {
  list-style: none;
}
.bg-video {
  z-index: -1;
  position: fixed;
  object-fit: fill;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.main {
  perspective: 1000;
  position: relative;
  overflow-x: hidden;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}

// .v-enter-active {
//   transition: 0.2s;
//   transform: scaleY(1);
//   transform-origin: center;
// }

// .v-enter-from {
//   opacity: 0;
//   transform: scaleY(0);
// }

// .v-leave-active {
//   transition: 0.2s;
//   opacity: 0;
//   transform: scaleY(0);
//   transform-origin: center;
// }

// .v-leave-from {
//   opacity: 1;
//   transform: scaleY(1);
// }
</style>