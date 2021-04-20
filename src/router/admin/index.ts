import Admin from '../../views/admin/Admin.vue'
import SuperAdmin from '../../views/super-admin/SuperAdmin.vue'
import CheckHomework from '../../views/check-homework/CheckHomework.vue'
import HomeworkDetail from '../../views/homework-detail/HomeworkDetail.vue'
import HowmworkStatus from '../../views/homework-status/HomeworkStatus.vue'
import StudentDetail from '../../views/student-detail/StudentDetail.vue'
import CourseIntroduce from '../../views/course-introduce/CourseIntorduce.vue'
import ArticleManage from '../../views/article-manage/ArticleMange.vue'
import MyCollectAtricle from '../../components/ad-my-collect/AdMyCollect.vue'
import { Auth } from '../user/index'

export default [{
  path: '/admin',
  component: Admin,
  meta: {
    auth: Auth.ADMIN
  }
},
{
  path: '/checkTask',
  component: CheckHomework,
  meta: {
    auth: Auth.ADMIN
  }
}, {
  path: '/superadmin',
  component: SuperAdmin,
  meta: {
    auth: Auth.ADMIN
  }
}, {
  path: '/taskDetail/:id',
  component: HomeworkDetail,
  meta: {
    auth: Auth.ADMIN
  }
}, {
  path: '/taskStatus',
  component: HowmworkStatus,
  meta: {
    auth: Auth.ADMIN
  }
}, {
  path: '/stuDetail',
  component: StudentDetail,
  meta: {
    auth: Auth.ADMIN
  }
}, {
  path: '/couInduce',
  component: CourseIntroduce
}, {
  path: '/articleManage',
  component: ArticleManage,
  meta: {
    auth: Auth.ADMIN
  }
},{
  path:'/myCollect',
  component:MyCollectAtricle
}]