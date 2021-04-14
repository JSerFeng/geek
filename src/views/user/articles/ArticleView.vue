<template lang="">
  <div class="view-main">
    <Article />
    <Big :id="1" :courseId="2"/>
  </div>
</template>
<script lang="ts" setup>
import Article from '../../../components/articles/Articles.vue'
import  Big from '../../../components/bigFileUploader/BigFileUploader.vue'
</script>
<style lang="scss" scoped>
</style>