<template>
  <div class="admin">
    <h1 class="admin-title">
      ~ Hello
      <span
        >{{ adminName }}
        <router-link to="/home"><div class="to-home">
          <div class="header"><img :src="avatar" alt=""></div>
          <div class="body">我 的 主 页</div></div
      ></router-link>
        </span>
      ^O^ ~
    </h1>
    <ul class="person-count">
      <li class="font">
        <img src="../../assets/imgs/1.jpg" alt="" />
        <h4>前端</h4>
        <div class="sign-person-count">
          <span class="title">报名人数&nbsp;</span
          ><span> {{ frontPerson }} </span>
        </div>
      </li>
      <li class="end">
        <img src="../../assets/imgs/2.jpg" alt="" />
        <h4>后端</h4>
        <div class="sign-person-count">
          <span class="title">报名人数&nbsp;</span
          ><span> {{ endPerson }} </span>
        </div>
      </li>
      <li class="python">
        <img src="../../assets/imgs/5.jpg" alt="" />
        <h4>Python</h4>
        <div class="sign-person-count">
          <span class="title">报名人数&nbsp;</span
          ><span> {{ pythonPerson }} </span>
        </div>
      </li>
      <li class="android">
        <img src="../../assets/imgs/android.jpg" alt="" />
        <h4>移动</h4>
        <div class="sign-person-count">
          <span class="title">报名人数&nbsp;</span
          ><span> {{ androidPerson }} </span>
        </div>
      </li>
      <li class="design">
        <img src="../../assets/imgs/design.jpg" alt="" />
        <h4>设计</h4>
        <div class="sign-person-count">
          <span class="title">报名人数&nbsp;</span
          ><span> {{ designPerson }} </span>
        </div>
      </li>
      <li class="operation">
        <img src="../../assets/imgs/yunying.jpg" alt="" />
        <h4>产品</h4>
        <div class="sign-person-count">
          <span class="title">报名人数&nbsp;</span
          ><span> {{ operationPerson }} </span>
        </div>
      </li>
    </ul>
    <div @click="handleClose" class="send-email">
      发送邮件 <i class="el-icon-s-promotion"></i>
    </div>
    <div ref="root">
      <el-dialog
        top="7vh"
        v-model="dialogVisible"
        width="50%"
        title="发送邮件"
        :before-close="handleClose"
        custom-class="send-email-dialog"
      >
        <send-email ref="sendEmailRef" />
        <template #footer>
          <span class="dialog-footer">
            <el-button class="confirm-button" @click="dialogVisible = false">取 消</el-button>
            <el-button class="confirm-button" type="primary" @click="handleSendEmail">确 定</el-button>
          </span>
        </template>
      </el-dialog>
      <router-link to="/checkTask"
        ><AdBeacon title="作业管理" boxStyle="right"
      /></router-link>
      <router-link to="/stuDetail"
        ><AdBeacon title="招生详情" boxStyle="left"
      /></router-link>
      <router-link to="/articleManage"
        ><AdBeacon :top="23" title="文章管理" boxStyle="right"
      /></router-link>
      <router-link to="/publish"
        ><AdBeacon :top="23" title="发布公告" boxStyle="left"
      /></router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRequestCount } from "./hooks/useRequestCount";
import useDialog from "./hooks/useDialog";
import SignPersonItem from "./components/SignPerson.vue";
import AdBeacon from "../../components/ad-beacon/AdBeacon.vue";
import SendEmail from "./components/SendEmail.vue";
import { storage } from "../../utils/shared";
export default defineComponent({
  setup() {
    const {
      frontPerson,
      endPerson,
      pythonPerson,
      androidPerson,
      signPersonList,
      operationPerson,
      designPerson
    } = useRequestCount();
    const { dialogVisible, handleClose, root } = useDialog();
    const avatar = storage.get('image')
    const virtualList = ref<null | HTMLDivElement>(null);
    const sendEmailRef = ref<any>(null);
    const adminName = storage.get("adminName");
    function handleSendEmail() {
      sendEmailRef.value.sendEmail(dialogVisible);
    }
    return {
      dialogVisible,
      avatar,
      frontPerson,
      endPerson,
      pythonPerson,
      androidPerson,
      handleClose,
      root,
      signPersonList,
      virtualList,
      sendEmailRef,
      handleSendEmail,
      adminName,
      operationPerson,
      designPerson
    };
  },
  components: {
    SignPersonItem,
    AdBeacon,
    SendEmail,
  },
});
</script>

