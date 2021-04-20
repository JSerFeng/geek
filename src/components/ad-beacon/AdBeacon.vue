<template>
  <div :style="top ? `top:${top}vh;` : 'top:5vh;'" :class="boxStyle === 'right' ? 'beacon-right' : 'beacon-left'">
    {{ title }}
  </div>
</template>
<script lang="ts">
import { defineComponent, toRaw } from "vue";
interface Props {
  boxStyle: "right" | "left";
}
export default defineComponent({
  props: {
    boxStyle: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      reqire: true,
    },
    top: {
      type: Number,
    },
  },
});
</script>
<style lang="scss">
@mixin common {
  width: 10%;
  border: 1px solid black;
  height: 14vh;
  position: absolute;
  top: 5vh;
  z-index: 999;
  border: 20px solid #eef1ef;
  box-sizing: border-box;
  text-align: center;
  line-height: 9vh;
  font-size: 1vw;
  transition: all 0.4s;
  background-color: #cecece;
  color: black;
  &:hover {
    transform: scale(1.1);
    color: white;
  }
}
.beacon-right {
  @include common;
  left: 90%;
  border-radius: 7vh 0 0 7vh;
}
@media screen and(max-width: 800px) {
  .beacon-right {
    @include common;
    left: 87%;
    top: 3vh;
    border-radius: 7vh 0 0 7vh;
    overflow: hidden;
  }
}

.beacon-left {
  @include common;
  left: 0vh;
  top: 5vh;
  border-radius: 0vh 7vh 7vh 0vh;
  overflow: hidden;
}
</style>