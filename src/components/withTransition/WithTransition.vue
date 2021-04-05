<template>
  <transition :name="props.method || className" mode="in-out">
    <slot></slot>
  </transition>
</template>
<script lang="ts" setup>
import { defineProps, ref, watch } from 'vue'
import type { Ref } from 'vue'
const props = defineProps<{
  method?: "push" | "pop",
  path?: string
}>()

const className: Ref<"pop" | "push"> = ref("push")

/**路由跳转的栈，用来保存每次路由地址 */
const historyStack: Ref<(string | undefined)[]> = ref([props.path])

watch(() => props.path, (newPath: string | undefined) => {
  if (!props.method) {
    if (newPath === historyStack.value[historyStack.value.length - 2]) {
      historyStack.value.pop()
      className.value = "pop"
    } else {
      historyStack.value.push(newPath)
      className.value = "push"
    }
  }
})
</script>
<style lang="scss" scoped>
.push-enter-active {
  z-index: 1000000000000000000000000000000000000000000000000000000;
  transition: 0.2s;
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(0);
}
.push-enter-from {
  z-index: 1000000000000000000000000000000000000000000000000000000;
  transform: translateX(100%);
}
.push-leave-active {
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
}
.pop-leave-active {
  z-index: 1000000000000000000000000000000000000000000000000000000;
  transition: 0.2s;
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(100%);
}
.pop-leave-from {
  z-index: 1000000000000000000000000000000000000000000000000000000;
  position: absolute;
  left: 0;
  top: 0;
}
.pop-enter-from,
.pop-enter-active {
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
}
</style>