<template>
  <ul class="homework-detail">
    <router-link to="/checkTask"
      ><AdBeacon title="作业管理"
    /></router-link>
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
    <li>
      <ul class="files">
        <li class="file-title">任务附件 :</li>
        <li
          class="file-name"
          :key="item.fileName"
          v-for="item in homeworkFileList"
        >
          <a class="file-a" :href="item.filePath">{{ item.fileName }}</a>
        </li>
      </ul>
    </li>
    <ul class="download-file">
      <li @click="handleDownloadFiles" class="download-homework">作业 :</li>
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
import {
  getDetailHomeworkInfo,
  downloadAllStudentsFiles,
  closeHomeworkSubmit,
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
} from "element-plus";
import { DetailInfo, Person } from "../../store/modules/admin/state";
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
  },
  setup() {
    // 这里会传入题目的id，用Route来获取id
    const Route = useRoute();
    const Store = useStore();
    const homeworkFileList = ref<File[]>([]);
    const personList = ref<DetailInfo<Person, File>>();
    const taskId = (Route.params.id as any) as number;
    const downloadFileUrl = ref<string>("");
    const { handleMarkScore } = useMarkScore();
    const { comPersonList, handlePaginationChange, total } = useHomeworkTable();
    let fun
    async function handleDownloadFiles() {
      const result = await downloadAllStudentsFiles(taskId);
      /*TODO*/
      downloadFileUrl.value = result.data.data;
    }
    function handleCloseHomework() {
      ElMessageBox.confirm("此操作将关闭此作业的提交通道, 是否继续?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 传入作业id和adminId
          const result = await closeHomeworkSubmit({ taskId });
          if (result.status === 200) {
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
    onMounted(async () => {
      const result = await getDetailHomeworkInfo(taskId, 1, 5);
      total.value = computed(
        () => result.data.data.totalPage * result.data.data.rows
      ).value;
      personList.value = comPersonList(result);
      console.log(personList.value)
      homeworkFileList.value = Store.state.homework.currentFiles;
      useDiagram(taskId);
    });
    return {
      homeworkFileList,
      personList,
      total,
      handlePaginationChange,
      handleDownloadFiles,
      handleMarkScore,
      downloadFileUrl,
      handleCloseHomework,
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
@media screen and (max-width: 799px) {
  #diagram {
    text-align: center;
    width: 48vh;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 800px;
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
@media screen and (max-width: 799px) {
  .homework-file {
    width: 20vh;
    display: inline;
    font-size: 12px !important;
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
      margin-top: -5vh;
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
      margin-top: -5vh;
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