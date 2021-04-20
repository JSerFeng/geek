<template lang="">
<div class="view-main">
  <div class="wrap shade">
    <GTabs class="shade" :items="items" @change="change"/>
    <CheckApiVue :status="flag" err-msg="网络错误"/>
    <ul class="list">
      <li
      v-for="(item) in homeworkList" 
      :key="item.id"
      class="item"
      >
        <div class="header">
          {{ item.taskName }}
          <Tag style="font-size: 12px;" :type="item.isClosed ? 'error' : 'normal'">
            {{ item.isClosed ? '已结束' : '进行中' }}
          </Tag>
          <span class="time" style="margin-left: 5px;">
            {{ getTime(item.addTime) }}发布, 
            截至时间{{ item.closeTime }}
          </span>
        </div>
        <div class="collapse">
          <p>作业详情</p>
          <ul class="flex ac">
            <li 
            class="p file" 
            v-for="(file, idx) in item.taskFileVOList" 
            :key="idx"
            @click="download(file.filePath, file.fileName)"
            >
              {{ file.fileName }}
              <div class="el-icon-download"></div>
            </li>
          </ul>
          <GButton @click="open(item)">
            提交
          </GButton>
        </div>
      </li>
    </ul>
    <Modal ref="modalCtx" width="80%">
      <DetailVue 
      :userId="store.state.user.userInfo.userId || ''"
      :info="currDetailInfo || undefined"
      :courseId="currCourseId"
      />
    </Modal>
  </div>
</div>
</template>
<script lang="ts" setup>
import { ref, computed, watchEffect } from "vue";
import { GTabs, GButton } from "../../../components/geek";
import { useStore } from "../../../store";
import type { ApiHomeworkRecord } from "../../../api/homework"
import { apiQueryHomework } from "../../../api/homework"
import { ErrorCode } from "../../../api/request";
import { Flags, getTime } from "../../../utils/shared";
import { download } from '../../../api/file'
import CheckApiVue from "../../../components/checkApi/CheckApi.vue";
import Tag from "./Tag.vue";
import Modal from '../../../components/modal/Modal.vue'
import type { ModalMethods } from '../../../components/modal/Modal.vue'
import { ElNotification } from "element-plus";
import DetailVue from "./Detail.vue";

interface Item {
  id: number;
  courseId: number;
  adminId: string;
  taskName: string;
  addTime: string;
  closeTime: string;
  commitLate: number;
  isClosed: number;
  weight: number;
  taskFileVOList: {
    fileName: string;
    filePath: string;
    addTime: string;
  }[];
  filePath: null;
}



const store = useStore()
const items = computed(() => store.state.user.allCourses.map(course => ({
  k: course.courseName,
  v: course.courseId,
})))

const currCourseId = ref(-1)

const homeworkList = ref<ApiHomeworkRecord["taskPOList"]>([])
const flag = ref(Flags.Normal)
const query = async () => {
  if (currCourseId.value < 0) return
  flag.value = Flags.Pending
  const res = await apiQueryHomework(currCourseId.value)
  if (res.error_code === ErrorCode.Success) {
    homeworkList.value = res.data.taskPOList
    flag.value = Flags.Success
  } else {
    flag.value = Flags.Fail
  }
}

watchEffect(() => {
  query()
})

const change = (courseId: number) => {
  currCourseId.value = courseId
}


const currDetailInfo = ref<Item | null>(null)

const modalCtx = ref<ModalMethods>()
const open = (item: Item) => {
  const isClose = item.isClosed
  if (isClose) {
    ElNotification({
      message: "作业提交通道已关闭，下一次加油叭"
    })
  } else {
    if (store.state.user.allCourses[0]) {
      currDetailInfo.value = item
      currCourseId.value = currCourseId.value === -1
        ? store.state.user.allCourses[0].id
        : currCourseId.value
      modalCtx.value?.open()
    }
  }
}

</script>
<style lang="scss" scoped>
.wrap {
  background-color: #fff;

  .list {
    margin: 15px;
    .item {
      padding: 5px;

      .time {
        font-size: 12px;
        color: rgb(173, 173, 173);
      }

      .collapse {
        transition: 0.2s;
        height: 0;
        overflow: hidden;
        padding: 15px;
        box-sizing: border-box;
        font-size: 16px;

        .file {
          position: relative;
          font-size: 14px;
          font-weight: 100;
          margin: 10px;
        }
      }

      &:hover {
        .collapse {
          height: fit-content;
        }
      }
    }
  }
}

.upload {
}
</style>