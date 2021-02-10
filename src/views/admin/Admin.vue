<template>
  <ul class="person-count">
    <li class="font">
      <img src="../../assets/imgs/1.jpg" alt="" />
      <h4>前端</h4>
      <div class="sign-person-count">
        <span class="title">报名人数&nbsp;</span
        ><span> 12 </span>
      </div>
    </li>
    <li class="end">
      <img src="../../assets/imgs/2.jpg" alt="" />
      <h4>后端</h4>
      <div class="sign-person-count">
        <span class="title">报名人数&nbsp;</span
        ><span> 23 </span>
      </div>
    </li>
    <li class="python">
      <img src="../../assets/imgs/5.jpg" alt="" />
      <h4>Python</h4>
      <div class="sign-person-count">
        <span class="title">报名人数&nbsp;</span
        ><span> 42 </span>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRaw } from "vue";
import { useRequestCount } from "./hooks/useRequestCount";

export default defineComponent({
  name: "admin",
  setup() {
    let courseList = reactive({request:{}})
    onMounted(async() =>{
      const { res } = await useRequestCount();
      courseList.request = res
    })
    return { courseList };
  },
});
</script>

<style lang="scss" scoped>
* {
  list-style: none;
  padding: 0;
  margin: 0;
}
.person-count {
  display: flex;
  .font,
  .end,
  .python {
    background-color: #eef1ef;
    width: 150px;
    height: 400px;
    overflow: hidden;
    margin: 10vh 23vh;
    @media screen and (max-width: 500px) {
      margin: 30px;
    }
    transition: all 0.5s;
    border-radius: 75px;
    &:hover {
      transform: scale(1.2);
    }
    h4 {
      text-align: center;
      width: 100px;
      border-bottom: 1px solid #b0b3b0;
      padding-bottom: 10px;
      margin: 0 auto;
    }
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin: 10px auto;
      display: block;
    }
    .sign-person-count {
      .title {
        display: block;
        margin: 10px auto;
        width: 15px;
        word-wrap: break-word;
      }
      span {
        width: 15px;
        display: block;
        margin: 0 auto;
      }
    }
  }
}
@each $i in font, end, python {
  @if $i == font {
    .#{$i} {
      animation: scale 1s 0s backwards;
    }
  }
  @if $i == end {
    .#{$i} {
      animation: scale 1s 0.5s backwards;
    }
  }
  @if $i == python {
    .#{$i} {
      animation: scale 1s 1s backwards;
    }
  }
}
@keyframes scale {
  from {
    height: 0;
    display: none;
  }
  to {
    height: 400px;
    display: block;
  }
}
</style>