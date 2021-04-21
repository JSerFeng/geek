<template>
  <teleport to="body">
    <div :class="{
      'fy-mask': true,
      'hide': !visible
    }" @click="close"></div>
    <div :class="{ 'fy-modal': true, 'hide': !visible }" :style="{ width, height }">
      <i class="el-icon-close close-icon" @click="close"></i>
      <slot></slot>
      <div class="footer">
        <slot name="footer">Geek&#x2764;勤奋蜂</slot>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
export interface ModalMethods {
  close(): void
  open(): void
}
</script>
<script lang="ts" setup>
import { defineProps, useContext, ref } from 'vue';
const { expose } = useContext()
const props = defineProps<{
  onOpen?: () => any,
  onClose?: () => any,
  width?: string | number,
  height?: string | number
}>()

const visible = ref(false)
const close = () => {
  visible.value = false
  if (typeof props.onClose === 'function') {
    props.onClose()
  }
}
const open = () => {
  visible.value = true
  if (typeof props.onOpen === 'function') {
    props.onOpen()
  }
}

expose({
  close,
  open
})
</script>

<style lang="scss" scoped>
.fy-mask {
  cursor: pointer;
  transition: 0.2s;
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  opacity: 0.9;
}
.fy-mask.hide {
  opacity: 0;
  visibility: hidden;
}
.fy-modal {
  padding: 15px;
  box-sizing: border-box;
  transition: 0.2s;
  z-index: 101;
  border-radius: 15px;
  position: fixed;
  left: 50%;
  top: 50%;
  box-sizing: border-box;
  transform: translate(-50%, -50%);
  box-shadow: 0 10px 20px rgb(233, 233, 233), 0 5px 10px rgb(236, 236, 236);
  background-color: #fff;

  .close-icon {
    position: absolute;
    cursor: pointer;
    right: 15px;
    transition: 0.2s;
    z-index: 101;

    &:hover {
      transform: scale(1.1);
    }
    &:active {
      transform: scale(0.8);
    }
  }

  .footer {
    color: rgb(207, 207, 207);
    font-size: 12px;
    text-align: center;
  }
}
.fy-modal.hide {
  transform: translate(-50%, -50%) scale(0);
  visibility: hidden;
}
</style>