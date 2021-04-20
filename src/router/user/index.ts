const DoLogin = import('../../components/login/components/DoLogin.vue')
const Register = import('../../components/login/components/Register.vue')
const UserInfoVue = import('../../views/user/userInfo/UserInfo.vue')
const ArticleView = import('../../views/user/articles/ArticleView.vue')
const ArticleDetailVue = import('../../views/user/articles/ArticleDetail.vue')
const HomeWorkVue = import('../../views/user/homework/HomeWork.vue')

const Login = import('../../components/login/Login.vue')

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