<template>
  <div class="article" v-loading="status === Flags.Pending">
    <template v-if="data.items.length">
      <ul class="list" v-loading="status === Flags.Pending">
        <li class="flex" v-for="(item, i) in data.items" :key="item.id">
          <div class="article-avatar">
            <ElAvatar :src="item.image" />
          </div>
          <div class="article-info">
            <div class="name">
              <span>{{ item.adminName }}</span>
              <LogoVue :course-name="item.courseName" />
            </div>
            <div class="title p" @click="findDetailArticle(item.id)">{{ item.title }}</div>
            <div class="footer flex">
              <!-- 点赞图标 -->
              <div
                @click="markLike(i, item.id)"
                class="footer-icon"
                :class="{ active: item.likeStatus, }"
              >
                <span class="p">
                  <span class="icon-thumb-up iconfont"></span>
                  {{ item.likeCount }}
                </span>
              </div>
              <!-- 收藏图标 -->
              <div
                @click="markFavorite(i, item.id)"
                class="footer-icon"
                :class="{ active: item.favoriteStatus }"
              >
                <span class="p">
                  <span class="icon-shoucang iconfont"></span>
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="pagination flex jc ac">
        <GButton :disabled="page <= 1" @click="goPrev">prev</GButton>
        <div class="cur-page">{{ Math.min(data.totalPage, page) }} / {{ data.totalPage }}</div>
        <GButton :disabled="page >= data.totalPage" @click="goNext">next</GButton>
      </div>
    </template>
    <template v-else-if="status === Flags.Fail">
      <FatalVue style="width: 50%;margin: 0 auto;" />
    </template>
    <template v-else-if="status === Flags.Success">
      <EmptyVue style="width: 50%;margin: 0 auto;" />
    </template>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, watchEffect } from "vue";
import { ElAvatar, ElNotification } from 'element-plus'
import { Flags } from "../../utils/shared";
import { apiChangeFavoriteState, apiQueryArticles, apiQueryFavorites } from "../../api/article";
import type { Articles } from '../../api/article'
import { useStore } from "../../store";
import { ErrorCode } from "../../api/request";
import { apiChangeLikeStatus } from '../../api/article'
import { useRouter } from "vue-router";
import LogoVue from "../Logo.vue";
import { ROW } from "../../config/config";
import { GButton } from '../geek'
import EmptyVue from "../Empty.vue";
import FatalVue from "../Fatal.vue";


const store = useStore()
const router = useRouter()

const props = defineProps<{
  currentPage?: number,
  rows?: number
  courseName?: string | null,
  adminName?: string | null,
  myFavorites?: boolean
}>()


const status = ref(Flags.Normal)
const data = ref<Articles>({
  total: 0,
  totalPage: 0,
  rows: 10,
  currentPage: 1,
  items: []
})

const page = ref(props.currentPage || 1)

/**点击收藏 */
const markFavorite = async (idx: number, articleId: number) => {
  if (store.state.user.isLogin) {
    const res = await apiChangeFavoriteState(store.state.user.userInfo.userId!, articleId)
    if (res.error_code === ErrorCode.Success) {
      data.value.items[idx].favoriteStatus ^= 1
    }
  } else {
    ElNotification({
      message: "请先登陆"
    })
  }
}

/**点击点赞 */
const markLike = async (idx: number, articleId: number) => {
  if (store.state.user.isLogin) {
    const res = await apiChangeLikeStatus(store.state.user.userInfo.userId!, articleId)
    if (res.error_code === ErrorCode.Success) {
      data.value.items[idx].likeCount += (data.value.items[idx].likeStatus ^= 1) ? 1 : -1
    }
  } else {
    ElNotification({
      message: "请先登陆"
    })
  }
}

/**分页请求 */
const query = async () => {
  status.value = Flags.Pending
  const res = props.myFavorites
    ? await apiQueryFavorites(store.state.user.userInfo.userId!, page.value, props.rows || ROW)
    : await apiQueryArticles(
      page.value,
      props.rows || ROW,
      store.state.user.userInfo.userId,
      props.courseName || null,
      props.adminName || null
    )
  if (res.error_code === ErrorCode.Success) {
    data.value = res.data
    status.value = Flags.Success
  } else {
    status.value = Flags.Fail
  }
}

watchEffect(() => {
  query()
})

const goNext = () => {
  if (page.value + 1 <= data.value.total) {
    page.value += 1
    query()
  }
}

const goPrev = () => {
  if (page.value - 1 >= 1) {
    page.value -= 1
    query()
  }
}


/**点击后跳转去详情页 */
const findDetailArticle = (id: number) => {
  router.push({ path: "/article", query: { id } })
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
      transition: 0.2s;
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

        > .title {
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
            color: rgb(22, 37, 150);
            span {
              font-size: 16px;
              color: rgb(93, 104, 185);
            }
          }
        }
      }
    }
  }

  .pagination {
    background-color: #fff;
    padding: 5px 15px;
    box-sizing: border-box;

    .disabled {
      background-color: rgb(226, 226, 226);
      color: rgb(189, 189, 189);
    }

    .cur-page {
      padding: 10px 5px;
      box-sizing: border-box;
      font-size: 12px;
    }
  }
}
</style>