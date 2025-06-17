<script setup>
import { ref, onMounted } from 'vue'

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

// Cập nhật khi load và khi đăng nhập
onMounted(() => {
  loadUser()
  window.addEventListener('user-logged-in', loadUser)
})
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold fs-3" href="#">KFC</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="#">About</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Style test</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Changelog</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Accessories</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Architecture</a></li>
        </ul>

        <form class="d-flex me-2">
          <input class="form-control me-2" type="search" placeholder="Tìm kiếm" />
        </form>

        <button class="btn btn-dark me-3">THAM GIA</button>

        <!-- Hiển thị tên hoặc nút đăng nhập -->
        <div>
          <template v-if="user">
            <span class="fw-bold me-2">Hello, {{ user.fullName }}</span>
            <button class="btn btn-outline-danger btn-sm" @click="logout">Đăng xuất</button>
          </template>
          <template v-else>
            <button class="btn btn-outline-dark me-2" data-bs-toggle="modal" data-bs-target="#loginModal">Đăng nhập</button>
            <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#registerModal">Đăng ký</button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>
