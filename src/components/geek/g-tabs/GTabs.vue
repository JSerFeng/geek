<template>
  <ul class="g-tabs flex">
    <li
      v-for="(item, i) in items"
      @click="change(i, item.v, item.k)"
      :class="{ active: currIdx === i }"
      class="item flex ac jc p"
      :key="item.k"
    >{{ item.k }}</li>
  </ul>
</template>
<script lang="ts" setup>
import { defineEmit, defineProps, watchEffect } from "@vue/runtime-core";
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
const change = (i: number, v: any, k: string) => {
  currIdx.value = i
  emits("change", v, k)
}
watchEffect(() => {
  if (props.items[currIdx.value]) {
    change(currIdx.value, props.items[currIdx.value].v, props.items[currIdx.value].k)
  }
})
</script>
<style lang="scss" scoped>
.g-tabs {
  padding: 0 5%;
  .item {
    padding: 15px;
    box-sizing: border-box;
    border-bottom: 3px solid transparent;
    transition: 0.2s;
    color: rgb(192, 192, 192);
    font-size: 15px;
    &.active {
      color: rgb(92, 92, 92);
      border-bottom: 3px solid rgb(92, 92, 92);
    }
  }
}
</style>