<style lang="scss" scoped>
#item {
  height: 30px;
}
* {
  list-style: none;
  padding: 0;
  margin: 0;
}
.admin {
  .confirm-button{
    width: 5vw;
  }
  .to-home {
    width: 180px;
    height: 180px;
    background-color: #EEF1EF;
    display: none;
    border-radius: 20px;
      box-shadow: 0 0 20px #CECECE;
    &:hover{
      cursor: pointer;
    }
    .body{
      font-size: 15px;
      padding-top: 2vh;
      color: #331723;
    }
    img{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      transition: all .5s;
      border: 1px solid #EEF1EF;
      box-shadow: 0 0 10px #CECECE;
      margin-top: 3vh;
      &:hover{
        transform: scale(1.3);
      }
    }
  }
  .admin-title {
    width: 70%;
    text-align: center;
    color: white;
    margin: 5vh auto -3vh auto;
    span {
      color: white;
      position: relative;
      &:hover .to-home {
        display: inline-block;
        position: absolute;
        left:-3vw;
        top: 100%;

      }
    }
  }
  .person-count {
    display: flex;
    background-color: rgba($color: #fff, $alpha: 0.7);
    width: 75%;
    border-radius: 50px;
    min-height: 550px;
    margin: 10vh auto;
    box-shadow: -1px -1px 3px #ffffff, 1.5px 1.5px 3px rgba(174, 174, 192, 0.4);
    .font,
    .end,
    .python,
    .android, .design , .operation {
      background-color: #eef1ef;
      box-shadow: -1px -1px 3px #ffffff,
        1.5px 1.5px 3px rgba(174, 174, 192, 0.4);
      height: 55vh;
      overflow: hidden;
      transition: all 0.5s;
      width: 10vw;
      margin-top: 10vh;
      margin-left: 2.1vw;
      border-radius: 75px;
      &:hover {
        transform: scale(1.1);
      }
      h4 {
        text-align: center;
        width: 100px;
        border-bottom: 1px solid #b0b3b0;
        padding-bottom: 10px;
        margin: 0 auto;
      }
      img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin: 10px auto;
        display: block;
      }
      .sign-person-count {
        .title {
          display: block;
          margin: 10px auto;
          width: 15px;
          word-wrap: break-word;
        }
        span {
          width: 15px;
          display: block;
          margin: 0 auto;
        }
      }
    }
  }
  .send-email {
    width: 50vh;
    height: 50px;
    background-color: white;
    margin: -60px auto 10px auto;
    text-align: center;
    font-size: 20px;
    font-family: Helvetica, "PingFang SC", "Microsoft Yahei", sans-serif;
    line-height: 50px;
    box-shadow: -10px -10px 30px #ffffff,
      10px 10px 30px rgba(174, 174, 192, 0.4);
    border-radius: 40vh;
    transition: all 0.5s;
    &:hover {
      transform: scale(1.1);
      cursor: pointer;
    }
  }
  .send-email-dialog {
    border-radius: 20px;
  }
  @each $i in font, end, python, android, design, operation {
    @if $i == font {
      .#{$i} {
        animation: scale 1s 0s backwards;
      }
    }
    @if $i == end {
      .#{$i} {
        animation: scale 1s 0.3s backwards;
      }
    }
    @if $i == python {
      .#{$i} {
        animation: scale 1s 0.6s backwards;
      }
    }
    @if $i == android {
      .#{$i} {
        animation: scale 1s 0.9s backwards;
      }
    }
    @if $i == design {
      .#{$i} {
        animation: scale 1s 1.2s backwards;
      }
    }
    @if $i == operation {
      .#{$i} {
        animation: scale 1s 1.5s backwards;
      }
    }
  }
  @keyframes scale {
    from {
      height: 0;
      display: none;
    }
    to {
      height: 400px;
      display: block;
    }
  }
}
</style>