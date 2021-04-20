<template lang="">
  <ul class="g-tabs flex">
    <li 
    v-for="(item, i) in items" 
    @click="change(i, item.v)" 
    :class="{ active: currIdx === i }"
    class="item flex ac jc p"
    :key="item.k"
    >
      {{ item.k }}
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { defineEmit, defineProps } from "@vue/runtime-core";
import { ref } from 'vue'

const props = defineProps<{
  items: { k: string, v: any }[],
  defaultValue?: any
}>()

const emits = defineEmit(["change"])

let idx: number
const currIdx = ref(
  props.defaultValue
    ? (idx = props.items.findIndex(item => item.v === props.defaultValue)) === -1
      ? idx
      : 0
    : 0
)
const change = (i: number, v: any) => {
  currIdx.value = i
  emits("change", v)
}
change(currIdx.value, props.items[currIdx.value].v)
</script>
<style lang="scss" scoped>
.item {
  padding: 5px 15px;
  border-bottom: 3px solid transparent;
  transition: 0.2s;
  color: rgb(92, 92, 92);
  &.active {
    color: rgb(92, 92, 92);
    border-bottom: 3px solid rgb(92, 92, 92);
  }
}
</style>