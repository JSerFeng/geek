<template>
  <div class="main">
    <div class="nav dark">
      <!-- <div class="flex jc ac nav-item p" @click="goBack">
        <i class="el-icon-back"></i>
      </div> -->
      <div class="flex jc ac nav-item p" @click="goMenu">
        <i class="el-icon-s-home"></i>
      </div>
    </div>
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
 *    1114550440 冯学长 | 2149857139 曾学长
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
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()
const goBack = () => {
  router.back()
}
const goMenu = () => {
  router.push("/home")
}
onMounted(async () => {
  await store.dispatch(ActionTypes.UpdateUserInfo)
  store.dispatch(ActionTypes.Reset)
})
</script>

<style lang="scss">
@import "./main.scss";
html,
body {
  padding: 0;
  margin: 0;
  font-family: poppin, Tahoma, Arial, \5fae\8f6f\96c5\9ed1, sans-serif;
}
a {
  text-decoration: none;
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
  padding: 0;
  margin: 0;
  list-style: none;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 5px;
}
::-webkit-scrollbar:hover {
  width: 10px;
}
::-webkit-scrollbar-thumb:hover {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
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
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.main {
  perspective: 1000;
  position: relative;
  overflow-x: hidden;
  width: 100vw;
  height: 100vh;
  background: rgb(73, 76, 162);
  background: linear-gradient(
    110deg,
    rgba(73, 76, 162, 1) 0%,
    rgba(73, 76, 162, 1) 45%,
    rgba(129, 134, 213, 1) 45%,
    rgba(129, 134, 213, 1) 75%,
    rgba(198, 203, 239, 1) 75%,
    rgba(198, 203, 239, 1) 95%,
    rgba(227, 231, 241, 1) 95%
  );
}
.shade {
  box-shadow: 0 10px 50px rgb(211, 211, 211);
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
.big-font {
  color: black;
  font-size: 1em;
}
.small-font {
  font-size: 0.7em;
  color: #a8a8a8;
  font-weight: 100;
}
.view-main {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  background-color: rgb(241, 241, 241);
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.font-wrap {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em;
  box-sizing: border-box;
  letter-spacing: 0.2em;
  text-align: center;
  &:hover {
    .font-main {
      transform: translateY(-20%);
    }
    .font-vice {
      transform: translate(-50%, 50%);
    }
  }
  .font-main {
    transition: 0.2s;
    z-index: 2;
    color: black;
    font-weight: bolder;
    font-size: 1.5em;
  }
  .font-vice {
    transition: 0.2s;
    z-index: 1;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 0);
    color: #fff;
  }
}
.bg-bottom {
  overflow: hidden;

  &::before {
    content: "";
    z-index: 0;
    position: absolute;
    width: 50%;
    height: 200%;
    right: -50%;
    bottom: -170%;
    transform-origin: 0 0;
    transform: rotate(80deg) translate(0, 0);
    background-color: rgb(224, 224, 224);
  }
}
.bg-g {
  &:before {
    background-color: $g-theme;
  }
}
.bg-q {
  &:before {
    background-color: $q-theme;
  }
}
.font-sm {
  font-weight: 100;
}
.font12 {
  font-size: 12px;
}
.font14 {
  font-size: 14px;
}
.font16 {
  font-size: 16px;
}
.font18 {
  font-size: 18px;
}
.font20 {
  font-size: 20px;
}
.font22 {
  font-size: 22px;
}
.black {
  color: black;
}
.dark {
  color: #525252;
}
.light {
  color: #a8a8a8;
}
.lighter {
  color: #cccccc;
}
.nav {
  position: fixed;
  top: 5px;
  left: 5px;
  z-index: 100;

  .nav-item {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #fff;
    font-size: 90%;
    margin-bottom: 5px;
  }
}
pre {
  background-color: rgb(29, 29, 29);
  color: #fff;
  padding: 15px;
  overflow: auto;
}
</style>