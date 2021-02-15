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
.flex{
  display: flex;
}
.jc{
  justify-content: center;
}
.jb {
  justify-content: space-between;
}
.je {
  justify-content: space-evenly;
}
.ja{
  justify-content: space-around;
}
.ac {
  align-items: center;
}
ul{
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