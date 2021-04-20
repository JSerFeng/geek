<template>
  <GButton @click="query" :loading="loading" :type="props.type">
    <slot></slot>
  </GButton>
</template>
<script lang="ts" setup>
import GButton from "../g-button/GButton.vue"
import {ref, defineProps} from "vue"

const loading = ref(false)

const props = defineProps<{
  request: () => Promise<any>
  type?: "reverse" | "broke" | "normal" | "warn"
}>()

const query = async () => {
  loading.value = true
  await props.request()
  loading.value = false
}
</script>
<style lang="scss">
  
</style>