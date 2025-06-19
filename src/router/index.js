import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/profile', name: 'Profile', component: Profile },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Bảo vệ route nếu chưa đăng nhập
router.beforeEach((to, from, next) => {
  const storedUser = localStorage.getItem('loggedInUser')
  const user = storedUser ? JSON.parse(storedUser) : null

  if (to.meta.requiresAuth && !user) {
    next('/login')
  } else if (to.meta.requiresAdmin && user?.role !== 'admin') {
    alert('Bạn không có quyền truy cập trang này!')
    next('/') // hoặc quay lại trang chủ
  } else {
    next()
  }
})

export default router
