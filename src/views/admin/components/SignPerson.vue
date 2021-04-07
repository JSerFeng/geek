<template>
  <ul class="sign-person-item">
    <li class="avatar item-1"><img :src="info.image" alt="" /></li>
    <li class="item-2">{{ info.userId }}</li>
    <li class="item-3">{{ info.userName }}</li>
    <li class="item-4">{{ info.major }}</li>
    <li class="item-5">{{ info.email ? info.email:'无' }}</li>
  </ul>
</template>
<script lang = 'ts'>
import { computed, defineComponent, onMounted, Prop, ref, toRaw } from "vue";
interface SignPerson {
  userId: string;
  userName: string;
  mail: string;
  major: string;
  image: null | string;
  grade: null | string;
}

export default defineComponent({
  props: ["info"],
  setup(props) {
    const personInfo = ref<SignPerson>();
    onMounted(() => {
      personInfo.value = computed(() => props.info).value;
    });
    return {
      personInfo
    };
  },
});
</script>

<style lang="scss">

.sign-person-item {
  font-size: 12px;
  display: flex;
  @for $i from 1 through 5 {
    .item-#{$i} {
      width: 50px;
      margin: 3px 0 3px -50px;
      margin-left: 20px * $i;
    }
  }
  .avatar {
    width: 20px;
    height: 20px;
    margin-top: 8px;
    border-radius: 50%;
    background-color: #f7f7f7;
    border: 1px solid #cecece;
  }
  &:hover{
        background-color: #f7f7f7;
    }
}
</style>