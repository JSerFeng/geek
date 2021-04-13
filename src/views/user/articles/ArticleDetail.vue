<template lang="">
  <div>
    详情
    <BigFileUploaderVue :id="1" :courseId="3" />
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import BigFileUploaderVue from "../../../components/bigFileUploader/BigFileUploader.vue";


const route = useRoute()
const id = route.query.id
const articleType = route.query.articleType


console.log();
</script>
<style lang="scss" scoped>
  
</style>