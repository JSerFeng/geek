<template>
  <div class="ad-form">
    <input ref="idRef" type="text" placeholder="管理员ID" />
    <div class="msg">
      <transition name="id">
        <span v-show="isIdShow">ID为5~30位数字</span>
      </transition>
    </div>
    <input ref="nameRef" type="text" placeholder="姓名" />
    <div class="msg">
      <transition name="name">
        <span v-show="isNameShow">姓名不能为空</span>
      </transition>
    </div>
    <input ref="pasRef" type="password" placeholder="密码" />
    <div class="msg">
      <transition name="pas">
        <span v-show="isPasShow">密码为3~30为字符</span>
      </transition>
    </div>
    <input ref="dirRef" type="text" placeholder="方向" />
    <div class="msg">
      <transition name="dir">
        <span v-show="isDirShow">方向不能为空</span>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAddEvent } from "./hooks/useAddEvent";
import { useBlueCkeck } from "./hooks/useBlueCheck";
import type { Props } from './hooks/useBlueCheck'
export default defineComponent({
  setup() {
    const { idRef, nameRef, pasRef, dirRef } = useAddEvent();
    const { isIdShow, isPasShow, isDirShow, isNameShow } = useBlueCkeck<Props>({idRef,nameRef,pasRef,dirRef});
    return {
      idRef,
      nameRef,
      pasRef,
      dirRef,
      isIdShow,
      isNameShow,
      isPasShow,
      isDirShow,
    };
  },
});
</script>
<style lang="scss" scoped>
.ad-form {
  input {
    width: 70%;
    height: 20px;
    outline: none;
    border-radius: 12px;
    padding-left: 10px;
    border: 1px solid black;
    transition: all 0.3s;
  }
  .msg {
    display: block;
    height: 18px;
    font-size: 12px;
    transform: scale(0.7);
    color: #5f6368;
  }
}
.scale {
  transform: scale(1.1);
}

@each $i in id, name, pas, dir{
  .#{$i}-enter-active,
  .#{$i}-leave-active{
    transition: opacity 0.5s ease;
  }

  .#{$i}-enter-from,
  .#{$i}-leave-to{
    opacity: 0;
  }
}
</style>