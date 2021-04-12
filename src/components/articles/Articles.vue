<template>
  <div class="article">
    <CheckApi :status="status" errMsg="网络错误"></CheckApi>
    <ul class="list shade">
      <li class="flex" v-for="(item, i) in data.items" :key="item.id">
        <div class="article-avatar">
          <ElAvatar :src="item.image" />
        </div>
        <div class="article-info">
          <div class="name">{{ item.adminName }}</div>
          <div class="title p" @click="findDetailArticle(item.id, item.articleType)">{{ item.title }}</div>
          <div class="footer flex">
            <!-- 点赞图标 -->
            <div class="footer-icon" :class="{ active: item.likeStatus, }">
              <span class="p">
                <span class="icon-thumb-up iconfont"></span>
                {{ item.likeCount }}
              </span>
            </div>
            <!-- 收藏图标 -->
            <div class="footer-icon" :class="{ active: item.favoriteStatus }">
              <span class="p">
                <span class="icon-shoucang iconfont"></span>
              </span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, watchEffect } from "@vue/runtime-core";
import { ElAvatar } from 'element-plus'
import { Flags } from "../../utils/shared";
import CheckApi from '../checkApi/CheckApi.vue'
import { apiQueryArticles } from "../../api/article";
import type { Articles } from '../../api/article'
import { useStore } from "../../store";
import { ErrorCode } from "../../api/request";
import { useRouter } from "vue-router";

const store = useStore()
const router = useRouter()

const props = defineProps<{
  currentPage?: number,
  courseName?: string,
  adminName?: string,
  rows?: number
}>()

const status = ref(Flags.Normal)
const data = ref<Articles>({
  total: 0,
  totalPage: 0,
  rows: 10,
  currentPage: 1,
  items: []
})

const query = async () => {
  status.value = Flags.Pending
  const res = await apiQueryArticles(props.currentPage || 1, props.rows, {
    userId: store.state.user.userInfo.userId,
    courseName: props.courseName || null,
    adminName: props.adminName || null
  })
  if (res.error_code === ErrorCode.Success) {
    data.value = res.data
    status.value = Flags.Success
  } else {
    status.value = Flags.Fail
  }
}

query()

const findDetailArticle = (id: number, articleType: string) => {
  router.push({path: "/article", query: {id, articleType}})
}
</script>
<style lang="scss" scoped>
.article {
  position: relative;

  ul {
    padding: 0;
    margin: 0;
    background-color: #fff;

    li {
      margin: 10px 0;
      padding: 15px;
      transition: .2s;
      box-sizing: border-box;
      font-weight: 100;

      &:active {
        background-color: rgb(223, 223, 223);
      }

      .article-avatar {
        width: fit-content;
        padding-right: 10px;
      }

      .article-info {
        width: 100%;
        .name {
          font-size: 14px;
          color: rgb(126, 126, 126);
        }

        .title {
          font-size: 18px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          padding: 10px 0;
        }

        .footer {
          .footer-icon {
            font-size: 16px;
            width: 20%;
          }
          .icon-thumb-up,
          .icon-shoucang {
            color: rgba(189, 189, 189, 0.664);
            font-size: 14px;
          }

          .active {
            font-weight: bolder;
            color: rgba(218, 116, 0, 0.664);
            span {
              font-size: 16px;
              color: rgba(255, 152, 34, 0.664);
            }
          }
        }
      }
    }
  }
}
</style>