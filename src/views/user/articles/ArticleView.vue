<template>
  <div class="view-main">
    <div class="search-bar">
      <div class="placeholder">按用户名搜索</div>
      <div style="width: 40%;margin: 0 auto;">
        <SearchInput @search="search" />
      </div>
    </div>
    <ul class="courses flex jc ac">
      <li :class="{ 'p': true, 'active': selectedCourseId === null }" @click="selectCourse(null)">全部</li>
      <li
        :class="['p', { active: selectedCourseId === item.courseName }]"
        v-for="(item) in store.state.user.allCourses"
        @click="selectCourse(item.courseName)"
        :key="item.id"
      >
        <div style="text-align: center;" :title="item.courseName">
          <Logo class="logo" :course-name="item.courseName" />
        </div>
      </li>
    </ul>
    <div class="article">
      <ArticlesVue :adminName="adminName" :courseName="selectedCourseId" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import SearchInput from '../../../components/search-input/SearchInput.vue'
import Logo from '../../../components/Logo.vue'
import { useStore } from '../../../store'
import ArticlesVue from '../../../components/articles/Articles.vue'

const store = useStore()

const selectedCourseId = ref<null | string>(null)

const adminName = ref("")
const search = (val: string) => {
  adminName.value = val
}

const selectCourse = (id: string | null) => {
  if (selectedCourseId.value === id) {
    selectedCourseId.value = null
  } else {
    selectedCourseId.value = id
  }
}
</script>
<style lang="scss" scoped>
.view-main {
  background-color: transparent;
}
.search-bar {
  padding: 3%;
  box-sizing: border-box;
  background-color: #fff;

  .placeholder {
    font-weight: 100;
    text-align: center;
    margin: 0 auto;
  }
}
.courses {
  padding: 0;
  margin: 0;
  background-color: #fff;
  overflow: auto;
  height: 50px;

  li {
    padding: 2%;
    font-size: 14px;
    border-bottom: 5px solid #fff;

    .logo {
      font-size: 30px;
    }

    &:hover {
      background-color: rgb(234, 240, 255);
    }

    &.active {
      border-bottom: 5px solid rgb(167, 167, 167);
    }
  }
}
.article {
  margin: 3% 10%;
  @media screen and (max-width: 768px) {
    margin: 0;
  }
}
</style>