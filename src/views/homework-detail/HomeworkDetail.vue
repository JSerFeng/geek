<template>
  <ul class="homework-detail">
    <router-link to="/checkTask"><AdBeacon title="作业管理" /></router-link>
    <li class="title">作业提交详情</li>
    <li class="table">
      <el-table :data="personList" style="width: 90%; margin: 0 auto">
        <el-table-column type="expand">
          <template #default="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="附件">
                <span
                  class="homework-file"
                  :key="file.filePath"
                  v-for="file in props.row.workFileVOList"
                >
                  <a style="color: #24acf2" :href="file.filePath">{{
                    file.fileName
                  }}</a>
                </span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="userName"> </el-table-column>
        <el-table-column label="学号" prop="userId"> </el-table-column>
        <el-table-column label="分数" prop="score"> </el-table-column>
        <el-table-column label="操作" prop="desc">
          <template #default="props">
            <ElButton
              size="mini"
              round
              @click="handleMarkScore(props.row.id, props.row)"
              >打分</ElButton
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handlePaginationChange"
        class="pagination-style"
        layout="prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </li>
    <li id="diagram"></li>
    <div @click="handleCloseHomework" class="close-homework">关闭</div>
    <div class="upload-homework-file">
      <input type="file" @change="handleUploadHomeworkFiles" />上传附件
    </div>
    <li>
      <ul class="files">
        <li class="file-title">任务附件 :</li>
        <li
          class="file-name"
          :key="item.fileName"
          v-for="item in homeworkFileList"
        >
          <el-tag
            @close="handleDeleteTaskFile(item.fileName)"
            :key="item.fileName"
            closable
          >
            <a class="file-a" :href="item.filePath">{{ item.fileName }}</a>
          </el-tag>
        </li>
      </ul>
    </li>
    <ul class="download-file">
      <li  class="download-homework">作业 :</li>
      <a class="download-file-start" :href="downloadFileUrl"
        >点击下载所有作业</a
      >
    </ul>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, toRaw } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "../../store/index";
import useMarkScore from "./hooks/useMarkScore";
import useHomeworkTable from "./hooks/useHomeworkTable";
import AdBeacon from "../../components/ad-beacon/AdBeacon.vue";
import useDiagram from "./hooks/useDiagram";
import { MutationTypes } from "../../store/modules/admin/mutation";
import {
  getDetailHomeworkInfo,
  downloadAllStudentsFiles,
  closeHomeworkSubmit,
  adminTaskFileUpload,
  adminDeleteTaskById,
} from "../../api/index";
import {
  ElTable,
  ElTableColumn,
  ElForm,
  ElFormItem,
  ElPagination,
  ElButton,
  ElMessageBox,
  ElMessage,
  ElTag,
} from "element-plus";
import { DetailInfo, Person } from "../../store/modules/admin/state";
import { storage } from "../../utils/shared";
export interface File {
  addTime: string;
  fileName: string;
  filePath: string;
}

export default defineComponent({
  components: {
    ElTable,
    ElTableColumn,
    ElForm,
    ElFormItem,
    ElPagination,
    ElButton,
    AdBeacon,
    ElTag,
  },
  setup() {
    // 这里会传入题目的id，用Route来获取id
    const Route = useRoute();
    const Store = useStore();
    const homeworkFileList = ref<File[]>([]);
    const personList = ref<DetailInfo<Person, File>>();
    const taskId = (Route.params.id as any) as number;
    const adminId = storage.get('adminId') as string
    const downloadFileUrl = ref<string>("");
    const { handleMarkScore } = useMarkScore();
    const { comPersonList, handlePaginationChange, total } = useHomeworkTable();
    function handleCloseHomework() {
      ElMessageBox.confirm("此操作将关闭此作业的提交通道, 是否继续?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 传入作业id和adminId
          const result = await closeHomeworkSubmit({ id:taskId, adminId }) as any
          console.log(result)
          if (result.error_code === 200) {
            ElMessage({
              type: "success",
              message: "关闭成功！",
            });
          } else {
            ElMessage({
              type: "error",
              message: "网络错误！",
            });
          }
        })
        .catch(() => {
          ElMessage({
            type: "warning",
            message: "取消关闭",
          });
        });
    }
    async function handleUploadHomeworkFiles(e: any) {
      const result = await adminTaskFileUpload(taskId, e.target.files[0]);
      console.log(result)
      if (result.error_code === 200) {
        const fileName = e.target.files[0].name;
        Store.commit({
          type: `${MutationTypes.uploadFile}`,
          payload: {
            fileName,
            addTime: new Date(),
            filePath: "",
          },
        });
        ElMessage({
          type: "success",
          message: "附件上传成功！",
        });
      } else {
        ElMessage({
          type: "error",
          message: "上传失败！",
        });
      }
    }
    async function handleDeleteTaskFile(fileName: string) {
      ElMessageBox.confirm("此操作将删除这个附件, 是否继续?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 传入taskId， 和adminId--> 登录之后获取
          const result = await adminDeleteTaskById(taskId, adminId);
          console.log(result)
          if (result.error_code == 200) {
            Store.commit({
              type: `${MutationTypes.deleteFile}`,
              payload: fileName,
            });
            ElMessage({
              type: "success",
              message: "删除成功！",
            });
          } else {
            ElMessage({
              type: "error",
              message: "网咯错误！",
            });
          }
        })
        .catch((err) => {
          ElMessage({
            type: "warning",
            message: err,
          });
        });
    }
    onMounted(async () => {
      const result = await getDetailHomeworkInfo(taskId, 1, 5);
      total.value = computed(
        () => result.data.total
      ).value;
      personList.value = comPersonList(result);
      homeworkFileList.value = Store.state.homework.currentFiles;
      useDiagram(taskId);
      // 下载附件
      const download = await downloadAllStudentsFiles(taskId);
      /*TODO*/
      downloadFileUrl.value = download.data;
    });
    return {
      homeworkFileList,
      personList,
      total,
      handlePaginationChange,
      handleMarkScore,
      downloadFileUrl,
      handleCloseHomework,
      handleUploadHomeworkFiles,
      handleDeleteTaskFile,
    };
  },
});
</script>
<style lang="scss">
@media screen and (min-width: 800px) {
  #diagram {
    text-align: center;
    width: 48vh;
    position: absolute;
    left: 75%;
    top: 113px;
    height: 45vh;
  }
}
@media screen and (min-width: 800px) {
  .pagination-style {
    position: absolute;
    left: 50%;
    top: 89%;
    transform: translateX(-50%);
  }
}
.demo-table-expand {
  height: 20px;
  margin-top: -20px;
}

