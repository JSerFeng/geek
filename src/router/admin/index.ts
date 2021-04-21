// import StudentDetail from '../../views/student-detail/StudentDetail.vue'
// import CourseIntroduce from '../../views/course-introduce/CourseIntorduce.vue'
// import ArticleManage from '../../views/article-manage/ArticleMange.vue'
// import MyCollectAtricle from '../../components/ad-my-collect/AdMyCollect.vue'
import { Auth } from '../user/index'
export default [
  {
    path: '/admin',
    component: () => import('../../views/admin/Admin.vue'),
    meta: {
      auth: Auth.ADMIN
    }
  },
  {
    path: '/checkTask',
    component: () => import('../../views/check-homework/CheckHomework.vue'),
    meta: {
      auth: Auth.ADMIN
    }
  }, {
    path: '/superadmin',
    component: () => import('../../views/super-admin/SuperAdmin.vue'),
    meta: {
      auth: Auth.ADMIN
    }
  }, {
    path: '/taskDetail/:id',
    component: () => import('../../views/homework-detail/HomeworkDetail.vue'),
    meta: {
      auth: Auth.ADMIN
    }
  }, {
    path: '/taskStatus',
    component: () => import('../../views/homework-status/HomeworkStatus.vue'),
    meta: {
      auth: Auth.ADMIN
    }
  }, {
    path: '/stuDetail',
    component: () => import('../../views/student-detail/StudentDetail.vue'),
    meta: {
      auth: Auth.ADMIN
    }
  }, {
    path: '/couInduce',
    component: () => import('../../views/course-introduce/CourseIntorduce.vue')
  }, {
    path: '/articleManage',
    component: () => import('../../views/article-manage/ArticleMange.vue'),
    meta: {
      auth: Auth.ADMIN
    }
  }, {
    path: '/myCollect',
    component: () => import('../../components/ad-my-collect/AdMyCollect.vue')
  }, {
    path: "/sendAnnounce",
    component: () => import('../../views/sendAnnounce/SendAnnounce.vue')
  }
]