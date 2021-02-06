<template>
  <template v-if="didLogin">
    
  </template>
  <template v-else>
    
  </template>
</template>
<script setup="" lang="ts">
import { onMounted, ref } from 'vue';
import { storage } from '../../../utils/shared';

const didLogin = ref(false)

onMounted(() => {
  if (storage.get("user")) {
    didLogin.value = true
  }
})
</script>
<style lang="scss" scoped>
  
</style>