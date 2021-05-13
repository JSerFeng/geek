<template lang="">
  <div class="big-file-uploader">
    <h3 class="p" ref="uploadArea">拖动到此或者点击上传文件</h3>
    <ul class="file-info">
      <li>文件名: {{ currentFile?.name }}</li>
      <li>总大小: {{ showFileSize(currentFile?.size) }}</li>
    </ul>

    <div class="flex ac">
      <GButton @click="clickPause" :disabled="!ready">{{ btnText }}</GButton>
      <span class="progress-info">
      <span v-if="errMsg === '上传失败'">
        上传失败
        <GButton @click="() => { upload && upload() }" type="broke">重试</GButton>
      </span>
      <span v-else>
        {{ errMsg }}
      </span>
    </span>
    </div>
    
    <span class="info">准备进度: {{ Math.floor((progressSlice * 100)) + '%' }}</span>
    <div class="progress-wrap">
      <div class="progress-bar" :style="{ width: (progressSlice * 100).toFixed(2) + '%' }"></div>
    </div>
    <span class="info">上传进度: {{ Math.floor((progress * 100)) + '%' }}</span>
    
    <div class="progress-wrap">
      <div class="progress-bar" :style="{ width: (progress * 100).toFixed(2) + '%' }"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { computed, defineEmit, defineProps } from "@vue/runtime-core";
import { useBigFileUpload } from "../../utils/bigFile";
import { useDropUpload, showFileSize } from "../../utils/shared";
import { GButton } from "../geek"
const props = defineProps<{
  courseId?: number | null,
  id: number
}>()
const emits = defineEmit(["finish"])

const enum PauseState {
  Pause,
  Uploading,
  Pending,
}

const pauseState = ref<PauseState>(PauseState.Pending)
const btnText = computed(() => {
  switch (pauseState.value) {
    case PauseState.Pause:
      return "恢复"
    case PauseState.Uploading:
      return "暂停"
    case PauseState.Pending:
      return "开始上传"
  }
})

const clickPause = () => {
  if (pauseState.value === PauseState.Pending) {
    upload.value && upload.value()
    pauseState.value = PauseState.Uploading
  } else if (pauseState.value === PauseState.Pause) {
    pauseState.value = PauseState.Uploading
    resume()
  } else {
    pauseState.value = PauseState.Pause
    pause()
  }
}

const FILE_LIMIT = Math.pow(1024, 3) * 3

let currentFile = ref<File>()
const [errMsg, progressSlice, progress, readyUpload, pause, resume] = useBigFileUpload(
  props.id, props.courseId || undefined,
  (finish) => {
    emits("finish", finish)
  }
)
const ready = computed(() => progressSlice.value >= 1)

/**拖动后准备上传*/
let upload = ref<() => void>()
const uploadArea = useDropUpload(file => {
  currentFile.value = file
  pauseState.value = PauseState.Pending
  return [file.size < FILE_LIMIT, "文件上传限制为 3GB，你可以: 出资加大服务器存储容量"]
  /**实际上3个G在客户端单线程算切片worker算hash已经是究极杀内存了，瓶颈不止是服务器^ ^ */
}, async (file) => {
  const fn = await readyUpload(file)
  upload.value = fn
})
</script>
<style lang="scss" scoped>
.big-file-uploader {
  padding: 15px;
  box-sizing: border-box;
  background-color: #fff;
  width: 100%;
  height: 100%;
  box-shadow: 10px 0 30px rgb(216, 216, 216);
  ul {
    padding: 0;
  }
  h3 {
    font-weight: 100;
  }
  .file-info {
    font-size: 14px;
  }

  .info {
    font-size: 14px;
    font-weight: 200;
  }

  .progress-wrap {
    margin: 10px 0;
    position: relative;
    background-color: rgb(236, 236, 236);
    border-radius: 10px;
    height: 5px;
    width: 100%;
    overflow: hidden;

    .progress-bar {
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      background-color: rgb(178, 255, 147);
      transition: 0.2s;
    }
  }

  .progress-info {
    font-weight: 100;
    font-size: 14px;
  }
}
</style>