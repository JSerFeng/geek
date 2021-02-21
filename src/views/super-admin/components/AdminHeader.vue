<template>
  <div class="add-del-button">
    <el-button
      size="mini"
      icon="el-icon-plus"
      type="success"
      round
      @click="dialogVisible = true"
      >添加</el-button
    >
    <el-button size="mini" icon="el-icon-delete" type="danger" round
      >批量删除</el-button
    >
    <el-input
      placeholder="请输入用户名"
      v-model="searchInput"
      :style="{ width: '20%', marginLeft: '95vh', marginRight: '5vh' }"
      clearable
    >
    </el-input>
    <el-button
      @click="handleSearchAdmin"
      type="primary"
      icon="el-icon-search"
      circle
    ></el-button>
  </div>
  <el-dialog
    title="添加一个管理员"
    v-model="dialogVisible"
    width="45%"
    :before-close="handleClose"
  >
    <ad-form />
    <template #footer>
      <span class="dialog-footer">
        <el-button round @click="dialogVisible = false">取 消</el-button>
        <el-button
          round
          type="primary"
          @click="dialogVisible = false"
          :disabled="isConfirm"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, toRaw, ref, watch, Ref, watchEffect } from "vue";
import { useSearchAdmin } from "../hooks/useSearchAdmin";
import AdForm from "../../../components/ad-form/AdForm.vue";
import { useBlueCkeck } from "../../../components/ad-form/hooks/useBlueCheck";
import { Props } from "../../../components/ad-form/hooks/useBlueCheck";
export default defineComponent({
  setup() {
    let dialogVisible = ref<boolean>(false) as Ref<boolean>
    const { handleSearchAdmin, searchInput } = useSearchAdmin();
    // 元素的ref
    let idRef = ref<null | HTMLInputElement>(null);
    let nameRef = ref<null | HTMLInputElement>(null);
    let pasRef = ref<null | HTMLInputElement>(null);
    let dirRef = ref<null | HTMLInputElement>(null);
    let { isConfirm } = useBlueCkeck<Props>({ idRef, nameRef, pasRef, dirRef });
    function handleClose(done: () => void) {
      done();
    }
    watchEffect(() => {
      console.log(toRaw(isConfirm.value));
    });
    return {
      handleSearchAdmin,
      searchInput,
      isConfirm,
      dialogVisible,
      handleClose
    };
  },
  components: {
    AdForm,
  },
});
</script>

<style lang="scss">
</style>