<template>
    <el-pagination
      class="pagenation-box"
      layout="prev, pager, next"
      :total="tableData.total"
      @current-change="handlePagenationChange"
    >
    </el-pagination>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePagenationChange } from '../hooks/usePagenationChange'
import { useRequestAdminList } from '../hooks/useRequestAdminList'
export default defineComponent({
     setup() {
    const { handlePagenationChange } = usePagenationChange()
    const { tableData } = useRequestAdminList()
    return {
      handlePagenationChange,
      tableData
    };
  },
})
</script>