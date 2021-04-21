<template>
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
    <Modal ref="fileModal" width="80%">
      <template v-if="currId">
        <h5 class="lighter">
          <div
            style="padding: 20px;background-color: rgb(255, 228, 228);color: red;border-radius: 5px;"
          >不要上传大于3G的文件</div>
        </h5>
        <BigFileUploaderVue @finish="onFileFinish" :id="currId" :course-id="currCourseId" />
      </template>
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import { ElPagination, ElSelect, ElOption, ElButton } from "_element-plus@1.0.2-beta.40@element-plus";
import { ROW } from "../../config/config";
import { ref, watchEffect } from 'vue'
import { apiGetAnnounce } from "../../api/user";
import type { ApiAnnounce } from '../../api/user'
import { ErrorCode } from "../../api/request";
import { useStore } from "../../store";
import Modal from '../../components/modal/Modal.vue'
import type { ModalMethods } from '../../components/modal/Modal.vue'

const store = useStore()
const announce = ref<ApiAnnounce>()
const courseId = ref<number | null>(null)
const currPage = ref(1)

const query = async () => {
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
  query()
})

const currId = ref(0)
const fileModal = ref<ModalMethods>()
const currCourseId = ref(0)
const appendFile = async (id: number, courseId: number) => {
  currId.value = id
  currCourseId.value = courseId
  fileModal.value!.open()
}
const onFileFinish = () => {
  fileModal.value!.close()
}
</script>
<style lang="scss" scoped>
</style>