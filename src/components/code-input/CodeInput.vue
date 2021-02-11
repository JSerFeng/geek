<template>
  <div class="code-input">
    <input class="item" :maxlength="1" :ref="el => { if (!inputs.includes(el)) inputs.push(el) }" />
    <input class="item" :maxlength="1" :ref="el => { if (!inputs.includes(el)) inputs.push(el) }" />
    <input class="item" :maxlength="1" :ref="el => { if (!inputs.includes(el)) inputs.push(el) }" />
    <input class="item" :maxlength="1" :ref="el => { if (!inputs.includes(el)) inputs.push(el) }" />
    <input class="item" :maxlength="1" :ref="el => { if (!inputs.includes(el)) inputs.push(el) }" />
    <input class="item" :maxlength="1" :ref="el => { if (!inputs.includes(el)) inputs.push(el) }" />
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, computed, onMounted, defineEmit } from 'vue'
import { repeatMap } from '../../utils/shared'

const props = defineProps<{
  modelValue?: string,
}>()

const emits = defineEmit(["update:modelValue"])

const inputs: HTMLInputElement[] = []
onMounted(() => {
  inputs.forEach((tag, i) => {
    tag.oninput = () => {
      if (!/[1-9]/.test(tag.value)) {
        tag.value = ""
      }
    }
    tag.onkeydown = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        if (!tag.value && i > 0) {
          inputs[i - 1].focus()
        }
      } else {
        if (tag.value && i < inputs.length - 1) {
          inputs[i + 1].focus()
        }
      }
    }
    tag.onfocus = () => {
      if (!tag.value && i >= 1 && !inputs[i - 1]?.value) {
        inputs[i - 1].focus()
      }
    }
    tag.oninput = () => {
      emits("update:modelValue", inputs.reduceRight((acc, val) => val.value + acc, ""))
    }
  })
})

const val = ref("")

</script>
<style lang="scss" scopde>
.code-input {
  position: relative;
  display: flex;
  width: fit-content;
  .item {
    display: block;
    width: 50px;
    height: 50px;
    margin: 5px;
    font-size: 46px;
    background-color: rgb(243, 243, 243);
    border: none;
    outline: none;
    text-align: center;
  }
}
</style>