@media screen and (min-width: 800px) {
  .homework-file {
    width: 20vh;
    display: inline-block;
    font-size: 12px;
    line-height: 1vh;
  }
}
.homework-detail {
  .el-form-item__content {
    display: flex;
    color: black !important;
  }
  position: relative;
  .title {
    font-size: 30px;
    font-weight: 600;
    width: 100%;
    text-align: center;
  }

  @media screen and (max-width: 799px) {
    .close-homework {
      position: relative;
      transform: translateX(-50%);
      left: 50%;
      top: 65vh;
      width: 60%;
      line-height: 5vh;
      border: 2vh solid red;
      text-align: center;
      border-radius: 4vh;
      cursor: pointer;
      box-shadow: 0 0 1vh red;
      background-color: red;
      color: white;
      &:hover {
        color: black;
      }
    }

    .table {
      width: 80%;
      border: 1px solid #cecece;
      height: 80vh;
      position: relative;
      margin: 5% 0 5vh 10%;
      box-shadow: -1px -1px 3px #ffffff,
        1.5px 1.5px 3px rgba(174, 174, 192, 0.4);
    }
    .files {
      margin-left: 15vh;
      margin-top: -15vh;
      .file-title {
        font-size: 14px;
        width: 10vh;
        font-weight: 600;
        color: black;
        margin-right: 10vh;
        margin-left: -10vh;
      }
      .file-name {
        margin: 0 0vh;
        font-size: 12px;
        .file-a {
          color: #24acf2;
          width: 20vh;
          overflow: hidden;
          height: 1vh;
          line-height: 1vh;
          text-overflow: ellipsis;
        }
      }
      li {
        line-height: 10vh;
      }
      display: flex;
    }
  }
  @media screen and (min-width: 800px) {
    .close-homework {
      position: relative;
      left: 82%;
      top: -40vh;
      width: 15vh;
      line-height: 5vh;
      border: 2vh solid red;
      text-align: center;
      border-radius: 4vh;
      cursor: pointer;
      box-shadow: 0 0 1vh red;
      background-color: red;
      color: white;
      &:hover {
        color: black;
      }
    }
    .upload-homework-file {
      input {
        opacity: 0;
        position: absolute;
      }
      position: relative;
      color: white;
      left: 82%;
      top: -35vh;
      width: 15vh;
      line-height: 5vh;
      border: 2vh solid #5470c6;
      text-align: center;
      border-radius: 4vh;
      cursor: pointer;
      box-shadow: 0 0 1vh #5470c6;
      background-color: #5470c6;
      color: white;
      &:hover {
        color: black;
      }
    }
    .table {
      width: 60%;
      border: 1px solid #cecece;
      height: 80vh;
      position: relative;
      margin: 5% 0 5vh 10%;
      box-shadow: -1px -1px 3px #ffffff,
        1.5px 1.5px 3px rgba(174, 174, 192, 0.4);
    }
    .files {
      margin-left: 15vh;
      margin-top: -20vh;
      .file-title {
        font-size: 20px;
        font-weight: 600;
        color: black;
        margin-right: 10vh;
      }
      .file-name {
        margin: 0 5vh;
        .file-a {
          color: #24acf2;
          width: 20vh;
          overflow: hidden;
          height: 1vh;
          line-height: 1vh;
          text-overflow: ellipsis;
        }
      }
      li {
        line-height: 10vh;
      }
      display: flex;
    }
  }
  .download-file {
    display: flex;
    @media screen and (min-width: 800px) {
      .download-homework {
        font-size: 20px;
        font-weight: 600;
        color: black;
        margin-left: 15vh;
      }
    }
    @media screen and (max-width: 799px) {
      .download-homework {
        font-size: 14px;
        font-weight: 600;
        color: black;
        margin-left: 5vh;
      }
    }
    @media screen and (min-width: 800px) {
      .download-file-start {
        color: #24acf2;
        line-height: 4vh;
        margin-left: 20vh;
      }
    }
    @media screen and (max-width: 799px) {
      .download-file-start {
        color: #24acf2;
        font-size: 12px;
        line-height: vh;
        margin-left: 20vh;
      }
    }
  }
}
</style>