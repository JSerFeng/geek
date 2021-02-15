<template>
  <i class="_i el-icon-refresh-right"></i>
</template>
<style lang="scss" setup>
._i {
  animation: spin 0.5s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>