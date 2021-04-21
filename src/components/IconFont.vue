<template>
  <svg class="icon" :class="class" aria-hidden="true">
    <use :xlink:href="id" />
  </svg>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
  id: string,
  class?: string,
}>()
</script>
<style lang="">
  
</style>