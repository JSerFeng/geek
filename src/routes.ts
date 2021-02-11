import Home from './views/home/Home.vue'
import Login from './components/login/Login.vue'
import DoLogin from './components/login/components/DoLogin.vue'
import Register from './components/login/components/Register.vue'
import ExamA from './views/examples/ExamA.vue'
import ExamB from './views/examples/ExamB.vue'
export const routes = [
  {
    path: "/",
    component: Home
  }, {
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
    path: "/examA",
    component: ExamA
  }, {
    path: "/examB",
    component: ExamB
  }
]