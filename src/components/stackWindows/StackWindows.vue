<template>
  <div class="stack-windows">
    <WithTransition :method="className">
      <component :is="props.stack[currentPointer]" />
    </WithTransition>
  </div>

</template>
<script lang="ts" setup>
/**
 * 使用方法:
 * 传入一个数组。数组每一项是vue组件，例：
 * import HelloWorld from "./HelloWorld.vue"
 * import Home from "./Home.vue"
 * 
 * stackRef = ref(null)
 * 模板内传入
 * <stack-window :stack="[HelloWorld, Home]" ref="stackRef" />
 * 
 * onMounted(() => {
 *  stackRef.value.push()   下一页
 *  stackRef.value.pop()    上一页
 *  stackRef.value.reset()  回到第一页
 * })
 */
import { defineProps, provide, ref, useContext } from 'vue'
import type { Component, Ref } from 'vue'
import WithTransition from '../withTransition/WithTransition.vue'

const props = defineProps<{
  stack: Component[]
}>()
const currentPointer = ref(0)
const className: Ref<"push" | "pop"> = ref("push")
const canPush = () => currentPointer.value < props.stack.length - 1
const canPop = () => currentPointer.value > 0

const push = () => {
  if (canPush()) {
    currentPointer.value++
    className.value = "push"
  }
}

const pop = () => {
  if (canPop()) {
    currentPointer.value--
    className.value = "pop"
  }
}

const reset = () => {
  currentPointer.value = 0
  className.value = "push"
}

const { expose } = useContext()
expose({
  canPush,
  canPop,
  push,
  pop,
  reset
})

/**为包含的组件注册下一页或者上一页的方法 */
provide("push", push)
provide("pop", pop)
provide("reset", reset)
</script>
<script lang="ts">
export interface Expose {
  canPop(): boolean,
  canPush(): boolean,
  push(): void,
  pop(): void,
  reset():void
}
</script>
<style lang="scss" scoped>
.stack-windows {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-x: hidden;
}

.push-enter-active {
  z-index: 1;
  transition: 0.2s;
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(0);
}
.push-enter-from {
  z-index: 1;
  transform: translateX(100%);
}
.push-leave-active {
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
}
.pop-leave-active {
  z-index: 1;
  transition: 0.2s;
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(100%);
}
.pop-leave-from {
  z-index: 1;
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