<template>
  <div class="super-admin-header">
    <h1 class="title">管理员管理</h1>
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
import { useConfirmHook } from "../hooks/useConfirm";
import { useDeleteAdmins } from "../hooks/useDeleteAdmins";
export default defineComponent({
  setup() {
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
    };
  },
  components: {
    AdForm,
  },
});
</script>

<style lang="scss">
.super-admin-header {
  .title {
    width: 50%;
    text-align: center;
    margin: -5vh auto 5vh auto;
  }
}
</style>