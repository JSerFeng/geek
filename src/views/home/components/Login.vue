<template>
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
      <GLoadingIcon v-show="status === Flags.Pending" />
      <p v-show="status === Flags.Fail">
        <i class="el-icon-warning" style="color: rgb(255, 126, 148);"></i>
        网络异常
        <g-button @click="retry">重试</g-button>
      </p>
    </ul>
  </Modal>
  <div class="wrap">
    <div v-if="store.state.user.isLogin" class="userInfo">
      <div class="bg"></div>
      <div class="info-bar">
        <div>
          <router-link to="/userinfo">
            <ElAvatar
              class="avatar"
              v-if="userInfo.image"
              :src="userInfo.image"
              :alt="userInfo.userName"
            />
            <ElAvatar class="avatar" v-else />
          </router-link>
        </div>
        <div class="intro">
          <h3 class="username">
            <router-link class="username" to="/userinfo">{{ userInfo.userName }}</router-link>
          </h3>
          <p class="introduction" @click="openSetIntro">{{ userInfo.introduce }}</p>
          <Modal ref="modalCtx" width="70%">
            <div style="padding: 30px 15px;">
              <GInput v-model="introduction" placeholder="简介" />
              <GButton :loading="introduceFlag === Flags.Pending" @click="changeIntroduction">确定</GButton>
            </div>
          </Modal>
          <el-tooltip
            :content="userInfo.directionVOList.length > 0 ? '我选择的方向' : '选择方向'"
            placement="top"
          >
            <ul class="course-id" @click="modalCourse?.open()">
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
        </div>
        <el-popover :visible="logoutVisible" placement="top">
          <div>
            <p>确定退出吗？</p>
            <div style="display: flex;justify-content: space-between;">
              <g-button type="broke" style="width: 100%;" @click="logout">确定</g-button>
              <g-button type="reverse" @click="logoutVisible = false" style="width: 100%;">取消</g-button>
            </div>
          </div>
          <template #reference>
            <div>
              <ElTooltip content="退出登陆">
                <i class="logout el-icon-close" @click="logoutVisible = true"></i>
              </ElTooltip>
            </div>
          </template>
        </el-popover>
      </div>
    </div>
    <div v-else class="ready-login">
      <h3>
        Geek
        <br />极客网工作室
      </h3>
      <RouterLink to="/login">
        <GButton type="broke">登陆 / 注册</GButton>
      </RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { RouterLink } from 'vue-router'
import type { Response } from '../../../api'
import { useStore } from '../../../store'
import type { Course, User } from '../../../store/modules/user/state'
import { ActionTypes } from '../../../store/modules/user/actions'
import { Flags, useWithLoadingRef } from '../../../utils/shared';
import { ElTooltip, ElPopover, ElAvatar } from 'element-plus'
import { GButton, GLoadingIcon, GInput } from '../../../components/geek'
import { logoMap } from '../../../config/config'
import Modal from '../../../components/modal/Modal.vue'
import { useFetchAllCourses } from '../hooks'
import { ErrorCode } from '../../../api/request';

const store = useStore()
const userInfo = store.state.user.userInfo as User

const [introduceFlag, introduction] = useWithLoadingRef(userInfo.introduce)
const changeIntroduction = async () => {
  introduceFlag.value = Flags.Pending
  const res = await store.dispatch(ActionTypes.ChangeIntro, introduction.value) as Response
  if (res && res.error_code === ErrorCode.Success) {
    modalCtx.value?.close()
    introduceFlag.value = Flags.Success
  } else {
    introduceFlag.value = Flags.Fail
  }
}

/**控制开关modal */
const modalCtx = ref<{
  open(): void,
  close(): void
} | null>(null)
/**打开简历设置 */
const openSetIntro = () => {
  modalCtx.value?.open()
}

/**打开或者关闭modal */
const modalCourse = ref<{ close(): void, open(): void }>()

/**退出登陆按钮是否可见 */
const logoutVisible = ref(false)

/**退出登陆 */
const logout = () => {
  store.dispatch(ActionTypes.Logout)
  logoutVisible.value = false
}

const [allCourses, status, retry] = useFetchAllCourses()

const unselectedList = ref<Course[]>([])

/**记录下每个课程的id */
const memo = new Set()
watchEffect(() => {
  if (status.value === Flags.Success) {
    memo.clear()
    for (const course of userInfo.directionVOList) {
      memo.add(course.id)
    }
    unselectedList.value = allCourses.value!.data.filter(course => {
      return !memo.has(course.id)
    })
  }
})
</script>
<style lang="scss" scoped>
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
.wrap {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    110.3deg,
    rgba(73, 93, 109, 1) 4.3%,
    rgba(49, 55, 82, 1) 96.7%
  );
  .userInfo {
    display: flex;
    flex-direction: column;
    justify-content: end;
    height: 100%;

    .bg {
      height: 50%;
    }
    .info-bar {
      height: 50%;
      font-size: 14px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      padding: 15px;
      position: relative;
      background-color: #fff;
      .intro {
        padding-left: 15px;
        width: 100%;

        .username {
          color: rgb(97, 97, 97);
          cursor: pointer;
          font-size: 24px;
          margin: 0;
          text-decoration: none;
        }

        .email {
          font-weight: 100;
          font-size: 14px;
        }
        .introduction {
          cursor: pointer;
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
      .avatar {
        width: 150px;
        height: 150px;
        top: 0;
        flex-shrink: 0;
        transform: translate(0, -50%);
        border-radius: 10px;
        background-color: rgb(236, 236, 236);
        border: 3px solid rgb(255, 255, 255);
      }
      .logout {
        border-radius: 50%;
        cursor: pointer;
        height: fit-content;
        padding: 5px;

        &:hover {
          background-color: rgb(252, 108, 108);
          color: #fff;
        }
      }
    }
  }

  .ready-login {
    color: #fff;
    width: 100%;
    height: 100%;
    display: block;
    position: relative;
    h3 {
      width: 100%;
      font-weight: 100;
      text-align: center;
      padding: 0;
      margin: 0;
      font-size: 200%;
      position: absolute;
      left: 50%;
      top: 30%;
      transform: translate(-50%, -50%);
    }
    button {
      font-weight: 100;
      position: absolute;
      left: 50%;
      bottom: 10%;
      opacity: 0.9;
      font-size: 30px;
      transform: translate(-50%);
    }
  }
}
</style>