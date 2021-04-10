import Admin from '../../views/admin/Admin.vue'
import SuperAdmin from '../../views/super-admin/SuperAdmin.vue'
import CheckHomework from '../../views/check-homework/CheckHomework.vue'
import HomeworkDetail  from '../../views/homework-detail/HomeworkDetail.vue'
import HowmworkStatus from '../../views/homework-status/HomeworkStatus.vue'

export default [{
  path: '/admin',
  component: Admin,
},
{
  path: '/check/homework',
  component: CheckHomework
}, {
  path: '/superadmin',
  component: SuperAdmin
},{
  path: '/homework/detail/:id',
  component: HomeworkDetail
},{
  path: '/homwwork/status',
  component: HowmworkStatus
}]