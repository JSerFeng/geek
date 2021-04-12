<template lang="">
  <div class="big-file-uploader" ref="uploadArea">
    <h3>拖动到此或者点击上传文件</h3>
    <ul class="file-info">
      <li>文件名: {{ currentFile?.name }}</li>
      <li>总大小: {{ showFileSize(currentFile?.size) }}</li>
    </ul>
    <div v-if="preCheck === Flags.Pending">正在检查文件</div>
    <div v-else-if="preCheck === Flags.Fail">
      传输失败
      <GButton @click="retry" type="broke">重试</GButton>
    </div>
    <div v-else>
      <div class="progress-wrap">
        <div class="progress-bar" :style="{ width: progress * 100 + '%' }">
        </div>
      </div>
      <div class="progress-info">{{ done ? "已完成" : currentFile ? (progress * 100).toFixed(2) + '%' : "" }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { computed, defineProps } from "@vue/runtime-core";
import { useBigFileUpload } from "../../utils/bigFile";
import { Flags, useDropUpload, showFileSize } from "../../utils/shared";
import { GButton } from "../geek"
const props = defineProps<{
  courseId: number,
  id: number
}>()

const FILE_LIMIT = Math.pow(1024, 3) * 3

let currentFile = ref<File>()
const [preCheck, progress, upload] = useBigFileUpload(props.courseId, props.id)
const done = computed(() => progress.value >= 1)

/**拖动后上传 */
let retry = ref(() => { })
const uploadArea = useDropUpload(file => {
  currentFile.value = file
  return [file.size < FILE_LIMIT, "文件上传限制为 3GB，你可以: 出资加大服务器存储容量"]
}, (file) => {
  retry.value = upload(file)
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
  .progress-wrap {
    margin: 10px 0;
    position: relative;
    background-color: rgb(224, 224, 224);
    border-radius: 10px;
    height: 5px;
    width: 100%;

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