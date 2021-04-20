<template >
  <div class="article">
      <h1 class="title">我的发布</h1>
      <router-link to='/admin'><ad-beacon title="招生管理" boxStyle="left"/></router-link>
      <router-link to='/admin'><ad-beacon title="所有发布" boxStyle="right"/></router-link>
      <router-link to='/admin'><ad-beacon title="我的收藏" :top="23" boxStyle="right"/></router-link>
    <div class="article-manage">
      <ul class="article-list">
        <div class="header">
          <div>标题</div>
          <div>点赞数</div>
          <div>点赞</div>
          <div>收藏</div>
          <div>操作</div>
        </div>
        <li :key="item" v-for="(item, index) in myArticles">
          <div class="index">{{ index }}</div>
          <div class="content">
            <div>{{ item.title }}</div>
            <div>{{ item.likeCount }}</div>
            <div>{{ item.likeStatus }}</div>
            <div>{{ item.favoriteStatus }}</div>
            <div
              @click="handleDeleteArticle(item.id)"
              class="el-icon-delete"
            ></div>
          </div>
        </li>
      </ul>
      <el-pagination
        @current-change="handlePaginationChange"
        class="article-pagination"
        layout="prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
    <div class="publish-artivle" @click="publishDialogVisible = true">
      发布文章
    </div>
    <el-dialog v-model="publishDialogVisible" width="50%">
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="publishDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handlePublishArticle"
            >确 定</el-button
          >
        </span>
      </template>
      <el-input v-model="title" placeholder="请输入内容"></el-input>
      <el-input
        type="textarea"
        class="course-input"
        :rows="10"
        placeholder="请输入文章内容"
        v-model="content"
      >
      </el-input>
      <el-select
        class="course-select"
        v-model="courseRadio"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, readonly, ref } from "vue";
import {
  getMyPublishedArticle,
  publishArticle,
  deleteMyArticle,
} from "../../api/index";
import { storage, deleteArticleById } from "../../utils/shared";
import { ElDialog, ElMessage, ElMessageBox } from "element-plus";
import AdBeacon from '../../components/ad-beacon/AdBeacon.vue'
export interface Article {
  addTime: string;
  adminId: null | string;
  adminName: null | string;
  articleFileVOList: null | any[];
  articleType: string;
  content: string;
  courseName: null | string;
  favoriteStatus: number;
  id: number;
  image: null | string;
  likeCount: number;
  likeStatus: number;
  title: string;
}
export default defineComponent({
  components: {
    ElDialog,
    AdBeacon
  },
  setup() {
    const adminId = storage.get("adminId");
    const myArticles = ref<Article[]>([]);
    const total = ref<number>(0);
    const publishDialogVisible = ref<boolean>(false);
    const title = ref<string>("");
    const content = ref<string>("");
    const courseRadio = ref<1 | 2 | 3 | 4>(1);
    const articleId = ref<number>();
    async function handlePaginationChange(index: number) {
      const result = await getMyPublishedArticle(index, 10, adminId);
      myArticles.value = result.data.items;
      total.value = result.data.total;
    }
    async function handlePublishArticle() {
      const result = await publishArticle(
        adminId,
        "word",
        title.value,
        courseRadio.value,
        content.value
      );
      console.log(result);
      if (result.error_code === 200) {
        articleId.value = result.data;
        myArticles.value.push({
          addTime: "",
          adminId: adminId,
          adminName: null,
          articleFileVOList: null,
          articleType: "word",
          content: content.value,
          courseName: "",
          favoriteStatus: 0,
          id: articleId.value!,
          image: null,
          likeCount: 0,
          likeStatus: 0,
          title: title.value,
        });
        ElMessage({
          type: "success",
          message: "发布成功！",
        });
        publishDialogVisible.value = false;
      } else {
        ElMessage({
          type: "error",
          message: "网络错我！",
        });
      }
    }
    async function handleDeleteArticle(id: number) {
      const result = await deleteMyArticle(id, adminId);
      if (result.error_code === 200) {
        ElMessageBox.confirm("此操作将永久删除该文章, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            deleteArticleById(id, myArticles.value);
            ElMessage({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            ElMessage({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        ElMessage({
          type: "error",
          message: "网络错误！",
        });
      }
    }
    const options = readonly([
      {
        value: 1,
        label: "前端",
      },
      {
        value: 2,
        label: "后端",
      },
      {
        value: 3,
        label: "移动",
      },
      {
        value: 4,
        label: "Python",
      },
    ]);
    onMounted(async () => {
      const result = await getMyPublishedArticle(1, 10, adminId);
      myArticles.value = result.data.items;
      total.value = result.data.total;
    });
    return {
      myArticles,
      total,
      handlePaginationChange,
      publishDialogVisible,
      handlePublishArticle,
      title,
      content,
      options,
      courseRadio,
      handleDeleteArticle,
    };
  },
});
</script>
<style lang="scss" scoped>
.article {
    .title{
        width: 400px;
        margin: 20px auto -35px auto;
        text-align: center;
        color: white;
    }
  .course-select {
    margin-top: 10px;
    margin-bottom: -10px;
  }
  .course-input {
    margin-top: 10px;
  }
  .article-manage {
    background-color: rgba($color: #fff, $alpha: 0.5);
    width: 60%;
    margin: 10vh auto;
    border: 1px solid #cecece;
    height: 600px;
    box-shadow: -1px -1px 3px #ffffff, 1.5px 1.5px 3px rgba(174, 174, 192, 0.4);
    border-radius: 50px;
    .article-pagination {
      display: block;
      width: 50%;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 82%;
      transform: translate(-50%);
    }
    .article-list {
      width: 90%;
      margin: 0 auto;
      padding: 0;
      padding-top: 20px;
      .header {
        margin-left: 2.5vw;
        display: flex;
        margin-bottom: 10px;
        div {
          text-align: center;
          width: 10vw;
        }
      }
      li {
        line-height: 40px;
        background-color: #CECECE;
        border-radius: 10px;
        display: flex;
        margin-bottom: 10px;
        &:hover {
          background-color: #dddddd;
        }
        .index {
          width: 40px;
          color: white;
          height: 40px;
          background-color: #404f60;
          text-align: center;
          border-radius: 10px 0 0 10px;
        }
        .content {
          display: flex;
          div {
            width: 10vw;
            text-align: center;
          }
          .el-icon-delete {
            line-height: 5vh;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .publish-artivle {
    width: 50vh;
    height: 50px;
    background-color: white;
    margin: -60px auto 10px auto;
    text-align: center;
    font-size: 20px;
    font-family: Helvetica, "PingFang SC", "Microsoft Yahei", sans-serif;
    line-height: 50px;
    box-shadow: -10px -10px 30px #ffffff,
      10px 10px 30px rgba(174, 174, 192, 0.4);
    border-radius: 40vh;
    transition: all 0.5s;
    &:hover {
      transform: scale(1.1);
      cursor: pointer;
    }
  }
}
</style>