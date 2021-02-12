<template>
  <StackWindows ref="stackWindows" :stack="stack"></StackWindows>
</template>
<script setup lang="ts">
import { defineProps, onMounted, provide, ref, useContext } from 'vue'
import { ElButton } from 'element-plus'
import StackWindows from '../../../stackWindows/StackWindows.vue'
import SendEmailImpl from './components/SendEmailImpl.vue'
import Success from './components/Success.vue'

const { expose } = useContext()
const stack = [SendEmailImpl, Success]

const props = defineProps<{
  address: string,
}>()

const authInput = ref("")

const stackWindows: Ref<any> = ref(null)

provide("next", () => {
  if (stackWindows.value && stackWindows.value.push) {
    stackWindows.value.push()
  }
})

provide("back", () => {
  if (stackWindows.value && stackWindows.value.pop) {
    stackWindows.value.pop()
  }
})

expose({
  reset() {
    stackWindows.value.reset()
  }
})
</script>
<style lang="scss" scoped>
.send-email {
  width: 100%;
  height: 100%;

  .header {
    font-weight: 100;
    font-size: 20px;
    letter-spacing: 0.1em;
    color: #000;
  }
}
</style>