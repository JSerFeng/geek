import Home from '../views/home/Home.vue'
import userRoutes from './user'
import adminRoutes from './admin'
import { createRouter, createWebHistory } from 'vue-router'
import { ElNotification } from 'element-plus'
import { storage } from '../utils/shared'

export const enum Auth {
  NONE = /*         */ 0b00000000,
  STUDENT = /*      */ 0b00000001,
  ADMIN = /*        */ 0b00000011,
  SUPER_ADMIN = /*  */ 0b00000111,
}

let tmp
let type = (tmp = storage.get("type"))
  ? tmp === "super"
    ? Auth.SUPER_ADMIN
    : Auth.ADMIN
  : storage.get("userId")
    ? Auth.STUDENT
    : Auth.NONE

/* 权限  */
export const currentAuth = {
  current: type
}

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    exact: true,
    component: Home
  },
  ...userRoutes,
  ...adminRoutes,
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth as number
  if (requireAuth) {
    if (currentAuth.current & requireAuth) {
      next()
    } else {
      ElNotification({
        message: "权限不足"
      })
      next(from.path)
    }
    return
  }
  next()
})