import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'

const Login = () => import('../pages/Login.vue')
const Register = () => import('../pages/Register.vue')
const Dashboard = () => import('../pages/Dashboard.vue')
const UsersList = () => import('../pages/UsersList.vue')
const UserForm = () => import('../pages/UserForm.vue')
const RolesList = () => import('../pages/RolesList.vue')
const RoleForm = () => import('../pages/RoleForm.vue')
const MenusList = () => import('../pages/MenusList.vue')
const MenuForm = () => import('../pages/MenuForm.vue')
const RoleMenuForm = () => import('../pages/RoleMenuForm.vue')
const Profile = () => import('../pages/Profile.vue');
const NoAccess = () => import('../pages/NoAccess.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: Login, meta: { authLayout: true } },
    { path: '/register', component: Register, meta: { authLayout: true } },
    { path: '/', component: Dashboard, meta: { requiresAuth: true } },

    { path: '/users', name: 'users', component: UsersList, meta: { requiresAuth: true, perm: { key: 'users', action: 'can_read' } } },
    { path: '/users/new', component: UserForm, meta: { requiresAuth: true, perm: { key: 'users', action: 'can_create' } } },
    { path: '/users/:id', component: UserForm, meta: { requiresAuth: true, perm: { key: 'users', action: 'can_update' } } },
   
    { path: '/roles', name: 'roles', component: RolesList, meta: { requiresAuth: true, perm: { key: 'roles', action: 'can_read' } } },
    { path: '/roles/new', component: RoleForm, meta: { requiresAuth: true, perm: { key: 'roles', action: 'can_create' } } },
    
    { path: '/roles/:id', component: RoleForm, meta: { requiresAuth: true, perm: { key: 'roles', action: 'can_update' } } },

    { path: '/menus', name: 'menus', component: MenusList, meta: { requiresAuth: true, perm: { key: 'menus', action: 'can_read' } } },
    { path: '/menus/new', component: MenuForm, meta: { requiresAuth: true, perm: { key: 'menus', action: 'can_create' } } },
    { path: '/menus/:id', component: MenuForm, meta: { requiresAuth: true, perm: { key: 'menus', action: 'can_update' } } },
    
    { path: '/role-menu', component: RoleMenuForm, meta: { requiresAuth: true } },
    { path: '/profile', component: Profile, meta: { requiresAuth: true } },
    { path: '/403', name: 'no-access', component: NoAccess, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', redirect: '/403' } // opsional: tak dikenal → 403/atau buat 404 sendiri


  ]
})

router.beforeEach(async (to, _from, next) => {
  const auth = useAuthStore()
  if (!auth.initialized) { await auth.fetchMe().catch(() => { }) }

  if (to.meta.requiresAuth && !auth.user) return next('/login')

  // cek izin bila ada meta.perm
  if (to.meta?.perm) {
    const { key, action = 'can_read' } = to.meta.perm
    if (!auth.hasPermission(key, action)) {
      return next({ name: 'no-access', query: { r: to.fullPath } })
    }

    
  }
  next()
})

export default router
