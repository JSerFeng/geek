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
  "前端": "#icon-html",
  "后端JAVA": "#icon-java",
  "后端PYTHON": "#icon-python",
  "安卓": "#icon-anzhuo",
  "产品": "#icon-biaoqiankuozhan_chanpin-192",
  "设计": "#icon-iconhuizong_huaban1fuben14"
}
</script>
<style lang="scss" scoped>
  
</style>