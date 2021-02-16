<template>
  <Modal ref="modalCourse" width="80%">
    <h3 style="font-weight: 100">选择课程</h3>
    <ul style="padding: 0;margin: 0;" class="courses">
      <div class="flex jb">
        <div style="width: 50%;">
          <p>技术方向</p>
          <li
            v-for="(item, i) in allCourses?.data"
            :key="i"
            v-show="status === Flags.Success && !selectedCourse.has(item.courseName)"
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
            v-for="(my,i) in userInfo.directionVOList"
            :key="i"
            @click="store.dispatch(ActionTypes.DelCourse, my.courseId)"
          >
            <!--选择方向logo-->
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="logoMap[my.courseName]" />
            </svg>
            {{ my.courseName }}
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
          <img class="avatar" v-if="userInfo.image" :src="userInfo.image" :alt="userInfo.userName" />
          <img class="avatar" v-else />
        </div>
        <div class="intro">
          <h3 class="username">
            {{ userInfo.userName }}
            <span class="email">{{ userInfo.mail }}</span>
          </h3>
          <p class="introduction">{{ userInfo.introduce }}</p>
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
              <el-tooltip content="退出登陆">
                <i class="logout el-icon-close" @click="logoutVisible = true"></i>
              </el-tooltip>
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
      <router-link to="/login">
        <g-button type="broke">登陆 / 注册</g-button>
      </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouterLink } from 'vue-router'
import { useStore } from '../../../store'
import type { User } from '../../../store/modules/user/state'
import { ActionTypes } from '../../../store/modules/user/actions'
import { Flags } from '../../../utils/shared';
import { ElTooltip, ElPopover } from 'element-plus'
import { GButton, GLoadingIcon } from '../../../components/geek'
import { logoMap } from '../../../config/config'
import Modal from '../../../components/modal/Modal.vue'
import { useFetchAllCourses } from '../hooks'

const store = useStore()

const modalCourse = ref<{ close(): void, open(): void }>()
const logoutVisible = ref(false)

const logout = () => {
  store.dispatch(ActionTypes.Logout)
  logoutVisible.value = false
}
const userInfo = store.state.user.userInfo as User

const [allCourses, status, retry] = useFetchAllCourses()

const selectedCourse = ref(new Set()) /**已选的课程 */
watch(() => userInfo.directionVOList, (val) => {
  val.forEach(item => {
    selectedCourse.value.add(item.courseName)
  })
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
          cursor: pointer;
          font-size: 24px;
          margin: 0;
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