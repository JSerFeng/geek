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
    <input ref="dirRef" type="text" placeholder="意愿(编程语言)" />
    <div class="msg">
      <transition name="dir">
        <span v-show="isDirShow">意愿不能为空</span>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  watch,
  defineComponent,
  onMounted,
  toRefs,
} from "vue";
import { useAddEvent } from "./hooks/useAddEvent";
import { useBlueCkeck } from "./hooks/useBlurCheck";
import type { Props } from "./hooks/useBlurCheck";
export default defineComponent({
  props: {
    rowInfo: Object,
  },
  setup(props: any, context) {
    const { rowInfo } = toRefs(props);
    const { idRef, nameRef, pasRef, dirRef } = useAddEvent();
    const {
      isIdShow,
      isPasShow,
      isDirShow,
      isNameShow,
      infoObj,
    } = useBlueCkeck<Props>({ idRef, nameRef, pasRef, dirRef });
    context.expose({
      infoObj,
    });
    const adminId = computed(() => rowInfo.value.adminId);
    const adminName = computed(() => rowInfo.value.adminName);
    const password = computed(() => rowInfo.value.password);
    const courseName = computed(() => rowInfo.value.courseName);
    onMounted(() => {
      if (rowInfo) {
        idRef.value!.value = adminId.value;
        nameRef.value!.value = adminName.value;
        pasRef.value!.value = password.value;
        dirRef.value!.value = courseName.value;
      }
    });
    watch(
      () => rowInfo?.value.adminId,
      () => {
        idRef.value!.value = adminId.value;
        nameRef.value!.value = adminName.value;
        pasRef.value!.value = password.value;
        dirRef.value!.value = courseName.value;
      }
    );
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

@each $i in id, name, pas, dir {
  .#{$i}-enter-active,
  .#{$i}-leave-active {
    transition: opacity 0.5s ease;
  }

  .#{$i}-enter-from,
  .#{$i}-leave-to {
    opacity: 0;
  }
}
</style>