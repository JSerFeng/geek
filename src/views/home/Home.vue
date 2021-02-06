<template lang="">
  <div class="home_menu">
    <div class="menu">
      <div class="item leftTop">
        <div class="weather">
          <h3 class="temp">{{ temp }}</h3>
          <div class="icon-sheshidu01"></div>
          <p class="msg">{{ msg }}</p>
        </div>
      </div>
      <div class="item midTop" @click="toLogin">用户</div>
      <div class="item rightTop">消息</div>

      <div class="item leftBottomTop leftBottom">
        <div class="zhihu">
        </div>
      </div>
      <div class="item leftBottomMid leftBottom">
        <div class="github">
          <el-button type="success">知乎</el-button>
        </div>
      </div>
      <div class="item leftBottomBottom leftBottom">
        <div class="juejin">掘金</div>
      </div>

      <div class="item midBottomLeft">经管工作室</div>
      
      <div class="item midBottomRight">课程文档</div>

      <div class="item rightBottomTop rightBottom link-to">经管实验室系统</div>
      <div class="item rightBottomMid rightBottom link-to">成员管理系统</div>
      <div class="item rightBottomBottom rightBottom link-to">教务在线</div>
    </div>
  </div>
</template>
<script lang="ts" setup="">
import { useRouter } from 'vue-router'
import { useWeather } from './hooks';
import { ElButton } from 'element-plus'

const router = useRouter()
const toLogin = () => router.push("/login")

const { temp, msg } = useWeather()
</script>

<style lang="scss" scoped="">
.home_menu {
  overflow: hidden;
  width: 100%;
  height: 100%;

  .menu {
    display: grid;
    width: 90%;
    height: 80%;
    margin: 5% auto;
    grid-template-columns: 1fr 2fr 1.2fr 1fr;
    grid-template-rows: 4fr 1fr 1fr 1fr 1fr;
    grid-template-areas:
      "leftTop midTop midTop rightTop"
      "leftBottomTop midBottomLeft midBottomRight rightBottomTop"
      "leftBottomMid midBottomLeft midBottomRight rightBottomMid"
      "leftBottomBottom midBottomLeft midBottomRight rightBottomBottom"
      ". midBottomLeft . .";
    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 2fr 1.5fr 1.5fr 1fr 1fr 1fr;
      grid-template-areas:
        "midTop midTop"
        "leftTop rightTop"
        "midBottomLeft midBottomRight"
        "leftBottomTop  rightBottomTop"
        "leftBottomMid  rightBottomMid"
        "leftBottomBottom  rightBottomBottom";
    }
    place-items: center;
    place-content: center;
    grid-auto-flow: column;
    grid-gap: 5px;
    .weather {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
      overflow: hidden;
      &::before {
        content: "";
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgb(53, 53, 53);
        filter: opacity(0.8);
      }
      .temp {
        margin: 0;
        padding: 0;
        color: #fff;
        font-size: 40px;
        text-align: center;
      }
      .msg {
        color: #fff;
        font-size: 12px;
      }
    }
    .zhihu,
    .juejin,
    .github {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
    .zhihu {
      background-color: rgb(57, 162, 253);
    }
    .juejin {
      background-color: rgb(57, 162, 253);
    }
    .github {
      font-size: 40px;
      background-color: rgb(95, 95, 95);
    }
    .link-to {
      background-color: rgb(94, 94, 94) !important;
      color: #fff;
      font-size: 16px;
    }
    .item {
      border-radius: 5px;
      transition: 0.2s all;
      background-color: rgb(231, 231, 231);
      width: 100%;
      height: 100%;
      cursor: pointer;

      &:hover {
        z-index: 10;
        transform: scale(1.05);
      }
    }
    .leftBottom {
      @media screen and (max-width: 768px) {
        width: 100%;
      }
      width: 80%;
      justify-self: right;
    }
    .rightBottom {
      @media screen and (max-width: 768px) {
        width: 100%;
      }
      width: 80%;
      justify-self: left;
    }
    .item:nth-child(1),
    .item:nth-child(3) {
      @media screen and (max-width: 768px) {
        height: 100%;
      }
      height: 90%;
      align-self: end;
    }
    .leftTop {
      background-color: transparent;
      grid-area: leftTop;
    }
    .midTop {
      grid-area: midTop;
    }
    .rightTop {
      grid-area: rightTop;
    }
    .midBottomLeft {
      grid-area: midBottomLeft;
    }
    .midBottomRight {
      grid-area: midBottomRight;
    }
    .leftBottomTop {
      grid-area: leftBottomTop;
    }
    .leftBottomMid {
      grid-area: leftBottomMid;
    }
    .leftBottomBottom {
      grid-area: leftBottomBottom;
    }
    .rightBottomTop {
      grid-area: rightBottomTop;
    }
    .rightBottomMid {
      grid-area: rightBottomMid;
    }
    .rightBottomBottom {
      grid-area: rightBottomBottom;
    }

    @for $i from 1 to 12 {
      .item:nth-child(#{$i}) {
        animation: apear 0.5s (0.1s * $i) backwards;
      }
    }
  }
}

@keyframes apear {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.opacity {
  filter: opacity(0.9);
}
</style>