<template>
  <div class="super-admin-header">
    <h1 class="super-title"> ~ Hello
      <span
        >{{ superAdminName }}
        <router-link to="/home"><div class="to-home">
          <div class="header"><img :src="avatar" alt=""></div>
          <div class="body">我 的 主 页</div></div
      ></router-link>
        </span>
      ^O^ ~</h1>
    <div class="add-del-button">
      <el-button
        size="mini"
        icon="el-icon-plus"
        type="success"
        round
        @click="dialogVisible = true"
        >添加</el-button
      >
      <el-button
        size="mini"
        icon="el-icon-delete"
        type="danger"
        round
        @click="handleDeleteAdmins"
        >批量删除</el-button
      >
    </div>
    <el-dialog
      title="添加一个管理员"
      v-model="dialogVisible"
      width="45%"
      :before-close="handleClose"
    >
      <ad-form ref="adForm" />
      <template #footer>
        <span class="dialog-footer">
          <el-button round @click="dialogVisible = false">取 消</el-button>
          <el-button
            round
            type="primary"
            @click="handleConfirm"
            :disabled="isConfirm"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AdForm from "../../../components/ad-form/AdForm.vue";
import { useBlueCkeck } from "../../../components/ad-form/hooks/useBlurCheck";
import { Props } from "../../../components/ad-form/hooks/useBlurCheck";
import { storage } from "../../../utils/shared";
import { useConfirmHook } from "../hooks/useConfirm";
import { useDeleteAdmins } from "../hooks/useDeleteAdmins";
export default defineComponent({
  setup() {
const superAdminName = storage.get('adminName')
const avatar = storage.get('image')
    // 元素的ref
    let idRef = ref<null | HTMLInputElement>(null);
    let nameRef = ref<null | HTMLInputElement>(null);
    let pasRef = ref<null | HTMLInputElement>(null);
    let dirRef = ref<null | HTMLInputElement>(null);
    let { isConfirm } = useBlueCkeck<Props>({
      idRef,
      nameRef,
      pasRef,
      dirRef,
    });
    const {
      handleClose,
      handleConfirm,
      adForm,
      dialogVisible,
    } = useConfirmHook();
    const { handleDeleteAdmins } = useDeleteAdmins();
    return {
      isConfirm,
      dialogVisible,
      handleClose,
      handleConfirm,
      adForm,
      handleDeleteAdmins,
      superAdminName,
      avatar
    };
  },
  components: {
    AdForm,
  },
});
</script>

<style lang="scss">
.super-admin-header {
  .to-home {
    width: 180px;
    height: 180px;
    z-index: 1000;
    background-color: #EEF1EF;
    display: none;
    border-radius: 20px;
      box-shadow: 0 0 20px #CECECE;
    &:hover{
      cursor: pointer;
    }
    .body{
      font-size: 15px;
      padding-top: 2vh;
      color: #331723;
    }
    img{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      transition: all .5s;
      border: 1px solid #EEF1EF;
      box-shadow: 0 0 10px #CECECE;
      margin-top: 3vh;
      &:hover{
        transform: scale(1.3);
      }
    }
  }
  .super-title {
    width: 70%;
    text-align: center;
    margin: 5vh auto 3vh auto;
    color: #CECECE;
      span {
      position: relative;
    color: #CECECE;

      &:hover .to-home {
        display: inline-block;
        position: absolute;
        left: 0%;
        top: 100%;

      }
    }
  }
}
</style>