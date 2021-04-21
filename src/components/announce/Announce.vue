<template>
  <div class="announce">
    <div class="font16">公告标题</div>
    <el-input placeholder="公告标题" v-model="title" />
    <div class="font16">公告内容</div>
    <el-input placeholder="公告内容" :rows="2" type="textarea" v-model="content" />
    <div class="font16">公告对象</div>
    <ElRadioGroup v-model="courseId">
      <ElRadio :label="null">全部</ElRadio>
      <ElRadio
        v-for="(item) in store.state.user.allCourses"
        :label="item.courseId"
        :key="item.courseId"
      >{{ item.courseName }}</ElRadio>
    </ElRadioGroup>
    <ElDivider />
    <el-button @click="openFileModal" type="primary">上传文件（可选）</el-button>
    <el-button @click="send" :disabled="!canSend" type="primary">发布</el-button>
  </div>
  <ModalVue ref="fileModal" width="80%">
    <template v-if="id">
      <h5 class="lighter">
        <div
          style="padding: 20px;background-color: rgb(255, 228, 228);color: red;border-radius: 5px;"
        >不要上传大于3G的文件</div>
      </h5>
      <BigFileUploaderVue @finish="onFileFinish" :id="id" :course-id="courseId" />
    </template>
    <template v-else>
      <div v-loading="true" style="height: 100%;"></div>
    </template>
  </ModalVue>
  <div>
    <el-select v-model="courseId" placeholder="选择方向">
      <el-option
        v-for="item in store.state.user.allCourses"
        :key="item.id"
        :label="item.courseName"
        :value="item.courseId"
      ></el-option>
    </el-select>
    <el-table style="width: 100%" :data="announce?.items">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="addTime" label="发布时间"></el-table-column>
      <el-table-column label="添加附件">
        <template #default="scope">
          <el-button type="primary" @click="appendFile(scope.id, scope.courseId)">添加附件</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="switchPage"
      hide-on-single-page
      :page-size="ROW"
      :total="announce?.total"
    />
  </div>
</template>
<script lang="ts" setup>
import {
  ElInput, ElRadioGroup, ElRadio, ElButton, ElNotification, ElDivider, ElPagination, ElSelect, ElOption
} from "element-plus";
import { computed, ref, watchEffect } from 'vue'
import BigFileUploaderVue from "../bigFileUploader/BigFileUploader.vue";
import { useStore } from "../../store";
import ModalVue from "../modal/Modal.vue";
import type { ModalMethods } from '../modal/Modal.vue'
import { apiAddAnnounce } from "../../api/admin";
import type { Admin } from '../../store/modules/user/state'
import { ErrorCode } from "../../api/request";
import type { ApiAnnounce } from '../../api/user'
import { apiGetAnnounce } from "../../api/user";
import { ROW } from "../../config/config";

const store = useStore()

const title = ref("")
const content = ref("")
const courseId = ref<number | null>(null)
const fileModal = ref<ModalMethods>()
const id = ref<number | null>(null)

const query = async () => {
  const res = await apiAddAnnounce(
    (store.state.user.userInfo as Admin).adminId,
    courseId.value as unknown as undefined,
    title.value,
    content.value
  )
  if (res.error_code === ErrorCode.Success) {
    id.value = res.data
    return true
  }
  return false
}

const openFileModal = async () => {
  const isReady = await query()
  if (isReady) {
    fileModal.value!.open()
  }
}

const canSend = computed(() => [title, content].every(item => item.value))
const send = async () => {
  const result = await query()
  if (result) {
    ElNotification({
      message: "发布成功"
    })
  }
}

const onFileFinish = () => {
  fileModal.value!.close()
  ElNotification({
    message: "上传文件成功"
  })
}


const currPage = ref(1)
const announce = ref<ApiAnnounce>()
const queryPage = async () => {
  if (!courseId.value) return
  const res = await apiGetAnnounce(currPage.value, courseId.value, ROW)
  if (res.error_code === ErrorCode.Success) {
    announce.value = res.data
  }
}

const switchPage = (page: number) => {
  currPage.value = page
}
watchEffect(() => {
  courseId.value = store.state.user.allCourses[0]?.courseId || null
})
watchEffect(() => {
  queryPage()
})
const currId = ref(0)
const currCourseId = ref(0)
const appendFile = async (id: number, courseId: number) => {
  currId.value = id
  currCourseId.value = courseId
  fileModal.value!.open()
}
</script>
<style lang="scss" scoped>
.announce {
  background-color: #fff;
  padding: 15px;
  box-sizing: border-box;
}
</style>
