<template>
  <div class="home-container">
    <aside class="app-sidebar" :class="{ 'sidebar-mobile': showMobileFilter, 'sidebar-hidden': !isSidebarVisible }">
      <FilterPanel @filter-change="handleFilterChange" @search-result="handleSearchResult"
        @toggle-visibility="toggleSidebar" />
    </aside>
    <div v-if="!isSidebarVisible" class="show-sidebar-btn-container">
      <el-button class="show-sidebar-btn" circle icon="ArrowRight" @click="toggleSidebar" title="显示筛选器"></el-button>
    </div>
    <main class="app-main" :class="{ 'main-expanded': !isSidebarVisible }">
      <div class="mobile-filter-btn" @click="toggleMobileFilter">
        <el-button type="primary" size="small">
          <el-icon>
            <Filter />
          </el-icon>
          筛选
        </el-button>
      </div>
      <WorkList ref="workList" />
    </main>
    <!-- 移动端遮罩层 -->
    <div v-if="showMobileFilter" class="mobile-mask" @click="handleMaskClick"></div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { Filter, ArrowRight } from '@element-plus/icons-vue'
  import FilterPanel from '../components/FilterPanel.vue'
  import WorkList from '../components/WorkList.vue'

  const workList = ref(null)
  const showMobileFilter = ref(false)
  const isSidebarVisible = ref(true)

  const handleFilterChange = (filters) => {
    workList.value?.handleFilterChange(filters)
    closeMobileFilter()
  }

  const toggleMobileFilter = () => {
    showMobileFilter.value = !showMobileFilter.value
  }

  const handleSearchResult = (result) => {
    workList.value?.handleSearchResult(result)
    closeMobileFilter()
  }

  const closeMobileFilter = () => {
    if (window.innerWidth <= 768) {
      showMobileFilter.value = false
    }
  }

  const handleMaskClick = () => {
    showMobileFilter.value = false
  }

  const toggleSidebar = () => {
    isSidebarVisible.value = !isSidebarVisible.value
  }
</script>

<style scoped>
  .home-container {
    display: flex;
    width: 100%;
    min-height: calc(100vh - 60px);
    background: #f5f7fa;
    position: relative;
  }

  .app-sidebar {
    width: 280px;
    height: calc(100vh - 60px);
    position: fixed;
    left: 0;
    background: #fff;
    overflow-y: auto;
    padding: 20px;
    box-sizing: border-box;
    border-right: 1px solid #e4e7ed;
    transition: transform 0.3s ease, width 0.3s ease, opacity 0.3s ease;
    z-index: 1500;
  }

  .sidebar-hidden {
    transform: translateX(-100%);
    width: 0;
    padding: 0;
    border-right: none;
    opacity: 0;
    overflow: hidden;
  }

  .show-sidebar-btn-container {
    position: fixed;
    left: 0;
    top: 80px;
    z-index: 1600;
    transition: all 0.3s ease;
  }

  .show-sidebar-btn {
    width: 32px;
    height: 32px;
    border-radius: 0 16px 16px 0;
    box-shadow: 3px 0 8px rgba(0, 0, 0, 0.1);
    border: none;
    background-color: #fff;
    color: #409EFF;
  }

  .app-sidebar::-webkit-scrollbar {
    width: 6px;
  }

  .app-sidebar::-webkit-scrollbar-thumb {
    background: #c0c4cc;
    border-radius: 3px;
  }

  .app-sidebar::-webkit-scrollbar-track {
    background: #f5f7fa;
  }

  .app-main {
    flex: 1;
    margin-left: 280px;
    min-height: calc(100vh - 60px);
    box-sizing: border-box;
    transition: margin-left 0.3s ease;
  }

  .main-expanded {
    margin-left: 0;
  }

  .mobile-filter-btn {
    display: none;
  }

  .mobile-mask {
    display: none;
  }

  @media screen and (max-width: 768px) {
    .app-sidebar {
      transform: translateX(-100%);
      transition: transform 0.3s;
      z-index: 2000;
    }

    .sidebar-mobile {
      transform: translateX(0);
    }

    .app-main {
      margin-left: 0;
    }

    .mobile-filter-btn {
      display: block;
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
    }

    .mobile-mask {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1999;
    }

    .show-sidebar-btn-container {
      display: none;
    }
  }
</style>