<script setup>

import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import PostList from './components/PostList.vue'
</script>

<template>
  <div>
    <Navbar /> <!-- hoặc MainNavbar, v.v. -->
    <router-view />
    <Register />
    <Login />
    <Home />
    <Profile />
    <PostList />
  </div>
</template>

