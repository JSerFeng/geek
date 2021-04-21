<template>
  <div>
    <AnnounceVue />
    <el-divider></el-divider>
    <QueryAnnounceVue />
  </div>
</template>
<script lang="ts" setup>
import AnnounceVue from "../../components/announce/Announce.vue";
import QueryAnnounceVue from "../../components/announce/QueryAnnounce.vue";
import {ElDivider} from 'element-plus'
</script>
<style lang="scss" scoped>
  
</style>