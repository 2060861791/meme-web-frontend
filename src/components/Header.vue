<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <h1>meme网页</h1>
      </div>
      <nav class="nav-desktop">
        <el-menu mode="horizontal" :ellipsis="false" router>
          <div class="menu-items">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/custom-guide">售前说明</el-menu-item>
            <el-menu-item index="/after-sales">使用声明</el-menu-item>
          </div>
        </el-menu>
      </nav>
      <div class="nav-mobile">
        <el-button @click="showMenu = true">
          <el-icon>
            <Menu />
          </el-icon>
        </el-button>
      </div>
    </div>

    <el-drawer v-model="showMenu" direction="rtl" size="70%">
      <template #header>
        <h2 class="drawer-title">菜单导航</h2>
      </template>
      <el-menu mode="vertical" router @select="showMenu = false">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/custom-guide">售前说明</el-menu-item>
        <el-menu-item index="/after-sales">使用声明</el-menu-item>
      </el-menu>
    </el-drawer>
  </header>
</template>

<script setup>
  import { ref } from 'vue'
  import { Menu } from '@element-plus/icons-vue'

  const showMenu = ref(false)
</script>

<style scoped>
  .header {
    height: 60px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .header-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    margin: 0 auto;
    position: relative;
  }

  .logo {
    position: absolute;
    left: 30px;
    z-index: 1000;
  }

  .logo h1 {
    margin: 0;
    font-size: 20px;
    color: #409EFF;
  }

  .nav-desktop {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .nav-desktop .el-menu {
    border-bottom: none;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .nav-desktop .menu-items {
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  .nav-mobile {
    display: none;
  }

  .drawer-title {
    margin: 0;
    font-size: 18px;
    color: #303133;
  }

  @media screen and (max-width: 768px) {
    .header {
      height: 50px;
    }

    .nav-desktop {
      display: none;
    }

    .nav-mobile {
      display: block;
      position: absolute;
      right: 20px;
    }

    .logo {
      position: static;

      h1 {
        font-size: 18px;
      }
    }

    .header-container {
      justify-content: center;
    }
  }
</style>