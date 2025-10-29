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

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: Login, meta: { authLayout: true } },
    { path: '/register', component: Register, meta: { authLayout: true } },
    { path: '/', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/users', component: UsersList, meta: { requiresAuth: true } },
    { path: '/users/new', component: UserForm, meta: { requiresAuth: true } },
    { path: '/users/:id', component: UserForm, meta: { requiresAuth: true } },
    { path: '/roles', component: RolesList, meta: { requiresAuth: true } },
    { path: '/roles/new', component: RoleForm, meta: { requiresAuth: true } },
    { path: '/roles/:id', component: RoleForm, meta: { requiresAuth: true } },
    { path: '/menus', component: MenusList, meta: { requiresAuth: true } },
    { path: '/menus/new', component: MenuForm, meta: { requiresAuth: true } },
    { path: '/menus/:id', component: MenuForm, meta: { requiresAuth: true } },
    { path: '/role-menu', component: RoleMenuForm, meta: { requiresAuth: true } },
    { path: '/profile', component: Profile, meta: { requiresAuth: true } },

  ]
})

router.beforeEach(async (to, _from, next) => {
  const store = useAuthStore()
  if (!store.initialized) {
    await store.fetchMe().catch(() => {})
  }
  if (to.meta.requiresAuth && !store.user) {
    return next('/login')
  }
  if ((to.path === '/login' || to.path === '/register') && store.user) {
    return next('/')
  }
  next()
})

export default router
