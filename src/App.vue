<template>
  <div class="app-layout">
    <ImagePreloader />
    <Header class="app-header" />
    <div class="main-content">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script setup>
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
  import ImagePreloader from './components/ImagePreloader.vue'
</script>

<style scoped>
  .app-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .app-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  .main-content {
    margin-top: 60px;
    flex: 1;
  }

  @media screen and (max-width: 768px) {
    .main-content {
      margin-top: 50px;
    }
  }
</style>