<template>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-info">
        <p class="copyright">© {{ currentYear }} meme网页 版权所有</p>
        <p class="icp">
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">
            蜀ICP备2025132408号-1
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
  import { computed } from 'vue'

  const currentYear = computed(() => new Date().getFullYear())

  const handleContact = () => {
    // 可以添加联系方式或跳转到联系页面
    window.open('http://wpa.qq.com/msgrd?v=3&uin=你的QQ号&site=qq&menu=yes')
  }
</script>

<style scoped>
  .site-footer {
    background: #fff;
    padding: 20px 0;
    margin-top: auto;
    border-top: 1px solid #e4e7ed;

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      text-align: center;
    }

    .footer-links {
      margin-bottom: 15px;

      a {
        color: #606266;
        text-decoration: none;
        margin: 0 15px;
        font-size: 14px;

        &:hover {
          color: #409EFF;
        }
      }
    }

    .footer-info {
      color: #909399;
      font-size: 12px;

      p {
        margin: 5px 0;
      }

      .icp {
        a {
          color: #909399;
          text-decoration: none;

          &:hover {
            color: #606266;
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .site-footer {
      padding: 15px 0;

      .footer-links {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px;

        a {
          margin: 0 10px;
        }
      }
    }
  }
</style>