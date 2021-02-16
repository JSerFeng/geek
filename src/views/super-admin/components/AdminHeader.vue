<template>
     <div class="add-del-button">
      <el-button size="mini" icon="el-icon-plus" type="success" round>添加</el-button>
      <el-button size="mini" icon="el-icon-delete" type="danger" round>批量删除</el-button>
      <el-input
        placeholder="请输入用户名"
        v-model="searchInput"
        :style="{ width: '20%', marginLeft: '95vh', marginRight: '5vh' }"
        clearable
      >
      </el-input>
      <el-button @click="handleSearchAdmin" type="primary" icon="el-icon-search" circle></el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useSearchAdmin } from '../hooks/useSearchAdmin'
export default defineComponent({
    setup() {
     const { handleSearchAdmin, searchInput } = useSearchAdmin()
    return {
        handleSearchAdmin,
        searchInput
    }
    }
})
</script>