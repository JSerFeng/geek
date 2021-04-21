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
</template>
<script lang="ts" setup>
import { ElInput, ElRadioGroup, ElRadio, ElButton, ElNotification, ElDivider } from "_element-plus@1.0.2-beta.40@element-plus";
import { computed, ref } from 'vue'
import BigFileUploaderVue from "../bigFileUploader/BigFileUploader.vue";
import { useStore } from "../../store";
import ModalVue from "../modal/Modal.vue";
import type { ModalMethods } from '../modal/Modal.vue'
import { apiAddAnnounce } from "../../api/admin";
import type { Admin } from '../../store/modules/user/state'
import { ErrorCode } from "../../api/request";


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

</script>
<style lang="scss" scoped>
.announce {
  background-color: #fff;
  padding: 15px;
  box-sizing: border-box;
}
</style>