<template>
  <div class="main">
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
 * !!!完全理解项目前置技术栈包含: 
 *  ts
 *  vue3全家桶
 *  vue3 script setup语法糖
 *  rxjs基础
 */
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
}
.p {
  cursor: pointer;
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
}
.shade {
  box-shadow: -1px -1px 3px #ffffff, 1.5px 1.5px 3px rgba(174, 174, 192, 0.4);
}
.active-drag {
  position: relative;
  &::after {
    content: "拖放到此处";
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgb(255, 255, 255);
    filter: opacity(1);
    border-radius: 20px;
    box-shadow: 0 0 50px rgb(0, 0, 51);
  }
}
</style>