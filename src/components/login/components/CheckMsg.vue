<template>
  <div class="check-msg">
    <i class="el-icon-loading" v-show="isPending"></i>
    <i class="el-icon-circle-check" v-show="isSuccess"></i>
    <span v-show="isFail">{{ msg }}</span>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { Flags } from '../../../utils/shared'

const props = defineProps<{ msg: string, flag: Flags }>()
const isSuccess = computed(() => props.flag === Flags.Success)
const isPending = computed(() => props.flag === Flags.Pending)
const isFail = computed(() => props.flag === Flags.Fail)
</script>

<style lang="scss" scoped>
.check-msg {
  span {
    font-size: 12px;
  }
}
</style>