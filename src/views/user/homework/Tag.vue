<template lang="">
  <span class="tag" :class="type || 'normal'">
    <slot></slot>    
  </span>
</template>
<script lang="ts" setup>
import { defineProps } from "@vue/runtime-core";

const props = defineProps<{
  type?: "warning" | "error" | "success" | "normal"
}>()
</script>
<style lang="scss" scoped>
  .tag{
    border-radius: 100px;
    border: 1px solid transparent;
    padding: .2em .5em;

    &.normal {
      background-color: rgb(213, 235, 255);
      color: rgba(0, 174, 255, 0.644);
      border: 1px solid rgba(101, 206, 255, 0.644);
    }
    &.success {
      background-color: rgb(205, 255, 204);
      color: green;
      border: 1px solid green;

    }
    &.warning {
      background-color: rgb(255, 234, 207);
      color: rgb(255, 145, 0);
      border: 1px solid rgb(255, 145, 0);
    }
    &.error {
      background-color: rgb(255, 219, 219);
      color: red;
      border: 1px solid red;
    }
  }
</style>