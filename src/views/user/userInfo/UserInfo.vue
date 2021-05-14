<template>
  <div class="view-main wrap">
    <div class="user-left shade">
      <div>
        <div ref="avatarArea">
          <ElImage :src="userInfo.image" class="avatar p" fit="cover">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
          </ElImage>
        </div>
        <p class="p" style="font-weight: 100;" @click="openChangeName">
          <span class="font20">你好</span>,
          <span class="font20">
            {{ userInfo.userName || userInfo.adminName }}
            <i class="font14 el-icon-edit"></i>
          </span>
        </p>
        <template v-if="userInfo.userId">
          <Modal ref="changeName" width="80%">
            <div style="padding: 30px 15px;">
              <GInput v-model="userName" placeholder="新用户名" />
              <GButton :loading="introduceFlag === Flags.Pending" @click="changeUserName">确定</GButton>
            </div>
          </Modal>
          <div class="intro p" @click="open">
            {{ userInfo.introduce }}
            <i class="font14 el-icon-edit"></i>
          </div>
          <div class="flex jc">
            <ChooseCourse />
          </div>
          <Modal ref="modalCtx" width="70%">
            <div style="padding: 30px 15px;">
              <GInput v-model="introduction" placeholder="简介" />
              <GButton :loading="introduceFlag === Flags.Pending" @click="changeIntroduction">确定</GButton>
            </div>
          </Modal>
        </template>
      </div>
      <div>
        <ul>
          <li class="item p dark font16" @click="openChangePassword">
            修改密码
            <i class="el-icon-edit"></i>
          </li>
          <li class="item p dark font16">
            接收消息推送
            <el-switch
              v-model="recvEmail"
              @change="recvMailChange"
              active-color="#13ce66"
              inactive-color="#e7e7e7"
            ></el-switch>
          </li>
          <Modal width="70%" ref="changePasswordModal">
            <div style="padding: 30px 15px;">
              <GInput placeholder="旧密码" type="password" v-model="oldPassword" />
              <CheckMsgVue :flag="oldPwdFlag" :msg="oldPwdMsg" />
              <GInput placeholder="新密码" type="password" v-model="newPassword" />
              <CheckMsgVue :flag="newPwdFlag" :msg="newPwdMsg" />
              <GInput placeholder="确认新密码" type="password" v-model="newPasswordConfirm" />
              <CheckMsgVue :flag="newPwdConfirmFlag" :msg="newPwdConfirmMsg" />
              <GQueryBtn :request="changePasswordImpl" :disabled="!pass">确认</GQueryBtn>
            </div>
          </Modal>
        </ul>
      </div>
      <div class="footer">
        <span class="font14 light">{{ userInfo.grade }}级的小同志</span>
        <div class="font14 light">注册于 {{ userInfo.registerTime }}</div>
      </div>
    </div>
    <div class="user-right">
      <div class="header flex ac">收藏文章</div>
      <ArticlesVue :my-favorites="true" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ElImage, ElNotification, ElSwitch } from 'element-plus'
import { useStore } from '../../../store';
import type { User } from '../../../store/modules/user/state'
import type { Response } from '../../../api'
import { ErrorCode } from '../../../api/request';
import { ActionTypes } from '../../../store/modules/user/actions';
import { useWithLoadingRef, Flags } from '../../../utils/shared';
import { GButton, GInput, GQueryBtn } from '../../../components/geek'
import { useImgUpload, useChangePassword } from './hook';
import Modal from '../../../components/modal/Modal.vue'
import type { ModalMethods } from '../../../components/modal/Modal.vue'
import ChooseCourse from '../../home/components/ChooseCourse.vue'
import ArticlesVue from '../../../components/articles/Articles.vue';
import { useNullCheck, useSameCheck } from '../../../components/login/hooks';
import CheckMsgVue from '../../../components/login/components/CheckMsg.vue';
import { useRouter } from 'vue-router';
import { apiChangeUserName } from '../../../api/user';

const store = useStore()
const router = useRouter()
const userInfo = store.state.user.userInfo as unknown as User
const recvEmail = computed(() => !!userInfo.receiveMail)
const modalCtx = ref<ModalMethods>()

const changeName = ref<ModalMethods>()
const userName = ref("")
const openChangeName = () => {
  changeName.value!.open()
}
const changeUserName = async () => {
  const res = await apiChangeUserName(userInfo.userId, userName.value)
  if (res.error_code == ErrorCode.Success) {
    changeName.value!.close()
  }
}


const open = () => {
  modalCtx.value?.open()
}
const [introduceFlag, introduction] = useWithLoadingRef(userInfo.introduce)
const changeIntroduction = async () => {
  introduceFlag.value = Flags.Pending
  const res = await store.dispatch(ActionTypes.ChangeIntro, introduction.value) as Response
  if (res && res.error_code === ErrorCode.Success) {
    modalCtx.value?.close()
  }
  introduceFlag.value = Flags.Success
}

/**接收日常邮件 */
const recvMailChange = () => {
  store.dispatch(ActionTypes.ChangeMailRecvStatus)
}

const changePasswordModal = ref<ModalMethods>()
const [
  oldPassword, //旧密码ref
  newPassword, //新密码ref
  newPasswordConfirm, //新密码确认密码ref
  changePassword, //改变密码的方法
  openChangePassword //打开弹框
] = useChangePassword(changePasswordModal)
const [oldPwdFlag, oldPwdMsg] = useNullCheck(oldPassword)
const [newPwdFlag, newPwdMsg] = useNullCheck(newPassword)
const [newPwdConfirmFlag, newPwdConfirmMsg] = useSameCheck(newPassword)(newPasswordConfirm)
const pass = computed(() => [oldPwdFlag, newPwdFlag, newPwdConfirmFlag].every(item => item.value === Flags.Success))
//按钮按下调用
const changePasswordImpl = async () => {
  const result = await changePassword()
  if (result) {
    ElNotification({
      message: "请重新登陆"
    })
    store.dispatch(ActionTypes.Logout)
    router.push({
      path: "/login",
      query: {
        userId: store.state.user.userInfo.userId
      }
    })
  }
}

/**头像上传功能 */
const avatarArea = useImgUpload()

</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    display: block;
  }
}
.user-left {
  width: 20%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  padding: 15px;
  box-sizing: border-box;
  background-color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .sm-font {
    font-weight: 300;
    font-size: 12px;
  }

  .intro {
    font-size: 20px;
    font-weight: 100;
  }

  .avatar {
    width: 15vw;
    height: 15vw;
    display: block;
    margin: 0 auto 3vw;
    border-radius: 50%;
  }
}
.item {
  margin: 10px 0;
  transition: 0.2s;
  padding: 10px 0;
  &:hover {
    background-color: rgb(226, 226, 226);
  }
}
.user-right {
  width: 77%;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
  }
  background-color: #fff;

  .header {
    position: relative;
    padding: 15px;
    overflow: hidden;
    height: 30px;
    .tab {
      width: 20%;
      position: absolute;
      font-size: 14px;
      font-weight: 100;
      color: rgb(167, 167, 167);
      transform: translateX(100%);
      transition: 0.2s;

      &.active {
        font-size: 20px;
        font-weight: 500;
        color: #000;
        transform: translateX(0);
      }
    }
  }
}
</style>