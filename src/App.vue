<script setup>
import Navbar from './components/Navbar.vue' // hoặc tên thật
import Login from './views/Login.vue';
import Register from './views/Register.vue';
</script>

<template>
  <div>
    <router-view />
    <Login />
    <Register />
  </div>
</template>
