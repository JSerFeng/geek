<template>
  <!--选择方向logo-->
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="logoMap[courseName]" />
  </svg>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
  courseName: string
}>()

const logoMap: { [k: string]: string } = {
  "前端": "#icon-js",
  "后端JAVA": "#icon-java",
  "后端PYTHON": "#icon-python",
  "安卓": "#icon-anzhuo",
}
</script>
<style lang="scss" scoped>
  
</style>