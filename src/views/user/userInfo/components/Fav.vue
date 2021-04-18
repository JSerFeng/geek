<template lang="">
  <div class="view-main">
    <ArticlesVue :my-favorites="true" />
  </div>
</template>
<script lang="ts" setup>
import ArticlesVue from "../../../../components/articles/Articles.vue";


</script>
<style lang="scss" scoped="">
  .view-main {
    overflow: hidden;
    padding: 0;
  }
</style>