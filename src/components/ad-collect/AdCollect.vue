<template>
  <div class="ad-collect">
    <div :class="['content', content, 'iconfont']"></div>
    <div class="ad-collect-title">{{ title }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

/*
    content --> 传入图标的类名
    title --> 下面展示文字的内容
*/

export default defineComponent({
  props: {
    content: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
  },
  setup() {},
});
</script>
<style lang="scss">
.ad-collect {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: white;
  margin: 0 auto;
  text-align: center;
  .content {
    width: 40px;
    height: 40px;
    margin: 0 auto;
    cursor: pointer;
    &:hover{
        color: #CECECE;
    }
  }
  .iconfont {
    font-size: 30px;
    line-height: 50px;
  }
  .ad-collect-title {
    color: #2e1324;
    font-size: 12px;
    transform: scale(0.6);
  }
}
</style>