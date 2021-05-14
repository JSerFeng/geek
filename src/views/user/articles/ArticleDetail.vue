<template>
  <div class="view-main">
    <div class="header">
      <span class="time">
        <el-breadcrumb>
          <el-breadcrumb-item>{{ detail.adminName }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ getTime(detail.addTime) }}</el-breadcrumb-item>
        </el-breadcrumb>
      </span>
      <h1 class="title">{{ detail.title }}</h1>
    </div>
    <div class="content" v-html="content"></div>
    <div class="side" ref="side$">
      <div class="item author flex jc ac">
        <el-image class="ava" :src="detail.image" :alt="detail.adminName" />
      </div>
      <div @click="markLike" class="item thumb flex jc ac" :class="{ 'active': detail.likeStatus }">
        <i class="iconfont icon-dianzan"></i>
        <span class="like-count">{{ detail.likeCount }}</span>
      </div>
      <div
        @click="markFavorite"
        class="item favorite flex jc ac"
        :class="{ active: detail.favoriteStatus }"
      >
        <i class="iconfont icon-shoucang"></i>
      </div>
      <div class="item">
        <GButton class="to-top flex jc ac" type="broke" @click="backToTop">
          <i class="el-icon-caret-top"></i>
        </GButton>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { apiChangeFavoriteState, apiQueryDetail } from "../../../api/article";
import type { ArticleDetail } from '../../../api/article'
import { ErrorCode } from "../../../api/request";
import { GButton } from '../../../components/geek'
import { backToTop, getTime, throttle } from '../../../utils/shared';
import { apiChangeLikeStatus } from '../../../api/article';
import { useStore } from '../../../store';
import { render } from './render'
import { ElImage, ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'


const store = useStore()
const route = useRoute()
const id = route.query.id

const detail = ref<ArticleDetail>({
  id: 8,
  courseName: "",
  adminId: "",
  adminName: "",
  image: "",
  title: "",
  content: "",
  addTime: "",
  articleType: "",
  likeCount: 0,
  likeStatus: 0,
  favoriteStatus: 0,
  articleFileVOList: []
})

const content = computed(() => detail.value.articleType === "word"
  ? detail.value.content
  : render(
    detail.value.articleFileVOList[0]?.richText || ""
  )
)

const markLike = throttle(async (e: Event) => {
  const res = await apiChangeLikeStatus(store.state.user.userInfo.userId!, parseInt(id as string))
  if (res.error_code === ErrorCode.Success) {
    detail.value.likeCount += (detail.value.likeStatus ^= 1) ? 1 : -1
  }
})

const markFavorite = throttle(async (e: Event) => {
  const res = await apiChangeFavoriteState(store.state.user.userInfo.userId!, parseInt(id as string))
  if (res.error_code === ErrorCode.Success) {
    detail.value.favoriteStatus ^= 1
  }
})

const side$ = ref<HTMLDivElement>()
const onMousemove = (e: Event) => {
  const items = side$.value!.querySelectorAll(".item")
  const { pageX, pageY } = (e as MouseEvent)
  for (let i = 0; i < items.length; i++) {
    const item = items[i] as HTMLDivElement
    const { x, y, width, height } = item.getBoundingClientRect()
    const posX = x + width / 2
    const posY = y + height / 2
    const distance = (pageX - posX) ** 2 + (pageY - posY) ** 2
    const scale = Math.max(1, Math.min(1.5 - distance / 20000, 1.5))
    item.style.setProperty("--scale", scale.toString())
  }
}

onMounted(async () => {
  document.addEventListener("mousemove", onMousemove)

  const res = await apiQueryDetail(parseInt(id as string), store.state.user.userInfo.userId!)
  if (res.error_code === ErrorCode.Success) {
    detail.value = res.data
  }
})
onUnmounted(() => {
  document.removeEventListener("mousemove", onMousemove)
})
</script>
<style lang="scss" scoped>
@import "../../../main.scss";
.header {
  width: 100%;
  padding: 5% 5% 10%;
  background-color: #fff;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  .time {
    font-size: 16px;
    color: rgb(119, 119, 119);
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
  }
  .title {
    position: relative;
    padding: 10px 0;
    margin: 0;
    color: #1f2667;
    z-index: 999;
  }
  &:after {
    content: "";
    z-index: 0;
    position: absolute;
    width: 40vw;
    height: 40vw;
    right: 40%;
    top: 0;
    background-color: $g-theme;
    opacity: 0.8;
    transform: rotate(45deg) translateY(-100%);
  }
  &:before {
    content: "";
    z-index: 0;
    position: absolute;
    width: 40vw;
    height: 40vw;
    right: 0;
    border-radius: 50%;
    transform-origin: top;
    background-color: $q-theme;
  }
}
.content {
  box-shadow: 0 0 30px -15px rgb(173, 173, 173);
  background-color: #fff;
  position: relative;
  border-radius: 20px;
  width: 70%;
  @media screen and (max-width: 768px) {
    width: 90%;
    transform: translate(0, -50px);
  }
  padding: 15px;
  box-sizing: border-box;
  overflow: auto;
  transform: translate(10%, -50px);
  .content,
  footer {
    padding: 15px;
    box-sizing: border-box;
    background-color: #fff;
  }
}
.side {
  position: fixed;
  right: 20%;
  top: 50%;
  transform: translate(100%, 0);
  padding: 5px;

  @media screen and (max-width: 768px) {
    top: 1%;
    transform: translate(100%, 0) scale(.8);
  }

  .item {
    --scale: 1;
    position: relative;
    transition: 0.2s;
    border-radius: 50%;
    font-size: calc(1em * var(--scale));
    width: calc(50px * var(--scale));
    height: calc(50px * var(--scale));
    background-color: #fff;
    margin: 15px;
    cursor: pointer;

    .like-count {
      font-size: 0.8em;
      color: rgb(94, 94, 94);
    }

    > .iconfont {
      font-size: 1em;
    }
  }
  .ava {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .author {
    transition: 0.2s;

    .info {
      visibility: hidden;
      transition: 0.2s;
      z-index: 10;
      position: inherit;
      position: absolute;
      top: 50%;
      right: 100%;
      transform: translate(0, -50%);
      background-color: #fff;
      box-shadow: 0 0 50px rgb(235, 235, 235);
      padding: 10px;
      border-radius: 20px;
      &:hover {
        visibility: visible;
      }

      .info-ava {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background-color: rgb(236, 236, 236);
      }

      .name {
        font-size: 16px;
        text-align: center;
        color: rgb(143, 143, 143);
      }
    }

    &:hover {
      .info {
        visibility: visible;
      }
    }
  }
  .favorite {
    &.active {
      animation: click 0.5s;
      background-color: rgb(252, 255, 208);

      .iconfont {
        color: rgb(255, 187, 0);
      }
    }
  }

  .thumb {
    &.active {
      animation: click 0.5s;
      background-color: rgb(208, 246, 255);
      .iconfont {
        color: rgba(0, 153, 255, 0.575);
      }
    }
  }

  .to-top {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    .el-icon-caret-top {
      color: #fff;
      font-size: 2em;
    }
  }
}
@keyframes click {
  10% {
    transform: scale(0.5);
  }
  60% {
    transform: scale(1.5);
  }
  90% {
    transform: scale(0.9);
  }
}
</style>