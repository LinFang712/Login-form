<template>
  <div>
    <Navbar />

    <!-- Hero Carousel -->
<div id="heroCarousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner" style="height: 320px;">
    <div class="carousel-item active h-100">
      <img src="../img/IT.png" class="d-block w-100 h-100 object-fit-cover" alt="Banner 1" />
    </div>
    <div class="carousel-item h-100">
      <img src="../img/banner2.png" class="d-block w-100 h-100 object-fit-cover" alt="Banner 2" />
    </div>
    <div class="carousel-item h-100">
      <img src="../img/banner3.png" class="d-block w-100 h-100 object-fit-cover" alt="Banner 3" />
    </div>
  </div>  

  <!-- Indicators -->
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" class="active" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>

  <!-- Controls -->
  <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon"></span>
  </button>
</div>


    <!-- Section Heading -->
    <div class="container mt-5">
      <h2 class="fw-bold mb-4">Bài viết nổi bật</h2>
      <div class="row g-4">
        <div
          class="col-md-6"
          v-for="post in posts"
          :key="post.id"
        >
          <div class="card h-100">
            <img
              :src="post.banner || 'https://via.placeholder.com/400x220?text=No+Image'"
              class="card-img-top"
              :alt="post.title"
              style="height: 220px; object-fit: cover;"
            >
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text">{{ post.about }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <!-- Footer -->
<footer class="bg-dark text-light pt-5 pb-4 mt-5">
  <div class="container">
    <div class="row">
      <!-- Giới thiệu -->
      <div class="col-md-4 mb-4">
        <h5 class="text-uppercase fw-bold mb-3">My Blog</h5>
        <p>Chia sẻ kiến thức, kinh nghiệm và những câu chuyện thú vị về lập trình, công nghệ và cuộc sống.</p>
      </div>

      <!-- Liên kết nhanh -->
      <div class="col-md-4 mb-4">
        <h6 class="text-uppercase fw-bold mb-3">Liên kết nhanh</h6>
        <ul class="list-unstyled">
          <li><a href="#" class="text-light text-decoration-none">Trang chủ</a></li>
          <li><a href="#" class="text-light text-decoration-none">Giới thiệu</a></li>
          <li><a href="#" class="text-light text-decoration-none">Bài viết</a></li>
          <li><a href="#" class="text-light text-decoration-none">Liên hệ</a></li>
        </ul>
      </div>

      <!-- Liên hệ -->
      <div class="col-md-4 mb-4">
        <h6 class="text-uppercase fw-bold mb-3">Liên hệ</h6>
        <p><i class="bi bi-envelope-fill me-2"></i>contact@myblog.com</p>
        <p><i class="bi bi-phone-fill me-2"></i>+84 123 456 789</p>
        <div class="d-flex gap-3 mt-3">
          <a href="#" class="text-light fs-5"><i class="bi bi-facebook"></i></a>
          <a href="#" class="text-light fs-5"><i class="bi bi-twitter"></i></a>
          <a href="#" class="text-light fs-5"><i class="bi bi-instagram"></i></a>
          <a href="#" class="text-light fs-5"><i class="bi bi-github"></i></a>
        </div>
      </div>
    </div>

    <hr class="border-light" />
    <div class="text-center small">
      © 2025 My Blog. Được thiết kế bằng Bootstrap 5.
    </div>
  </div>
</footer>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Navbar from '../components/Navbar.vue';

const posts = ref([]);

const fetchPosts = async () => {
  try {
    const response = await axios.get('http://localhost:3001/posts');
    posts.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error);
  }
};

onMounted(fetchPosts);
</script>