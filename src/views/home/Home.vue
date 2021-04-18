<template lang="">
  <div class="home_menu">
    <div class="menu">
      <div class="item leftTop">
        <div class="weather">
          <h3 class="temp">
            {{ temp }}
            <span class="iconfont icon-sheshidu01"></span>
          </h3>
        
          <p class="msg">{{ msg }}</p>
        </div>
      </div>
      <div class="item midTop">
        <Login />
      </div>
      <div class="item rightTop">
        <BroadCastVue />
      </div>

      <div class="item leftBottomTop leftBottom">
        <div class="zhihu">
        </div>
      </div>
      <div class="item leftBottomMid leftBottom">
        <div class="github">
          <ElButton type="success">知乎</ElButton>
        </div>
      </div>
      <div class="item leftBottomBottom leftBottom">
        <div class="juejin">掘金</div>
      </div>

      <div class="item midBottomLeft">
        <router-link to="/articleList">精选文章</router-link>
      </div>
      
      <div class="item midBottomRight">
        <router-link to="/homework">作业</router-link>
      </div>

      <div class="item rightBottomTop rightBottom link-to">经管实验室系统</div>
      <div class="item rightBottomMid rightBottom link-to">成员管理系统</div>
      <div class="item rightBottomBottom rightBottom link-to">
        <router-link to="/admin" >教务在线</router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup="">
import { useWeather } from './hooks';
import { ElButton } from 'element-plus'
import Login from './components/Login.vue'
import BroadCastVue from '../user/broad-cast/BroadCast.vue';

const { temp, msg } = useWeather()
</script>

<style lang="scss" scoped>
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
        background: rgb(134, 134, 134);
        filter: opacity(0.8);
      }
      .temp {
        margin: 0;
        padding: 0;
        color: #fff;
        font-size: 40px;
        text-align: center;
        position: relative;
        z-index: 1;

        .icon-sheshidu01 {
          z-index: 0;
          color: #fff;
          left: 0;
          top: 0;
          color: #fff;
        }
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

      // &:hover {
      //   z-index: 10;
      //   transform: scale(1.05);
      // }
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