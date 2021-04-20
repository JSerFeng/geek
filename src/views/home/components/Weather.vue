<template lang="">
  <div class="weather">
    <h3 class="wrap">
      {{ temp }}
      <span class="iconfont icon-sheshidu01"></span>
    </h3>
    <p class="msg">{{ msg }}</p>
  </div>
</template>
<script lang="ts" setup>
import { useWeather } from "../hooks";

const { temp, msg } = useWeather()
</script>
<style lang="scss" scoped>
@import "../../../main.scss";
.weather {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: $g-theme;

  .wrap {
    margin: 0;
    padding: 0;
    color: #fff;
    font-size: 40px;
    text-align: center;
    position: relative;
    z-index: 1;

    .icon-sheshidu01 {
      z-index: 1;
      color: #fff;
      left: 0;
      top: 0;
      color: #fff;
    }
  }
  .msg {
    z-index: 1;
    color: #fff;
    font-size: 12px;
  }
}
</style>