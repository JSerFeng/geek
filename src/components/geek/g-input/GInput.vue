<template>
  <div class="g-input">
    <input class="props.class" @input="onInput" ref="input" />
    <span class="placeholder" ref="placeholder">{{ props.placeholder }}</span>
  </div>
</template>
<script lang="ts" setup>

import { ref, onMounted, onUnmounted, defineProps, defineEmit } from "vue"

const props = defineProps<{
  class?: string,
  value?: string,
  placeholder?: string
}>()
const emits = defineEmit(["update:modelValue"])
const onInput = (e: Event) => {
  emits("update:modelValue", (e.target as HTMLInputElement).value)
}

const placeholder = ref<HTMLSpanElement | null>(null)
const input = ref<HTMLInputElement | null>(null)


const blurHandler = () => {
  if (!input.value?.value) {
    placeholder.value?.classList.remove("focus")
  }
}
const inputHandler = () => {
  placeholder.value?.classList.add("focus")
}
const placeholderHandler = () => {
  input.value?.focus()
}
onMounted(() => {
  placeholder.value?.addEventListener("click", placeholderHandler)
  input.value?.addEventListener("focus", inputHandler)
  input.value?.addEventListener("blur", blurHandler)
})
onUnmounted(() => {
  placeholder.value?.removeEventListener("click", placeholderHandler)
  input.value?.removeEventListener("focus", inputHandler)
  input.value?.removeEventListener("blur", blurHandler)
})
</script>
<style lang="scss" scoped>
.g-input {
  display: inline-block;
  position: relative;
  width: 100%;
  height: 1.5em;
  margin: 0.2em 0;

  input {
    position: absolute;
    box-sizing: border-box;
    transition: .2s;
    height: 100%;
    width: 100%;
    padding: 0 10px;
    left: 0;
    top: 0;
    outline: none;
    border: 1px solid rgb(199, 199, 199);

    &:focus{
      border: 1px solid black;
    }
  }

  .placeholder {
    transition: 0.2s;
    overflow: auto;
    position: absolute;
    left: 0;
    top: 50%;
    font-size: 0.9em;
    transform: translate(20px, -50%);
    background-color: #fff;
    color: rgb(85, 85, 85);
    font-weight: 100;

    &.focus {
      transform: translate(10px, -60%) scale(0.9);
      top: 0;
      color: rgb(0, 0, 0) !important;
    }
  }
}
</style>