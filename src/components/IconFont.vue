<template lang="">
  <svg class="icon" :class="class" aria-hidden="true">
    <use :xlink:href="id"></use>
  </svg>
</template>
<script lang="ts" setup>
import { defineProps } from "@vue/runtime-core";

const props = defineProps<{
  id: string,
  class?: string,
}>()
</script>
<style lang="">
  
</style>