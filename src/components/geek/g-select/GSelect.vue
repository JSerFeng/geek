<template lang="">
  <div class="select">
    <div class="show-curr" @click="openOrClose">
      {{ curr || placeholder || "选择" }}
      <i class="el-icon-caret-bottom"></i>
    </div>
    <ul :class="{ 'show': show }" class="list">
      <li v-for="(item, idx) in items" @click="change(idx)">{{ item.k }}</li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineEmit, defineProps } from "@vue/runtime-core";
import { ref } from 'vue'

const props = defineProps<{
  items: { k: string, v: any }[],
  placeholder?: string
}>()
const currIdx = ref(0)
const curr = computed(() => props.items[currIdx.value]?.k)
const show = ref(false)
const emits = defineEmit(['change'])

const openOrClose = () => {
  show.value = !show.value
}

const change = (idx: number) => {
  emits("change", props.items[idx]?.v)
  currIdx.value = idx
  openOrClose()
}
</script>
<style lang="scss" scoped>
.select {
  position: relative;
  cursor: pointer;
  border-radius: 10%;
  .show-curr {
    padding: 5px;
    transition: 0.2s;
    border: 1px solid grey;
    color: grey;
    background-color: #fff;
    &::hover {
      filter: brightness(0.9);
    }
  }

  > .list {
    position: absolute;
    overflow: hidden;
    transition: 0.2s;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    background-color: #fff;
    box-shadow: 0 0 50px rgb(204, 204, 204);

    &.show {
      height: fit-content;
    }

    li {
      padding: 5px;
      cursor: pointer;
      &:hover {
        background-color: rgb(87, 86, 86);
        color: #fff;
      }
    }
  }
}
</style>