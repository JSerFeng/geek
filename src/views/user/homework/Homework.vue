<template>
  <div class="view-main">
    <div class="wrap">
      <div class="info flex jc ac">
        <LogoVue class="logo" :courseName="currCourseName" />
      </div>
      <GTabs class="shade" :items="items" @change="change" />
      <template v-if="homeworkList.length">
        <div class="list shade">
          <el-collapse accordion>
            <el-collapse-item
              v-for="(item) in homeworkList"
              :key="item.id"
              class="item"
              :class="{ done: item.isClosed }"
            >
              <template #title>
                <el-row class="header">
                  <el-col :span="12">{{ item.taskName }}</el-col>
                  <el-col :span="4">
                    <Tag
                      style="font-size: 12px;"
                      :type="item.isClosed ? 'error' : 'normal'"
                    >{{ item.isClosed ? '已结束' : '进行中' }}</Tag>
                  </el-col>
                  <el-col :span="8">
                    <span class="time" style="margin-left: 5px;">
                      {{ getTime(item.addTime) }}发布,
                      截至时间{{ item.closeTime }}
                    </span>
                  </el-col>
                </el-row>
              </template>
              <div class="collapse">
                <p>作业详情</p>
                <ul class="flex ac">
                  <li
                    class="p file"
                    v-for="(file, idx) in item.taskFileVOList"
                    :key="idx"
                  >
                  <a :href="file.filePath" :download="file.fileName" target="_blank">
                    {{ file.fileName }}
                    <div class="el-icon-download"></div>
                  </a>
                  </li>
                </ul>
                <GButton @click="open(item)">提交</GButton>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </template>
      <template v-else-if="flag === Flags.Success">
        <Empty />
      </template>
      <template v-else-if="flag === Flags.Fail">
        <Fatal />
      </template>
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
import Tag from "./Tag.vue";
import Modal from '../../../components/modal/Modal.vue'
import type { ModalMethods } from '../../../components/modal/Modal.vue'
import { ElNotification, ElRow, ElCol, ElCollapse, ElCollapseItem } from "element-plus";
import DetailVue from "./Detail.vue";
import LogoVue from "../../../components/Logo.vue";
import Empty from '../../../components/Empty.vue'
import Fatal from '../../../components/Fatal.vue'


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
const items = ref<{ k: string, v: number }[]>([])
watchEffect(() => {
  items.value = store.state.user.allCourses.map(course => ({
    k: course.courseName,
    v: course.courseId,
  }))
})

const currCourseId = ref(-1)
const currCourseName = ref("")

const homeworkList = ref<ApiHomeworkRecord["taskPOList"]>([])
const total = ref(0)
const flag = ref(Flags.Normal)

const query = async () => {
  if (currCourseId.value < 0) return
  flag.value = Flags.Pending
  const res = await apiQueryHomework(currCourseId.value)
  if (res.error_code === ErrorCode.Success) {
    homeworkList.value = res.data.taskPOList
    total.value = res.data.total
    flag.value = Flags.Success
  } else {
    flag.value = Flags.Fail
  }
}

watchEffect(() => {
  query()
})

const change = (courseId: number, courseName: string) => {
  currCourseId.value = courseId
  currCourseName.value = courseName
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
    } else {
      ElNotification({
        message: "请重新登陆"
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.wrap {
  .info {
    height: 10vw;
    width: 100%;

    .logo {
      font-size: 8vw;
    }
  }
  .el-col {
    font-size: 16px;
  }

  .list {
    box-sizing: border-box;
    width: 80%;
    margin: 5% auto;
    padding: 20px 0;
    border-radius: 20px;
    background-color: #fff;

    .item {
      padding: 5px;
      position: relative;

      .header {
        width: 100%;
        padding: 0 5px;
        box-sizing: border-box;
      }

      &.done {
        .header {
          width: 100%;
          background-color: #fff;
          color: rgb(196, 196, 196);
          text-decoration: line-through;
        }
        .collapse {
          color: rgb(196, 196, 196);
          text-decoration: line-through;
        }
      }

      .time {
        font-size: 12px;
        color: rgb(173, 173, 173);
      }

      .collapse {
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
    }
  }
}
</style>