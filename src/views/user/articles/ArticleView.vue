<template>
  <div class="view-main">
    <div class="search-bar">
      <span class="placeholder">想看谁的文章?</span>
      <SearchInput @search="search" />
    </div>
    <ul class="courses flex">
      <li :class="{ 'p': true, 'active': selectedCourseId === null }" @click="selectCourse(null)">全部</li>
      <li
        :class="{ 'p': true, 'active': selectedCourseId === item.courseName }"
        v-for="(item) in store.state.user.allCourses"
        @click="selectCourse(item.courseName)"
        :key="item.id"
      >
        <Logo :course-name="item.courseName" />
        {{ item.courseName }}
      </li>
    </ul>
    <div class="_article">
      <Article :adminName="adminName" :courseName="selectedCourseId" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Article from '../../../components/articles/Articles.vue'
import { ref } from 'vue'
import SearchInput from '../../../components/search-input/SearchInput.vue'
import Logo from '../../../components/Logo.vue'
import { useStore } from '../../../store'

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
  padding: 5% 10%;
  box-sizing: border-box;
  background-color: #fff;

  .placeholder {
    font-weight: 100;
  }
}
.courses {
  padding: 0;
  margin: 0;
  background-color: #fff;

  li {
    padding: 10px 20px;
    font-size: 14px;

    &:hover {
      background-color: rgb(234, 240, 255);
    }

    &.active {
      background-color: rgb(211, 225, 255);
      color: blue;
    }
  }
}
._article {
  margin: 3% 10%;
}
</style>