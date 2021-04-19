<template>
  <div class="course-introduce">
    <div class="swiper">
      <div @click="handleItemClick(1, $event)" class="item iconfont left">
        &#xe662;
      </div>
      <div @click="handleItemClick(2, $event)" class="item iconfont middle">
        &#xe639;
      </div>
      <div @click="handleItemClick(3, $event)" class="item iconfont right">
        &#xe690;
      </div>
      <div @click="handleItemClick(4, $event)" class="item iconfont behind">
        &#xede7;
      </div>
    </div>
    <div class="introduce" v-if="currentCourse === 1">
      <div class="title">前 端</div>
      <div class="content">
        前端即网站前台部分，运行在PC端，移动端等浏览器上展现给用户浏览的网页。随着互联网技术的发展，HTML5，CSS3，前端框架的应用，跨平台响应式网页设计能够适应各种屏幕分辨率，完美的动效设计，给用户带来极高的用户体验。
      </div>
    </div>
    <div class="introduce" v-if="currentCourse === 2">
      <div class="title">后 端</div>
      <div class="content">
        后端开发即“服务器端”开发，主要涉及软件系统“后端”的东西。比如，用于托管网站和
        App 数据的服务器、放置在后端服务器与浏览器及 App
        之间的中间件，它们都属于后端。简单地说，那些你在屏幕上看不到但又被用来为前端提供支持的东西就是后端。
      </div>
    </div>
    <div class="introduce" v-if="currentCourse === 3">
      <div class="title">Android</div>
      <div class="content">
        android开发是指android平台上应用的制作，Android早期由“Android之父”之称的Andy
        Rubin创办，Google于2005年并购了成立仅22个月的高科技企业Android，展开了短信、手机检索、定位等业务，基于Linux的通用平台进入了开发。
      </div>
    </div>
    <div class="introduce" v-if="currentCourse === 4">
      <div class="title">Python</div>
      <div class="content">
        Python崇尚优美、清晰、简单，是一个优秀并广泛使用的语言。
        Python可以应用于众多领域，如：数据分析、组件集成、网络服务、图像处理、数值计算和科学计算等众多领域。目前业内几乎所有大中型互联网企业都在使用Python，如：Youtube、Dropbox、BT、Quora（中国知乎）、豆瓣、知乎、Google、Yahoo!、Facebook、NASA、百度、腾讯、汽车之家、美团等。
      </div>
    </div>
    <div class="confirm">选好了</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const currentCourse = ref<number>(1);
    function judgeClassList(classList: string[], className: string): boolean {
      let flag = false;
      classList.forEach((name) => {
        if (name === className) {
          flag = true;
        }
      });
      return flag;
    }
    function handleItemClick(index: number, e: any) {
      currentCourse.value = index;
      const items = document.querySelectorAll(
        ".course-introduce .swiper .item"
      );
      const removeClassList: string[] = ["left", "right", "middle", "behind"];
      const left = e.target.previousElementSibling || items[items.length - 1];
      const right = e.target.nextElementSibling || items[0];
      const behind =
        right.nextElementSibling ||
        items[0] ||
        left.previousElementSibling ||
        items[items.length - 1];
      removeClassList.forEach((name: string) => {
        if (judgeClassList(e.target.classList, name)) {
          e.target.classList.remove(name);
        }
      });
      e.target.classList.add("middle");
      removeClassList.forEach((name: string) => {
        if (judgeClassList(left.classList, name)) {
          left.classList.remove(name);
        }
      });
      left.classList.add("left");
      removeClassList.forEach((name: string) => {
        if (judgeClassList(right.classList, name)) {
          right.classList.remove(name);
        }
      });
      right.classList.add("right");
      removeClassList.forEach((name: string) => {
        if (judgeClassList(behind.classList, name)) {
          behind.classList.remove(name);
        }
      });
      behind.classList.add("behind");
    }
    return {
      handleItemClick,
      currentCourse,
    };
  },
});
</script>
<style lang="scss">
.course-introduce {
  position: relative;
  .swiper {
    background-image: radial-gradient(#cecece, black);
    display: flex;
    justify-content: center;
    .item {
      font-size: 25rem;
      position: absolute;
      transition: all 0.5s;
      &:hover {
        text-shadow: 0 0 100px white;
        cursor: pointer;
      }
    }
    .left {
      left: -1vw;
      transform: scale(0.6);
      filter: blur(10px);
    }
    .right {
      left: 70vw;
      transform: scale(0.6);
      filter: blur(10px);
    }
    .middle {
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      z-index: 111;
    }
    .behind {
      left: 50%;
      transform: translateX(-50%) scale(0.2) translateY(-600px);
    }
    width: 100vw;
    height: 100vh;
    background-color: #eef1ef;
  }
  .introduce {
    width: 70vw;
    height: 15vh;
    position: absolute;
    color: #cecece;
    top: 70vh;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    display: flex;
    .title {
      text-align: center;
      line-height: 100px;
      font-size: 40px;
      width: 300px;
      color: #EEF1EF;
      margin-right: 20px;
    }
    .content {
      margin-top: 10px;
      line-height: 30px;
    color: #CECECE;
    }
  }
  .confirm {
    width: 10vw;
    text-align: center;
    line-height: 8vh;
    position: absolute;
    top: 90vh;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    background-color: #8F8F8F;
    border-radius: 40px;
    box-shadow: 0 0 10px white;
    &:hover{
    box-shadow: 0 0 40px white;
    }
  }
}
</style>