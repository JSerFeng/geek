import Login from '../../components/login/Login.vue'
import DoLogin from '../../components/login/components/DoLogin.vue'
import Register from '../../components/login/components/Register.vue'
import UserInfoVue from '../../views/user/userInfo/UserInfo.vue'
import ArticleView from '../../views/user/articles/ArticleView.vue'
import ArticleDetailVue from '../../views/user/articles/ArticleDetail.vue'
import HomeWorkVue from '../../views/user/homework/HomeWork.vue'

export enum Auth {
  NONE = /*         */ 0b00000000,
  STUDENT = /*      */ 0b00000001,
  ADMIN = /*        */ 0b00000011,
  SUPER_ADMIN = /*  */ 0b00000111,
}

export default [
  {
    path: "/login",
    component: Login,
    children: [
      {
        path: "",
        component: DoLogin
      }, {
        path: "register",
        component: Register
      }
    ]
  }, {
    path: "/userinfo",
    meta: {
      auth: Auth.STUDENT,
    },
    component: UserInfoVue,
  }, {
    path: "/articleList",
    component: ArticleView
  }, {
    path: "/article",
    component: ArticleDetailVue
  }, {
    path: "/homework",
    meta: {
      auth: Auth.STUDENT
    },
    component: HomeWorkVue
  }
]