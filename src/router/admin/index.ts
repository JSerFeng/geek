import Admin from '../../views/admin/Admin.vue'
import SuperAdmin from '../../views/super-admin/SuperAdmin.vue'
import CheckHomework from '../../views/check-homework/CheckHomework.vue'

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
}]