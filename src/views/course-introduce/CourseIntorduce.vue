<template>
  <div class="course-introduce">
    <div
      class="swiper"
      ref="swiper"
      :style="{
        backgroundImage: color,
      }"
    >
      <div
        data="#027592"
        style="color: #027592"
        @click="handleItemClick(2, $event)"
        class="item iconfont left"
      >
        &#xe639;
      </div>
      <div
        data="#E95521"
        style="color: #e95521"
        @click="handleItemClick(1, $event)"
        class="item iconfont middle"
      >
        &#xe65a;
      </div>
      <div
        data="#7BC258"
        style="color: #7bc258"
        @click="handleItemClick(3, $event)"
        class="item iconfont right"
      >
        &#xe640;
      </div>
      <div
        data="#FEDA49"
        @click="handleItemClick(4, $event)"
        class="item iconfont behind-left"
        style="color: #feda49"
      >
        &#xe690;
      </div>
      <div
        data="pink"
        style="color: pink"
        @click="handleItemClick(5, $event)"
        class="item iconfont behind"
      >
        &#xe60c;
      </div>
      <div
        style="color: #adb8d0"
        data="#ADB8D0"
        @click="handleItemClick(6, $event)"
        class="item iconfont behind-right"
      >
        &#xeb3a;
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
    <div class="introduce" v-if="currentCourse === 5">
      <div class="title">设计</div>
      <div class="content">
        主要负责极客&勤奋峰所有产品的视觉风格和界面设计; 各活动专题和海报设计:
        参与设计体验、流程的制定和规范;
        关注和提升产品易用性与开发团队紧密配合协助达成开发
        产品目标;分享设计经验、实施培养方案，推动提高设计 的团队能力。
      </div>
    </div>
    <div class="introduce" v-if="currentCourse === 6">
      <div class="title">运营</div>
      <div class="content">
        运营就是对运营过程的计划、组织、实施和控制，是与产品生产和服务创造密切相关的各项管理工作的总称。从另一个角度来讲，运营管理也可以指为对生产和提供公司主要的产品和服务的系统进行设计、运行、评价和改进的管理工作。
      </div>
    </div>
    <div @click="handleConfirm" class="confirm">选好了</div>
    <router-link to="home"><div class="wait">再看看</div></router-link>
  </div>
