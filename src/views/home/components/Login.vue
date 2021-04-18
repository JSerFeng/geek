<template>
  <div class="wrap">
    <div v-if="store.state.user.isLogin" class="userInfo">
      <div class="bg"></div>
      <div class="info-bar">
        <div>
          <ElAvatar class="avatar" :src="userInfo.image" :alt="userInfo.userName" />
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
          <ChooseCourse />
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
import { ref } from 'vue';
import { RouterLink } from 'vue-router'
import type { Response } from '../../../api'
import { useStore } from '../../../store'
import type { User } from '../../../store/modules/user/state'
import { ActionTypes } from '../../../store/modules/user/actions'
import { Flags, useWithLoadingRef } from '../../../utils/shared';
import { ElTooltip, ElPopover, ElAvatar } from 'element-plus'
import { GButton, GInput } from '../../../components/geek'
import Modal from '../../../components/modal/Modal.vue'
import { ErrorCode } from '../../../api/request';
import ChooseCourse from '../components/ChooseCourse.vue'

const store = useStore()
const userInfo = store.state.user.userInfo as User

const [introduceFlag, introduction] = useWithLoadingRef(userInfo.introduce)
const changeIntroduction = async () => {
  introduceFlag.value = Flags.Pending
  const res = await store.dispatch(ActionTypes.ChangeIntro, introduction.value) as Response
  if (res && res.error_code === ErrorCode.Success) {
    modalCtx.value!.close()
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
  modalCtx.value!.open()
}

/**退出登陆按钮是否可见 */
const logoutVisible = ref(false)

/**退出登陆 */
const logout = () => {
  store.dispatch(ActionTypes.Logout)
  logoutVisible.value = false
}
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
        top: 0;
        flex-shrink: 0;
        transform: translate(0, -50%);
        border-radius: 50%;
        background-color: rgb(236, 236, 236);
        border: 3px solid rgb(255, 255, 255);
        display: block;
        width: 150px;
        height: 150px;
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