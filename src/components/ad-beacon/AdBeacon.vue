<template>
  <div :class="boxStyle === 'right' ? 'beacon-right' : 'beacon-left'">
    作 业 &nbsp;>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRaw } from "vue";
interface Props{
    boxStyle: 'right' | 'left'
}
export default defineComponent({
  props: {
    boxStyle: {
      type: String,
      require: true,
    },
  },
  setup(props) {
    console.log(toRaw(props));
  },
});
</script>
<style lang="scss">
@mixin common {
  width: 27vh;
  border: 1px solid black;
  height: 14vh;
  position: absolute;
  left: 176vh;
  top: 5vh;
  z-index: 999;
  border-radius: 7vh 0 0 7vh;
  border: 20px solid #eef1ef;
  box-sizing: border-box;
  text-align: center;
  line-height: 9vh;
  font-size: 20px;
  transition: all 0.4s;
  background-color: #cecece;
  color: black;
  &:hover {
    transform: scale(1.1);
  }
}
.beacon-right {
  @include common;
  left: 176vh;
  top: 5vh;
}
@media screen and(max-width: 800px) {
  .beacon-right {
    @include common;
    left: 55vh;
    top: 3vh;
  }
}

</style>