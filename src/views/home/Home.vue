<template lang="">
  <div class="home_menu">
    <div class="menu">
      <div class="item leftTop">
        <WeatherVue />
      </div>
      <div class="item midTop">
        <Login />
      </div>
      <div class="item rightTop">
        <ArticleMenuVue />
      </div>

      <div class="item leftBottomTop leftBottom">
        <a class="zhihu" target="_blank" href="https://www.zhihu.com/people/evanyou">
          知乎
        </a>
      </div>
      <div class="item leftBottomMid leftBottom">
        <a class="github p" target="_blank" href="https://github.com/JSerFeng/geek.git">
          <img src="../../assets/imgs/github.png" />
        </a>
      </div>
      <div class="item leftBottomBottom leftBottom">
        <a class="juejin p bg-bottom bg-q" target="_blank" href="https://juejin.cn/">
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjQ1cHgiIGhlaWdodD0iMzhweCIgdmlld0JveD0iMCAwIDQ1IDM4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPkp1ZWppbjwvdGl0bGU+CiAgICA8ZGVzYz5KdWVqaW4uY248L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iMC4xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iR3JvdXAtMTQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEuMDAwMDAwLCA1LjAwMDAwMCkiIGZpbGw9IiMwMDZDRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNMjEuMjkzNDMyOCwyLjU4MzEzMDQ5IEwxOC4wMTczOTg0LDAgTDE0LjU5NDYyNCwyLjY5ODg3ODAxIEwxNC40MTcyMDc3LDIuODQxODIzMDQgTDE4LjAxNzM5ODQsNS43MTI0MjQ4MyBMMjEuNjI4NjU3OCwyLjg0MTgyMzA0IEwyMS4yOTM0MzI4LDIuNTgzMTMwNDkgWiBNMzMuNzA3ODI4OSwxMi42MDA2Njc0IEwxOC4wMDc5MTA5LDI0Ljk4MDI3NiBMMi4zMTc0ODA0NCwxMi42MDgyNTc0IEwwLDE0LjQ2OTcwNTIgTDE4LjAwNzkxMDksMjguNjY5MDE2NyBMMzYuMDI1NjI1NiwxNC40NjIxMTUyIEwzMy43MDc4Mjg5LDEyLjYwMDY2NzQgWiBNMTguMDA3OTEwOSwxMy42MDUwNzc2IEw5LjQ2NDQxNTU0LDYuODY4NjM1MDUgTDcuMTQ2NjE4ODUsOC43MzAwODI5IEwxOC4wMDc5MTA5LDE3LjI5NDEzNDUgTDI4Ljg3ODM3NDIsOC43MjI0OTI5IEwyNi41NjA1Nzc1LDYuODYxMDQ1MDUgTDE4LjAwNzkxMDksMTMuNjA1MDc3NiBaIiBpZD0iRmlsbC0xLUNvcHkiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="/>
          掘金
        </a>
      </div>

      <div class="item midBottomLeft">
        <BroadCastVue />
      </div>
      
      <div class="item midBottomRight">
        <HomeworkMenuVue />
      </div>

      <div class="item rightBottomTop rightBottom link-to">
        <a 
        href="http://172.22.4.2" 
        target="_blank" 
        class=" flex jc ac"
        style="width: 100%;height: 100%;background-color: #31326f;color: #fff;">
          成员管理系统
        </a>
      </div>
      <div class="item rightBottomMid rightBottom link-to">
        <a 
        href="http://172.22.4.2" 
        target="_blank" 
        class=" flex jc ac"
        style="width: 100%;height: 100%;background-color: #51adcf;color: #fff;">
          经管实验室系统
        </a>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup="">
import Login from './components/Login.vue'
import BroadCastVue from '../user/broad-cast/BroadCast.vue';
import ArticleMenuVue from './components/ArticleMenu.vue';
import HomeworkMenuVue from './components/HomeworkMenu.vue'
import WeatherVue from './components/Weather.vue'
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
      "leftBottomBottom midBottomLeft midBottomRight ."
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

    .zhihu,
    .juejin,
    .github {
      position: relative;
      width: 100%;
      overflow: hidden;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;

      img {
        width: 40px;
      }
    }
    .zhihu {
      background-color: rgb(57, 162, 253);
    }
    .juejin {
      color: rgb(57, 162, 253);
      background-color: #fff;
    }
    .github {
      font-size: 40px;
      background-color: rgb(201, 201, 201);
      img {
        background-color: rgb(255, 255, 255);
        border-radius: 50%;
      }
    }
    .link-to {
      background-color: rgb(94, 94, 94) !important;
      color: #fff;
      font-size: 16px;
    }
    .item {
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