</template>
<script lang="ts">
import { computed, customRef, defineComponent, onMounted, ref } from "vue";
import { storage } from "../../utils/shared";
import { chooseCourse } from "../../api/user";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const Router = useRouter();
    const currentCourse = ref<number>(1);
    const userId = storage.get("userId");
    function judgeClassList(classList: string[], className: string): boolean {
      let flag = false;
      classList.forEach((name) => {
        if (name === className) {
          flag = true;
        }
      });
      return flag;
    }

    async function handleConfirm() {
      const result = await chooseCourse(userId, currentCourse.value);
      if (result.error_code === 200) {
        Router.replace("/home");
      }
    }

    /*具体操作每个方向的图标*/
    const swiper = ref<null | HTMLMediaElement>(null);
    const color = ref<string | null>("radial-gradient(#cecece, #e95521)");
    function handleItemClick(index: number, e: any) {
      color.value = `radial-gradient(#cecece, ${e.target.getAttribute(
        "data"
      )})`;
      // swiper!.style.backgroundImage = color.value
      console.log(color);
      currentCourse.value = index;

      const removeClassList: string[] = [
        "left",
        "right",
        "middle",
        "behind",
        "behind-right",
        "behind-left",
      ];

      /*得到要操作的对象*/
      const target = e.target as HTMLDivElement;
      const toggle = document.querySelector(
        ".course-introduce .middle"
      ) as HTMLDivElement;
      const classList = e.target.classList.value.split(" ");

      /*操作样式*/
      removeClassList.forEach((name: string) => {
        if (judgeClassList(e.target.classList, name)) {
          e.target!.classList.remove(name);
        }
      });
      target.classList.add("middle");
      removeClassList.forEach((name: string) => {
        //@ts-ignore
        if (judgeClassList(toggle.classList, name)) {
          toggle.classList.remove(name);
        }
      });
      classList.forEach((className: string) => {
        toggle.classList.add(className);
      });
    }

    return {
      handleItemClick,
      currentCourse,
      handleConfirm,
      swiper,
      color,
    };
  },
});
</script>
<style lang="scss">
.course-introduce {
  position: relative;
  .swiper {
    // background-image: radial-gradient(#cecece, #e95521);
    display: flex;
    justify-content: center;
    .item {
      @media screen and (min-width: 800px) {
        font-size: 20rem;
      }
      @media screen and (max-width: 799px) {
        font-size: 40vw;
      }
      position: absolute;
      transition: all 0.5s;
      &:hover {
        text-shadow: 0 0 100px white;
        cursor: pointer;
      }
    }
    .left {
      @media screen and (max-width: 799px) {
        left: -6vw;
        top: 17vh;
      }
      @media screen and (min-width: 800px) {
        left: 10vw;
      }
      transform: scale(0.6);
    }
    .right {
      @media screen and (max-width: 799px) {
        left: 65vw;
        top: 17vh;
      }
      @media screen and (min-width: 800px) {
        left: 70vw;
      }
      transform: scale(0.6);
    }
    .middle {
      @media screen and (max-width: 799px) {
        top: 17vh;
      }
      @media screen and (min-width: 800px) {
        left: 50vw;
      }
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      z-index: 111;
    }
    .behind {
      @media screen and (max-width: 799px) {
        top: 17vh;
      }
      @media screen and (min-width: 800px) {
        left: 50vw;
      }
      left: 50%;
      transform: translateX(-50%) scale(0.2) translateY(-600px);
    }
    .behind-left {
      @media screen and (max-width: 799px) {
        top: 17vh;
      }
      @media screen and (min-width: 800px) {
        left: 37vw;
      }
      left: 40%;
      transform: translateX(-50%) scale(0.4) translateY(-190px);
    }
    .behind-right {
      @media screen and (max-width: 799px) {
        top: 17vh;
      }
      @media screen and (min-width: 800px) {
        left: 64vw;
      }
      left: 60%;
      transform: translateX(-50%) scale(0.4) translateY(-190px);
    }
    width: 100vw;
    height: 100vh;
    background-color: #eef1ef;
  }
  .introduce {
    width: 70vw;
    height: 15vh;
    position: absolute;
    color: black;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    @media screen and (min-width: 800px) {
      top: 70vh;
      display: flex;
    }
    @media screen and (max-width: 799px) {
      top: 55vh;
      display: block;
    }
    .title {
      text-align: center;
      line-height: 100px;
      @media screen and (min-width: 800px) {
        font-size: 40px;
        margin-right: 20px;
        width: 300px;
      }
      @media screen and (max-width: 799px) {
        font-size: 20px;
      }
      color: black;
    }
    .content {
      color: black;
      @media screen and (min-width: 800px) {
        font-size: 20px;
        margin-top: 10px;
        line-height: 30px;
      }
      @media screen and (max-width: 799px) {
        font-size: 12px;
        margin-top: -30px;
      }
    }
  }
  .confirm {
    @media screen and (min-width: 800px) {
      width: 10vw;
      top: 90vh;
      left: 35%;
      border-radius: 40px;
      line-height: 8vh;
    }
    @media screen and (max-width: 799px) {
      width: 20vw;
      top: 80vh;
      left: 25%;
      font-size: 12px;
      border-radius: 5vw;
      line-height: 5vh;
    }
    text-align: center;

    position: absolute;
    cursor: pointer;
    background-color: white;
    box-shadow: 0 0 10px white;
    &:hover {
      box-shadow: 0 0 40px white;
    }
  }
  .wait {
    @media screen and (min-width: 800px) {
      width: 10vw;
      top: 90vh;
      left: 57%;
      border-radius: 40px;
      line-height: 8vh;
    }
    @media screen and (max-width: 799px) {
      width: 20vw;
      top: 80vh;
      left: 55%;
      font-size: 12px;
      border-radius: 5vw;
      line-height: 5vh;
    }
    color: black;
    text-align: center;

    position: absolute;
    cursor: pointer;
    background-color: white;
    box-shadow: 0 0 10px white;
    &:hover {
      box-shadow: 0 0 40px white;
    }
  }
}
</style>