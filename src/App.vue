<template>
  <div class="main">
    <video class="bg-video" src="./assets/bg.mp4" loop autoplay />
    <router-view v-slot="{  Component, route  }">
      <WithTransition :path="route.path">
        <component :is="Component" />
      </WithTransition>
    </router-view>
  </div>
</template>

<script lang="ts" setup="">
import { RouterView, RouterLink } from 'vue-router'
import WithTransition from './components/withTransition/WithTransition.vue'
</script>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  // transform: translateZ(0);
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

.v-enter-active {
  transition: 0.2s;
  transform: scaleY(1);
  transform-origin: center;
}

.v-enter-from {
  opacity: 0;
  transform: scaleY(0);
}

.v-leave-active {
  transition: 0.2s;
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center;
}

.v-leave-from {
  opacity: 1;
  transform: scaleY(1);
}
</style>