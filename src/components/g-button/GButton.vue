<template>
  <button
    @click.native="handler"
    class="g-button"
    :class="[props.type, props.class, { disabled: props.disabled }, { loading: props.loading }]"
  >
    <i v-show="props.loading" class="loading el-icon-loading"></i>
    <slot></slot>
  </button>
</template>
<script lang="ts" setup>
import { defineProps, defineEmit } from 'vue'
const props = defineProps<{
  class?: string,
  type?: "broke" | "normal" | "warn" | "reverse"
  disabled?: boolean,
  loading?: boolean
}>()
const emits = defineEmit(["click"])
const handler = (e: Event) => {
  if (!props.disabled) {
    emits("click", e)
  }
}
</script>
<style lang="scss" scoped>
.g-button {
  --theme-color: rgb(36, 36, 36);
  padding: 0.3em 1em;
  color: #fff;
  background-color: var(--theme-color);
  cursor: pointer;
  outline: none;
  border: none;
  position: relative;
  border: 1px solid rgb(36, 36, 36);

  &:hover {
    filter: brightness(1.2);
  }

  &:active {
    transform: scale(0.98);
  }
}

.g-button.warn {
  background-color: rgb(255, 139, 139);
  color: rgb(155, 0, 0);
}
.g-button.disabled {
  background-color: rgb(235, 235, 235) !important;
  color: gray !important;
  cursor: not-allowed !important;
  border: 1px solid rgb(235, 235, 235) !important;

  &:hover {
    filter: brightness(1);
  }
  &:active {
    transform: scale(1) !important;
  }
}
.g-button.reverse {
  color: black;
  background-color: #fff;
  border: 1px solid black;
}
.g-button.broke {
  &:after {
    --slice-0: inset(0 0 0 0);
    --slice-1: inset(80% 0 0 0);
    --slice-2: inset(60% 0 20% 0);
    --slice-3: inset(40% 0 40% 0);
    --slice-4: inset(20% 0 60% 0);
    --slice-5: inset(0% 0 80% 0);
    content: "Geek";
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    clip-path: var(--slice-0);
    background-color: var(--theme-color);
    opacity: 0;
    font-size: 2em;
  }

  &:hover::after {
    animation: glitch 1.5s infinite;
    animation-timing-function: steps(2, end);
  }
}
.g-button.loading {
  filter: brightness(0.9) !important;
}

@keyframes glitch {
  0% {
    opacity: 1;
    clip-path: var(--slice-1);
    transform: translate(-15px, 0);
  }
  5% {
    clip-path: var(--slice-1);
    transform: translate(15px, -10%);
  }
  10% {
    clip-path: var(--slice-1);
    transform: translate(-20px, -25%);
  }
  15% {
    clip-path: var(--slice-2);
    transform: translate(30px, 0);
  }
  20% {
    clip-path: var(--slice-3);
    transform: translate(-15px, -5%);
  }
  25% {
    clip-path: var(--slice-4);
    transform: translate(5px, -5%);
  }
  30% {
    clip-path: var(--slice-5);
    transform: translate(-35px, 15%);
  }
  35% {
    clip-path: var(--slice-5);
    transform: translate(15px, -15%);
  }
  36% {
    clip-path: var(--slice-0);
    transform: translate(0);
    opacity: 0;
  }
  100% {
    clip-path: var(--slice-0);
    transform: translate(0);
    opacity: 0;
  }
}
</style>