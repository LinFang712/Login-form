<template>
  <div
    class="modal fade"
    id="loginModal"
    tabindex="-1"
    aria-labelledby="loginModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-body p-4">
          <div class="row">
            <!-- Image Section -->
            <div class="col-md-6 d-flex align-items-center justify-content-center border-end">
              <img
                src="../img/login.jpg"
                class="img-fluid rounded"
                style="max-height: 400px; object-fit: cover;"
                alt="Login Image"
              />
            </div>

            <!-- Form Section -->
            <div class="col-md-6">
              <h5 class="mb-4 fw-bold">Đăng nhập</h5>
              <form @submit.prevent="login">
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input type="email" v-model="email" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label class="form-label">Mật khẩu</label>
                  <input type="password" v-model="password" class="form-control" required />
                </div>
                <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
              </form>

              <div v-if="errorMessage" class="mt-3 alert alert-danger p-2">
                {{ errorMessage }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const login = async () => {
  try {
    const res = await axios.get('http://localhost:3000/users', {
      params: {
        email: email.value,
        password: password.value
      }
    })

    if (res.data.length > 0) {
      const user = res.data[0]
      localStorage.setItem('loggedInUser', JSON.stringify(user))
      alert('Đăng nhập thành công!')
      errorMessage.value = ''

      bootstrap.Modal.getInstance(document.getElementById('loginModal'))?.hide()
      window.dispatchEvent(new Event('user-logged-in'))
    } else {
      errorMessage.value = 'Email hoặc mật khẩu không đúng.'
    }
  } catch (error) {
    errorMessage.value = 'Lỗi khi đăng nhập.'
    console.error(error)
  }
}
</script>
