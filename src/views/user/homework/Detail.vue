<template lang="">
  <div class="detail">
    <h4 class="title">{{ (info && info.taskName) || "" }}</h4>
    <p class="task-name">作业文件</p>
    <ul class="flex ac list">
      <li
      class="p file" 
      v-for="(file, idx) in (info && info.taskFileVOList) || []" 
      :key="idx"
      @click="download(file.filePath, file.fileName)"
      >
        <div class="file-item">
          {{ file.fileName }}
          <div class="el-icon-download">
        </div>
        </div>
      </li>
    </ul>

    <p class="task-name">
      提交记录
      <template v-if="userRecord">
        <i class="del-btn el-icon-close" @click="deleteRecord(info?.id || null)"></i>
      </template>
    </p>
    <div v-if="!userRecord">
      <span style="font-size: 14px;">无记录</span>
    </div>
    <ul class="flex ac list">
      <li
        class="file flex ac" 
        v-for="(item) in userRecord?.workFileVOList || []"
      >
        <div class="file-item">
          <span @click="download(item.filePath, item.fileName)">{{ item.fileName }}</span>
        </div>
        <i class="del-btn el-icon-close" @click="deleteOneFile(item.id)"></i>
      </li>
    </ul>
    <div>
      <div ref="uploadBtn" class="drop-file p">选择文件</div>
      <ul class="file-desc">
        <li v-for="(file) in currFile">
          {{ file.file.name }} {{ showFileSize(file.file.size) }}
          <div class="progress-wrap">
            <div class="progress-bar" :style="{ 'width': file.progress * 100 + '%' }"></div>
          </div>
        </li>
      </ul>
      <GButton 
      type="broke" @click="uploadImpl"
      :disabled="!!info?.isClosed"
      >新提交</GButton>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, watchEffect } from "vue";
import { apiDelHomeworkFile, apiUploadHomework, download } from "../../../api/file";
import { apiDeleteRecord, apiUploadHomeworkRecord } from "../../../api/homework"
import { apiQueryOneWork } from "../../../api/homework";
import { ErrorCode } from "../../../api/request";
import { ElMessageBox, ElNotification } from "element-plus"
import { showFileSize, useDropUpload } from "../../../utils/shared";
import { GButton } from '../../../components/geek'

const props = defineProps<{
  userId: string,
  courseId: number,
  info?: {
    id: number;
    courseId: number;
    taskName: string;
    addTime: string;
    closeTime: string;
    isClosed: number;
    taskFileVOList: {
      fileName: string;
      filePath: string;
      addTime: string;
    }[];
  }
}>()

const userRecord = ref<null | {
  "id": number,
  "taskId": number,
  "courseId": number,
  "userId": number,
  "addTime": string,
  "score": number,
  "workFileVOList": {
    "id": number,
    "fileName": string,
    "filePath": string,
    "addTime": string
  }[]
}>(null)
const query = async () => {
  currFile.value = []
  if (!props.info) return
  const res = await apiQueryOneWork(props.userId, props.info.id)
  if (res.error_code !== ErrorCode.Success) {
    userRecord.value = null
    return
  }
  userRecord.value = res.data as any
}

const deleteOneFile = async (id: number) => {
  if (!id) return
  ElMessageBox.confirm("删除不可逆，确认删除吗?", {
    cancelButtonText: "取消",
    confirmButtonText: "确定",
    async callback(action: string) {
      if (action === "confirm") {
        const res = await apiDelHomeworkFile(id.toString(), props.userId)
        if (res.error_code === ErrorCode.Success) {
          const idx = userRecord.value!.workFileVOList.findIndex(item => item.id === id)
          userRecord.value!.workFileVOList.splice(idx, 1)
          query()
        }
      }
    }
  })
}

const deleteRecord = (id: number | null) => {
  if (!id || !userRecord.value) return

  ElMessageBox.confirm("删除不可逆，确认删除吗?", {
    cancelButtonText: "取消",
    confirmButtonText: "确定",
    async callback(action: string) {
      if (action === "confirm") {
        const res = await apiDeleteRecord(props.userId, id)
        if (res.error_code === ErrorCode.Success) {
          userRecord.value = null
          query()
        }
      }
    }
  })
}

const currFile = ref<{ file: File, progress: number }[]>([])
const uploadBtn = useDropUpload(
  file => {
    if (currFile.value.findIndex(f => f.file.name === file.name && f.file.size === file.size) !== -1) {
      return [false, "不能重复文件"]
    }
    const isValid = file.size < 1024 * 1024 * 3
    if (isValid) {
      currFile.value.push({
        file,
        progress: 0
      })
    }
    return [isValid, "作业不超过3M"]
  }
)
const uploadImpl = async () => {
  if (!currFile.value.length) {
    ElNotification({
      message: "请稍等"
    })
    return
  }
  if (!props.info) {
    ElNotification({
      message: "请稍等"
    })
    return
  }
  let res = await apiUploadHomeworkRecord(props.info.id, props.courseId, props.userId)
  if (res.error_code !== ErrorCode.Success) {
    return
  }
  const uploadRequests = currFile.value.map(item => apiUploadHomework(
    res.data.toString(),
    item.file,
    e => {
      item.progress = e.loaded / e.total
    }
  ).then(res => {
    if (res.error_code !== ErrorCode.Success) {
      throw res
    }
    return res
  }))

  try {
    await Promise.all(uploadRequests)
    query()
  } catch (res) {
    /**不用做处理，提示报错在request.ts中 */
  }
}

watchEffect(() => {
  query()
})
</script>
<style lang="scss" scoped>
.detail {
  .title {
    font-weight: 100;
  }

  .task-name {
    font-size: 14px;
    font-size: 14px;
    font-weight: 100;
  }

  .list {
    margin: 15px;
    .file {
      margin: 0 15px;
      font-size: 14px;
      font-weight: 100;

      .time {
        font-size: 12px;
        color: rgb(173, 173, 173);
      }
    }
  }
  .file-item {
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .del-btn {
    cursor: pointer;
    &:hover {
      color: red;
    }
  }

  .file-desc {
    font-size: 12px;
    color: rgb(136, 136, 136);
  }

  .drop-file {
    font-size: 16px;
    font-weight: 100;
    border: 1px dashed rgb(194, 194, 194);
    padding: 1em;
    width: fit-content;
  }

  .progress-wrap {
    width: 100%;
    position: relative;
    height: 3px;
    border-radius: 10px;
    overflow: hidden;
    background-color: rgb(212, 212, 212);

    .progress-bar {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background-color: rgb(153, 255, 167);
    }
  }
}
</style>