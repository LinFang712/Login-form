<script setup lang="ts">
import { ref, onMounted } from 'vue'

const user = ref(null)
const isEditing = ref(false)

const fullName = ref('')
const email = ref('')
const gender = ref('')
const dob = ref('')
const avatar = ref('') // sẽ chứa base64

onMounted(() => {
  const stored = localStorage.getItem('loggedInUser')
  if (stored) {
    const u = JSON.parse(stored)
    user.value = u
    fullName.value = u.fullName || ''
    email.value = u.email || ''
    gender.value = u.gender || ''
    dob.value = u.dob || ''
    avatar.value = u.avatar || ''
  }
})

const genderLabel = (g: string) =>
  g === 'male' ? 'Nam' : g === 'female' ? 'Nữ' : 'Khác'

const formatDate = (d: string) =>
  d?.split('-').reverse().join('/') || ''

// Xử lý khi chọn ảnh
const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      avatar.value = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}

const save = () => {
  const u = {
    ...user.value,
    fullName: fullName.value,
    email: email.value,
    gender: gender.value,
    dob: dob.value,
    avatar: avatar.value
  }
  user.value = u
  localStorage.setItem('loggedInUser', JSON.stringify(u))
  isEditing.value = false
}
</script>

<template>
  <div v-if="user">
    <!-- Ảnh đại diện -->
    <div class="text-center mb-3">
      <img
        v-if="avatar"
        :src="avatar"
        alt="Avatar"
        class="rounded-circle"
        style="width: 150px; height: 150px; object-fit: cover;"
      />
      <div v-if="isEditing" class="mt-2">
        <input type="file" class="form-control" accept="image/*" @change="handleFileChange" />
      </div>
    </div>

    <!-- Thông tin -->
    <template v-if="!isEditing">
      <p><strong>Họ tên:</strong> {{ user.fullName }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p>
        <strong>Giới tính:</strong>
        <span :class="user.gender === 'male' ? 'text-primary' : user.gender === 'female' ? 'text-danger' : 'text-muted'">
          {{ genderLabel(user.gender) }}
        </span>
      </p>
      <p><strong>Ngày sinh:</strong> {{ formatDate(user.dob) }}</p>
      <button class="btn btn-sm btn-primary mt-2" @click="isEditing = true">Chỉnh sửa</button>
    </template>

    <!-- Form chỉnh sửa -->
    <template v-else>
      <div class="mb-2">
        <label class="form-label">Họ tên</label>
        <input v-model="fullName" class="form-control" />
      </div>
      <div class="mb-2">
        <label class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control" />
      </div>
      <div class="mb-2">
        <label class="form-label">Giới tính</label>
        <select v-model="gender" class="form-select">
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
          <option value="other">Khác</option>
        </select>
      </div>
      <div class="mb-2">
        <label class="form-label">Ngày sinh</label>
        <input v-model="dob" type="date" class="form-control" />
      </div>

      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-success" @click="save">Lưu</button>
        <button class="btn btn-sm btn-secondary" @click="isEditing = false">Huỷ</button>
      </div>
    </template>
  </div>

  <div v-else>
    <p class="text-muted">Không có thông tin người dùng.</p>
  </div>
</template>
