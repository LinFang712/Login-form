<script setup>
import { ref, onMounted } from 'vue'
import Profile from '../views/Profile.vue'
import AdminUserManager from './AdminUserManager.vue'

const user = ref(null)

const loadUser = () => {
  const stored = localStorage.getItem('loggedInUser')
  if (stored) {
    user.value = JSON.parse(stored)
  }
}

const logout = () => {
  localStorage.removeItem('loggedInUser')
  user.value = null
  window.dispatchEvent(new Event('user-logged-out'))
}

onMounted(() => {
  loadUser()
  window.addEventListener('user-logged-in', loadUser)
})
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold fs-3" href="#">IT BLOG</a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="#">About</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Đăng blog</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Bài đăng</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Q & A</a></li>
        </ul>

        <form class="d-flex me-3">
          <input class="form-control me-2" type="search" placeholder="Tìm kiếm. . ." />
          <button class="btn btn-dark">Tìm</button>
        </form>

        <div class="d-flex align-items-center">
          <template v-if="user">
            <span
              class="fw-bold me-3 text-primary"
              style="cursor: pointer;"
              data-bs-toggle="modal"
              data-bs-target="#profileModal"
            >
              Hello, {{ user.fullName }}
            </span>

            <span
              v-if="user.role === 'admin'"
              class="nav-link text-danger me-3"
              style="cursor: pointer;"
              data-bs-toggle="modal"
              data-bs-target="#adminModal"
            >
              Quản lý tài khoản
            </span>

            <button class="btn btn-outline-danger btn-sm" @click="logout">Đăng xuất</button>
          </template>

          <template v-else>
            <button
              class="btn btn-outline-dark me-2"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
            >
              Đăng nhập
            </button>
            <button
              class="btn btn-dark"
              data-bs-toggle="modal"
              data-bs-target="#registerModal"
            >
              Đăng ký
            </button>
          </template>
        </div>
      </div>
    </div>
  </nav>
  <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-3">
        <div class="modal-header">
          <h5 class="modal-title" id="profileModalLabel">Thông tin cá nhân</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <Profile :user="user" />
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="adminModal" tabindex="-1" aria-labelledby="adminModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content p-3">
        <div class="modal-header">
          <h5 class="modal-title" id="adminModalLabel">Quản lý tài khoản</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <AdminUserManager />
        </div>
      </div>
    </div>
  </div>
</template>