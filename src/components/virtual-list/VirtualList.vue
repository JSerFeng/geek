<template>
  <div class="virtual-list" >
    <h3 class="new-detail">招生详情</h3>
    <div
      class="container"
      ref="container"
      :style="`height:${container.height}px; padding:0;margin:0;`"
      @scroll="test"
    >
      <ul
        :style="`height:${li.height * items.length}px;padding-top:${
          li.height * pos
        }px`"
      >
        <li
          :style="`height:${li.height}px`"
          v-for="item of showList"
          :key="item.id"
        >
          <SignPerson :info="item" />
        </li>
      </ul>
    </div>
  </div>
</template>
 
<script>
import { defineComponent, onMounted, toRaw } from 'vue';
import SignPerson from '../../views/admin/components/SignPerson.vue'
export default defineComponent({
   props:{
    items:{
      type:Array,
      reqired:true
    }
  },
  components:{
    SignPerson
  },
  data() {
    return {
      li: {
        // 列表项信息
        height: 30,
      },
      container: {
        // 容器信息
        height: 430,
      },
      pos: 1, // 第一排显示的元素的下标
      MAX_NUM: 1, // 在容器内最多显示几个列表项
      timer: null, // 定时器
      carriedOut: true, // 能不能执行操作
    };
  },
  mounted() {
    this.test();
  },
  computed: {
    // 用于渲染在页面上的数组
    showList() {
      // 根据计算出来的 第一排元素的下标,和最多显示多少个 用slice实现截取数组
      let arr = this.items.slice(this.pos, this.pos + this.MAX_NUM);
      return arr;
    },
  },
 
  methods: {
    test() {
      // 节流
      if (this.carriedOut) {
        // 容器跟里面的列表项
        const { container, li } = this;
        // 计算可视区域最多能显示多少个li
        this.MAX_NUM = Math.ceil(container.height / li.height);
        // 获取 overflow:scroll 的元素已滚动的高度
        let scrollTop = this.$refs.container.scrollTop;
        // 计算当前处于第一排的元素的下标
        this.pos = Math.round(scrollTop / li.height);
        // 下方节流操作
        this.carriedOut = false;
        this.timer = setTimeout(() => {
          this.carriedOut = true;
          clearTimeout(this.timer);
        }, 50);
      }
    },
  },
})
</script>
 
<style lang="scss" scoped>
.virtual-list {
  text-align: center;
  h3 {
    height: 0vh;
    text-align: center;
  }
  .container {
    overflow: scroll;
    li{
      line-height: 30px;
      margin-left: -3vh;
    }
  }
  .container::-webkit-scrollbar{
    width: 0  !important;
  }

}
</style>