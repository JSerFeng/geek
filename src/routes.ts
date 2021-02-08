import Home from './views/home/Home.vue'
import Login from './components/login/Login.vue'
import DoLogin from './components/login/DoLogin.vue'
import Register from './components/login/Register.vue'

export const routes = [
  {
    path: "/",
    component: Home
  }, {
    path: "/login",
    component: Login,
    children: [
      {
        path: "dologin",
        component: DoLogin
      }, {
        path: "register",
        component: Register
      }
    ]
  }
]