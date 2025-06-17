<template>
  <div
    class="modal fade"
    id="registerModal"
    tabindex="-1"
    aria-labelledby="registerModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-body p-4">
          <div class="row">
            <!-- Form Section -->
            <div class="col-md-6 border-end">
              <h5 class="mb-4 fw-bold">Create an account</h5>
              <form @submit.prevent="register">
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input type="email" v-model="email" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label class="form-label">Full Name</label>
                  <input type="text" v-model="fullName" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label class="form-label">Password</label>
                  <input type="password" v-model="password" class="form-control" required />
                </div>
                <button type="submit" class="btn btn-dark w-100">Register</button>
              </form>
            </div>

            <!-- Image Section -->
            <div class="col-md-6 d-flex align-items-center justify-content-center">
              <img
                src="https://i.pinimg.com/736x/92/34/56/923456fd6933e7b58f0a99c8a52e0634.jpg"
                class="img-fluid rounded"
                style="max-height: 400px; object-fit: cover;"
                alt="Register Image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const fullName = ref('')
const password = ref('')

const register = async () => {
  try {
    const check = await axios.get(`http://localhost:3000/users?email=${email.value}`)
    if (check.data.length > 0) {
      alert('Email đã tồn tại. Vui lòng nhập email khác!')
      return
    }


    await axios.post('http://localhost:3000/users', {
      email: email.value,
      fullName: fullName.value,
      password: password.value,
    })

    alert('Đăng ký thành công!')
    email.value = ''
    fullName.value = ''
    password.value = ''
    bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide()
  } catch (error) {
    alert('Lỗi đăng ký!')
    console.error(error)
  }
}
</script>

