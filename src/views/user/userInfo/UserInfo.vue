<template lang="">
  <div class="view-main flex jb">
    <div class="user-left shade">
      <div ref="avatarArea">
        <ElAvatar :src="userInfo.image" class="avatar p">
         <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
        </ElAvatar>
      </div>
      <p style="font-weight: 100;">
        你好, <span style="font-weight: 300;">{{ userInfo.userName }}</span>
      </p>
      <div class="intro p" @click="open">{{ userInfo.introduce }}</div>
      <Modal ref="modalCtx" width="70%">
        <div style="padding: 30px 15px;">
          <GInput v-model="introduction" placeholder="简介" />
          <GButton :loading="introduceFlag === Flags.Pending" @click="changeIntroduction">确定</GButton>
        </div>
      </Modal>
      <div class="flex jc">
        <ChooseCourse />
      </div>
    </div>
    <div class="user-right">
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { ElAvatar } from 'element-plus'
import { useStore } from '../../../store';
import type { User } from '../../../store/modules/user/state'
import type { Response } from '../../../api'
import { ErrorCode } from '../../../api/request';
import { ActionTypes } from '../../../store/modules/user/actions';
import { useWithLoadingRef, Flags } from '../../../utils/shared';
import { GButton, GInput } from '../../../components/geek'
import { useImgUpload } from './hook';
import Modal from '../../../components/modal/Modal.vue'
import ChooseCourse from '../../home/components/ChooseCourse.vue'

const store = useStore()
const userInfo = store.state.user.userInfo as unknown as User

const modalCtx = ref<{
  open(): void
  close(): void
}>()

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

/**头像上传功能 */
const avatarArea = useImgUpload()
</script>
<style lang="scss" scoped>
.user-left {
  width: 20%;
  padding: 15px;
  box-sizing: border-box;
  background-color: #fff;
  text-align: center;

  .intro {
    font-size: 16px;
    font-weight: 100;
  }

  .avatar {
    width: 15vw;
    height: 15vw;
    display: block;
    margin: 0 auto 3vw;
  }
}

.user-right {
  width: 77%;
  background-color: #fff;
}
</style>