<template>
  <div class="table">
    <el-table
      size="mini"
      :fit="true"
      ref="multipleTable"
      :data="tableData.data"
      tooltip-effect="dark"
      :style="{ width: '90%', margin: 'auto', borderRadius: '30px' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="ID">
        <template #default="scope">{{ scope.row.adminId }}</template>
      </el-table-column>
      <el-table-column prop="adminName" label="姓名"> </el-table-column>
      <el-table-column prop="courseName" label="方向" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="registerTime"
        label="注册时间"
        show-overflow-tooltip
      >
        <template #default="scope">{{
          getTime(scope.row.registerTime)
        }}</template>
      </el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <template #default="scope">
          <el-tooltip content="编辑该用户" placement="top" effect="light">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleEditAdmin(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="删除该用户" placement="top" effect="light">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deAdmin(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑管理员"
      v-model="dialogVisible"
      width="45%"
      :before-close="handleClose"
    >
      <ad-form :rowInfo="rowInfo" ref="adFormRef" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRequestAdminList } from "../hooks/useRequestAdminList";
import { getRegistTime } from "../../../utils/shared";
import AdForm from "../../../components/ad-form/AdForm.vue";
import { useDeleteAdmins } from "../hooks/useDeleteAdmins";
import { useEditAdmin } from "../hooks/useEditAdmin";
export default defineComponent({
  components: { AdForm },
  setup() {
    let multipleTable = ref<any>(null);
    let multipleSelection: string[] = [];
    const getTime = getRegistTime;
    const { tableData } = useRequestAdminList();
    const {
      handleConfirmEdit,
      handleEditAdmin,
      rowInfo,
      dialogVisible,
      adFormRef,
      handleClose,
    } = useEditAdmin();
    const { handleSelectionChange, deAdmin } = useDeleteAdmins();
    return {
      handleSelectionChange,
      tableData,
      multipleTable,
      multipleSelection,
      getTime,
      handleEditAdmin,
      dialogVisible,
      handleClose,
      adFormRef,
      rowInfo,
      handleConfirmEdit,
      deAdmin,
    };
  },
  conponents: {
    AdForm,
  },
});
</script>

<style lang="scss">
.table {
  background-color: rgba($color: #fff, $alpha: 1);
  border-radius: 50px;
  text-align: center;
}
</style>