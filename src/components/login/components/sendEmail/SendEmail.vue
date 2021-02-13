<template>
  <StackWindows ref="stackWindows" :stack="stack"></StackWindows>
</template>
<script setup lang="ts">
import { defineProps, provide, ref, useContext } from 'vue'
import StackWindows from '../../../stackWindows/StackWindows.vue'
import SendEmailImpl from './components/SendEmailImpl.vue'
import Success from './components/Success.vue'
import type { Ref } from 'vue'

const stack = [SendEmailImpl, Success]
const stackWindows = ref<any>(null)
const { expose } = useContext()
expose({
  reset: () => {
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