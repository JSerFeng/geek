<template lang="">
  <Modal ref="modalCourse" width="80%">
    <h3 style="font-weight: 100">选择课程</h3>
    <ul style="padding: 0;margin: 0;" class="courses">
      <div class="flex jb">
        <div style="width: 50%;">
          <p>可选技术方向</p>
          <li
            v-for="(item, i) in unselectedList"
            :key="i"
            @click="store.dispatch(ActionTypes.ChooseCourse, item.courseId)"
          >
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="logoMap[item.courseName]" />
            </svg>
            {{ item.courseName }}
          </li>
        </div>
        <div style="width: 50%;">
          <p>已选择方向</p>
          <li
            v-for="(item,i) in userInfo.directionVOList"
            :key="i"
            @click="store.dispatch(ActionTypes.DelCourse, item.courseId)"
          >
            <!--选择方向logo-->
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="item && item.courseName && logoMap[item.courseName]" />
            </svg>
            {{ item.courseName }}
          </li>
        </div>
      </div>
    </ul>
  </Modal>
  <el-tooltip
    :content="userInfo.directionVOList.length > 0 ? '我选择的方向' : '选择方向'"
    placement="top"
  >
    <ul class="course-id" @click="open">
      <li>
        <i class="el-icon-plus"></i>
      </li>
      <li v-for="(item,i) in userInfo.directionVOList" :key="i">
        <!--选择方向logo-->
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="logoMap[item.courseName]" />
        </svg>
      </li>
    </ul>
  </el-tooltip>
</template>
<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue"
import { ElTooltip } from 'element-plus';
import { useStore } from "../../../store"
import { ActionTypes } from "../../../store/modules/user/actions"
import type { User } from "../../../store/modules/user/state"
import { logoMap } from '../../../config/config'
import Modal from '../../../components/modal/Modal.vue'

const store = useStore()
const userInfo = store.state.user.userInfo as User

const modalCourse = ref<{
  open(): void
  close(): void
}>()
const open = () => {
  modalCourse.value!.open()
}

/**记录下每个课程的id */
const memo = ref(new Set<number>())
watchEffect(() => {
  memo.value.clear()
  for (const course of userInfo.directionVOList) {
    memo.value.add(course.id)
  }
})
const unselectedList = computed(() => store.state.user.allCourses.filter(course => {
  return !memo.value.has(course.id)
}))
</script>
<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.courses {
  font-weight: 100;

  li {
    padding: 5px;
    cursor: pointer;

    &:hover {
      background-color: rgb(243, 243, 243);
    }
  }
}
.course-id {
  position: relative;
  padding: 0;
  margin: 0;
  list-style: none;
  width: fit-content;
  font-size: 26px;
  display: flex;
  cursor: pointer;
}
.choose-course {
  width: fit-content;
  cursor: pointer;
}
</style>