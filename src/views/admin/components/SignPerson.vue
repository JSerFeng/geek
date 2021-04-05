<template>
  <ul class="sign-person-item">
    <li class="avatar item-1"><img :src="personList.image" alt="" /></li>
    <li class="item-2">{{ personList.userId }}</li>
    <li class="item-3">{{ personList.userName }}</li>
    <li class="item-4">{{ personList.major }}</li>
    <li class="item-4">{{ personList.email ? personList.email:'无' }}</li>
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
    const personList = ref<SignPerson[] | []>([]);
    onMounted(() => {
      personList.value = computed(() => props.info.item).value;
      console.log(toRaw(personList.value));
    });
    return {
      personList,
    };
  },
});
</script>

<style lang="scss">
.sign-person-item {
  font-size: 12px;
  display: flex;

  @for $i from 1 through 4 {
    .item-#{$i} {
      width: 50px;
      margin: 3px 0 3px 0;
      margin-left: 25px * $i;
    }
  }
  .avatar {
    width: 20px;
    border-radius: 50%;
    background-color: #f7f7f7;
    border: 1px solid #cecece;
    
  }
  &:hover{
        background-color: #f7f7f7;
    }
}
</style>