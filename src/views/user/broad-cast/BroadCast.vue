<template>
  <div class="wrap" v-loading="flag === Flags.Pending">
    <span style="color: rgb(19, 0, 124);">公告</span>
    <GSelect :items="courses" @change="changeCourse" />
    <ul>
      <li
        @click="open(item.id)"
        class="flex ac jb p"
        v-for="(item) in broadCasts.items"
        :key="item.id"
      >
        <div class="title big-font">{{ item.title }}</div>
        <div class="small-font">{{ getTime(item.addTime) }}</div>
      </li>
    </ul>
    <Modal width="80%" ref="detailModal">
      <div class="info" v-loading="flag === Flags.Pending">
        <div v-if="flag === Flags.Success">
          <DetailVue :detail="detail" />
        </div>
      </div>
    </Modal>
    <div class="flex jc ac" v-if="broadCasts.totalPage">
      <GButton @click="goNext(-1)" :disabled="!prevAvailable">上一页</GButton>
      <span class="curr-page">
        <span class="curr">{{ currIdx }}</span> /
        <span class="total">{{ broadCasts.totalPage }}</span>
      </span>
      <GButton @click="goNext(1)" :disabled="!nextAvailable">下一页</GButton>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";
import { apiGetAnnounce, apiGetAnnounceDetail } from "../../../api/user";
import type { ApiAnnounceDetail } from '../../../api/user'
import type { ApiAnnounce } from "../../../api/user"
import { ErrorCode } from "../../../api/request";
import { Flags, getTime } from "../../../utils/shared";
import { GButton, GSelect, GLoadingIcon } from '../../../components/geek'
import Modal from '../../../components/modal/Modal.vue'
import type { ModalMethods } from '../../../components/modal/Modal.vue'
import { useStore } from "../../../store";
import DetailVue from "./Detail.vue";

const broadCasts = ref<ApiAnnounce>({
  "total": 0,
  "currentPage": 0,
  "totalPage": 0,
  "rows": 0,
  "items": []
})

const store = useStore()

const courses = computed(() => [{ k: "所有", v: undefined }, ...store.state.user.allCourses.map(item => ({
  k: item.courseName,
  v: item.courseId
}))])
const courseId = ref<number | undefined>()
const currIdx = ref(1)
const flag = ref(Flags.Normal)
const prevAvailable = computed(() => currIdx.value > 1)
const nextAvailable = computed(() => currIdx.value < broadCasts.value.totalPage)

const goNext = (to: number) => {
  currIdx.value += to
}

const changeCourse = (id: number) => {
  currIdx.value = 1
  courseId.value = id
}

const query = async () => {
  flag.value = Flags.Pending
  const res = await apiGetAnnounce(currIdx.value, courseId.value)
  if (res.error_code !== ErrorCode.Success) {
    flag.value = Flags.Fail
    return
  }
  flag.value = Flags.Success
  broadCasts.value = res.data
}

const detail = ref<ApiAnnounceDetail | null>(null)
const queryDetail = async (id: number) => {
  flag.value = Flags.Pending
  const res = await apiGetAnnounceDetail(id)
  if (res.error_code !== ErrorCode.Success) {
    flag.value = Flags.Fail
    detail.value = null
    return
  }
  flag.value = Flags.Success
  detail.value = res.data
}

watchEffect(() => {
  query()
})


const detailModal = ref<ModalMethods>()
const open = (id: number) => {
  detailModal.value!.open()
  queryDetail(id)
}
</script>
<style lang="scss" scoped="">
.wrap {
  z-index: 1;
  font-size: 14px;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px 0;
  box-sizing: border-box;
  background-color: #fff;
  backdrop-filter: blur(20px);
  max-height: 100%;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  ul {
    max-height: 100%;
    overflow-y: auto;
    width: 100%;

    li {
      padding: 10px;
      z-index: 1;
      .title {
        z-index: 1;
      }
      .small-font {
        z-index: 1;
      }
    }
  }

  .curr-page {
    font-size: 14px;
    color: rgb(175, 175, 175);
    padding: 0.2em 0.5em;

    .curr {
      color: black;
      font-size: 1.5em;
    }
    .total {
      font-size: 0.9em;
      color: rgb(175, 175, 175);
    }
  }
}

.detail-modal {
  .info {
    padding: 15px;
  }
}
</style>