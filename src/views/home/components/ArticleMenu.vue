<template lang="">
  <router-link to="/articleList">
    <div class="wrap bg-bottom">
      <div class="font-wrap">
        <div class="bg"></div>
        <div class="font-main">文章</div>
        <div class="font-vice">好文章分享</div>
      </div>
    </div>
  </router-link>
</template>
<script lang="ts" setup>
</script>
<style lang="scss" scoped="">
@import "../../../main.scss";
.wrap {
  width: 100%;
  height: 100%;
  background-color: rgb(193,203,215);
  overflow: hidden;
  position: relative;
  .font-main {
    color: $g-theme;
  }
}
.bg-bottom {
  &::before {
    background-color: rgb(134, 150, 166);
  }
}
</style>