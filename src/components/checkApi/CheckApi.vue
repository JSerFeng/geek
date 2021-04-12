<template lang="">
  <span class="msg">
    <span v-if="status === Flags.Success">
    </span>
    <span v-else-if="status === Flags.Pending">
      <g-loading-icon />
    </span>
    <span v-else>
      {{ errMsg }}
    </span>
  </span>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import { Flags } from "../../utils/shared";
import { GLoadingIcon } from '../geek'

const props = defineProps<{
  status: Flags,
  errMsg: string
}>()
</script>
<style lang="scss" scoped>
  .msg {
    font-size: 14px;
  }
</style>