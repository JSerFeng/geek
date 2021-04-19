<template lang="">
  <div class="select">
    <el-select  
    class="out-look"
    v-model="selected"
    :value="selected || placeholder || '选择'"
    >
      <el-option
      class="item shade"
      v-for="(item) in items"
      :label="item.k"
      :value="item.v"
      >
      {{ item.k }}
      </el-option>
    </el-select>
  </div>
</template>
<script lang="ts" setup>
import { defineEmit, defineProps, watch } from "@vue/runtime-core";
import { ref } from 'vue'
import { ElSelect, ElOption } from 'element-plus'

const props = defineProps<{
  items: { k: string, v: any }[],
  placeholder?: string
}>()
const emits = defineEmit(['change'])

const selected = ref(props.items[0].v)
watch(selected, val => {
  emits("change", val)
})

</script>
<style lang="scss" scoped>
.select {
  position: relative;
  cursor: pointer;
  border-radius: 10%;

  .out-look {
    padding: 0.2em;
    display: block;
    width: 100%;
    position: relative;
    cursor: pointer;
    color: #fff;

    .item {
      display: block;
      padding: 0.2em;
      background-color: #fff;
    }
  }
}
</style>