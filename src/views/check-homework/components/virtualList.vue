<template>
  <div class="virtual-list">
    <h1>{{ title }}</h1>
    <div
      class="container"
      ref="container"
      :style="`height:${containerHeight}px;width:${boxWidth}vh;`"
      @scroll="test"
    >
      <ul
        :style="`height:${itemHeight * list.length}px;padding-top:${
          itemHeight * pos
        }px`"
      >
        <li
          :style="`height:${itemHeight}px`"
          v-for="item in showList"
          :key="item.id"
        >
          <slot :item="item"></slot>
        </li>
      </ul>
    </div>
  </div>
</template>
 
/*
使用方法：传入要展示的数组 showList
         要展示的数量 size
         要展示容器整个高度 containerHeight
         虚拟列表的标题 title
         每个列表的高度 itemHeight
         整个容器的宽度 containerWidth
*/

<script lang='ts'>
import { computed, defineComponent, onMounted, ref, ComputedRef } from "vue";
import { Homework, File } from "../CheckHomework.vue";

export default defineComponent({
  props: {
    list: {
      type: Array,
      require: true,
    },
    size: {
      type: Number,
      require: true,
    },
    containerHeight: {
      type: Number,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    itemHeight: {
      type: Number,
      require: true,
    },
    containerWidth: {
      type: Number,
    },
    fontSize: {
      type: Number,
    },
  },
  setup(props) {
    // 第一个位置的索引
    const pos = ref<number>(1);
    let timer: null | number = null;
    let carriedOut = true;
    const showList = computed(() => {
      return props.list?.slice(pos.value, pos.value + props.size!);
    }) as ComputedRef<Homework<File>[]>;
    const boxWidth = ref<number>(130);

    onMounted(() => {
      boxWidth.value = props.containerWidth ? props.containerWidth : 130;
      test();
    });
    const container = ref<null | HTMLDivElement>(null);
    function test() {
      // 节流
      if (carriedOut) {
        // 获取 overflow:scroll 的元素已滚动的高度
        let scrollTop = container.value!.scrollTop;
        // 计算当前处于第一排的元素的下标
        pos.value = Math.round(scrollTop / props.itemHeight!);
        // 下方节流操作
        carriedOut = false;
        timer = setTimeout(() => {
          carriedOut = true;
          clearTimeout(timer as number);
        }, 50);
      }
    }
    return {
      showList,
      container,
      test,
      pos,
      boxWidth,
    };
  },
});
</script>
 
<style lang="scss" scoped>
.virtual-list {
  text-align: center;
  .container::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  .options {
    display: flex;
    font-size: 18px;
    font-weight: 600;
    line-height: 20px;
  }
  @media screen and (max-width: 799px) and (min-width: 200px) {
    .container {
      overflow: scroll;
      width: 70%;
      font-size: 14px !important;
      margin: 0 auto;
      font-size: 12px !important;
      border-radius: 30px;
      border: 1px solid #cecece;
      box-shadow: -1px -1px 3px #ffffff,
        1.5px 1.5px 3px rgba(174, 174, 192, 0.4);
    }
  }
  @media screen and (min-width: 800px) {
    .container {
      overflow: scroll;
      margin: 0 auto;
      font-size: 12px;
      border-radius: 30px;
      border: 1px solid #cecece;
      box-shadow: -1px -1px 3px #ffffff,
        1.5px 1.5px 3px rgba(174, 174, 192, 0.4);
    }
  }
}
</style>

