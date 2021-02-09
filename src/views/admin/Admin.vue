<template>
  <ul>
    <li v-for="(i,key,index) in personList.data" :key = "i">{{key}} {{i}}{{index}}
      <img src="../../assets/imgs/1.jpg" alt="">
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRequestCount } from "./hooks/useRequestCount";
import img from '../../assets/imgs/h5.jpg'
export default defineComponent({
  name: "admin",
  setup() {
    const { res } = useRequestCount();
    const personList = computed(() => res.data)
    return { personList };
  },
});
</script>