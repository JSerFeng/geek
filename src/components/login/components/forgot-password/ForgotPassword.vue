<template lang="">
  <Modal ref="modalCtx" width="80%" height="80%">
    <StackWindow :stack="stack" ref="stackCtx" />
  </Modal>
</template>
<script lang="ts" setup>
import { provide, ref, useContext } from 'vue'
import Modal from '../../../modal/Modal.vue'
import type { ModalMethods } from '../../../modal/Modal.vue'
import StackWindow from '../../../stackWindows/StackWindows.vue'
import Success from '../../../Success.vue'
import type { Expose } from '../../../stackWindows/StackWindows.vue'
import SendPasswordCode from './SendPasswordCode.vue'
import InputId from './InputId.vue'

const stack = [InputId, SendPasswordCode, Success]

const stackCtx = ref<Expose | null>()
const modalCtx = ref<ModalMethods>()

const openModal = () => {
  modalCtx.value?.open()
}
const closeModal = () => {
  modalCtx.value?.close()
}

/* 第一个页面输入的邮箱 */
const email = ref("")
provide("email", email)
/* 第一个页面输入的邮箱 */
const userId = ref("")
provide("userId", userId)
/* 第一个页面输入的密码 */
const newPassword = ref("")
provide("newPassword", newPassword)
/* 第一个页面输入的确认密码 */
const confirmPassword = ref("")
provide("confirmPassword", confirmPassword)

provide("close", () => {
  stackCtx.value?.reset()
  modalCtx.value?.close()
})
const { expose } = useContext()
expose({
  open: openModal,
  close: closeModal
})
</script>
<script lang="ts">
export interface ExposeMethods {
  open(): void,
  close(): void
}
</script>
<style lang="scss">
</style>