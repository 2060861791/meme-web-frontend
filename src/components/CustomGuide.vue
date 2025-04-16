<template>
  <div class="custom-guide">
    <el-card class="guide-card">
      <template #header>
        <div class="card-header">
          <h2>为什么选择我们的网页设计服务？</h2>
        </div>
      </template>

      <div class="comparison-table">
        <div class="table-header">
          <div class="col">功能对比</div>
          <div class="col">免费作品</div>
          <div class="col">其他平台网页</div>
          <div class="col">本站网页成品</div>
          <div class="col">根据要求定做</div>
        </div>

        <div v-for="(row, index) in tableData" :key="index" class="table-row">
          <div class="col">{{ row.feature }}</div>
          <div class="col" :class="{ 'highlight': row.free === '✅' }">{{ row.free }}</div>
          <div class="col" :class="{ 'highlight': row.other === '✅' }">{{ row.other }}</div>
          <div class="col" :class="{ 'highlight': row.ours.includes('✅') }">{{ row.ours }}</div>
          <div class="col" :class="{ 'highlight': row.custom.includes('✅') }">{{ row.custom }}</div>
        </div>
      </div>

      <div class="guide-content">
        <el-alert title="全栈支持，满足你的定制化需求！本网站所有出售网页成品均为原创作品。" type="success" :closable="false" show-icon
          class="custom-alert" />
        <el-alert title="本站网页成品不包含修改和教学服务,如需帮忙修改另外收费或定制!" type="warning" :closable="false" show-icon
          class="custom-alert" />

        <el-divider />

        <h3>其他开发</h3>
        <ul>
          <li>Node.js、PHP、ASP、JSP、React、Vue、jQuery：支持快速搭建高性能后端与动态网页。</li>
          <li>ElementUI、Echarts、Bootstrap、uPlot：交互图表与响应式设计，适配各类设备。</li>
        </ul>

        <el-divider />

        <h4>定制化服务流程</h4>
        <div class="process-flow">
          <div class="process-step">
            <el-icon>
              <ChatLineRound />
            </el-icon>
            <div class="step-content">
              <div class="step-number">1</div>
              <div class="step-text">沟通需求：明确网页功能和设计要求</div>
            </div>
          </div>
          <div class="process-step">
            <el-icon>
              <Document />
            </el-icon>
            <div class="step-content">
              <div class="step-number">2</div>
              <div class="step-text">确认细节：根据提供的参考案例或设计图，定制符合需求的页面与功能</div>
            </div>
          </div>
          <div class="process-step">
            <el-icon>
              <Wallet />
            </el-icon>
            <div class="step-content">
              <div class="step-number">3</div>
              <div class="step-text">支付方式：支持闲鱼、微信、支付宝，预付定金后开始制作</div>
            </div>
          </div>
          <div class="process-step">
            <el-icon>
              <SetUp />
            </el-icon>
            <div class="step-content">
              <div class="step-number">4</div>
              <div class="step-text">项目开发：实时沟通调整，确保最终效果符合预期</div>
            </div>
          </div>
          <div class="process-step">
            <el-icon>
              <Check />
            </el-icon>
            <div class="step-content">
              <div class="step-number">5</div>
              <div class="step-text">交付验收：提供源代码和技术支持，包含后期优化指导</div>
            </div>
          </div>
        </div>

        <el-divider />

        <h4>联系方式（长按或右键保存）</h4>
        <p>沟通渠道：闲鱼、小红书、微信、B站</p>
        <div class="contact-images">
          <div class="contact-item">
            <img src="@/assets/images/闲鱼.jpg" alt="闲鱼" class="contact-image" loading="lazy" />
            <span class="contact-label">闲鱼</span>
          </div>
          <div class="contact-item">
            <img src="@/assets/images/小红书.jpg" alt="小红书" class="contact-image" loading="lazy" />
            <span class="contact-label">小红书</span>
          </div>
          <div class="contact-item">
            <img src="@/assets/images/qrcode.jpg" alt="微信二维码" class="contact-image qrcode" />
            <span class="contact-label">微信</span>
          </div>
          <div class="contact-item">
            <img src="@/assets/images/B站.jpg" alt="B站" class="contact-image qrcode" />
            <span class="contact-label">B站</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
  import { onMounted, inject } from 'vue'

  const tableData = [
    {
      feature: '作品原创度',
      free: '❌',
      other: '❌',
      ours: '✅ 可自行修改',
      custom: '✅ 完全按照要求定制'
    },
    {
      feature: '作品重复率',
      free: '极高',
      other: '高',
      ours: '极低',
      custom: '不重复'
    },
    {
      feature: '作品达标率',
      free: '自己把控',
      other: '自己把控',
      ours: '自己把控',
      custom: '完全符合要求'
    },
    {
      feature: '网页难易度',
      free: '自己把控',
      other: '自己把控',
      ours: '符合学生水平',
      custom: '符合学生水平'
    }
  ]

  // 获取图片缓存服务
  const imageCache = inject('imageCache', {
    preloadImage: (src) => Promise.resolve(src),
    isImageCached: () => false,
    addImageToCache: () => { },
    getCacheSize: () => 0
  })

  // 在组件挂载时预加载联系方式图片
  onMounted(() => {
    // 获取所有联系方式图片
    const contactImages = document.querySelectorAll('.contact-image')

    // 使用缓存服务预加载图片
    contactImages.forEach(img => {
      if (img.src && !imageCache.isImageCached(img.src)) {
        // 为了不阻塞页面渲染，使用setTimeout延迟加载
        setTimeout(() => {
          imageCache.preloadImage(img.src)
            .then(() => console.log(`联系方式图片预加载成功: ${img.src}`))
            .catch(() => console.warn(`联系方式图片预加载失败: ${img.src}`))
        }, 1000)
      }
    })
  })
</script>

<style scoped>
  .custom-guide {
    padding: 20px;
  }

  .guide-card {
    background: #fff;
    border-radius: 8px;
  }

  .card-header h2 {
    margin: 0;
    font-size: 18px;
    color: #303133;
  }

  .comparison-table {
    margin: 20px 0;
    border: 1px solid #ebeef5;
    border-radius: 4px;
  }

  .table-header {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    background: #f5f7fa;
    border-bottom: 1px solid #ebeef5;
  }

  .table-row {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    border-bottom: 1px solid #ebeef5;
  }

  .table-row:last-child {
    border-bottom: none;
  }

  .col {
    padding: 12px;
    text-align: center;
    font-size: 14px;
    color: #606266;
  }

  .highlight {
    color: #67c23a;
    font-weight: bold;
  }

  .process-flow {
    margin: 20px 0;
  }

  .process-step {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 15px;
    background: #f5f7fa;
    border-radius: 8px;
    transition: all 0.3s;
  }

  .process-step:hover {
    transform: translateX(10px);
    background: #ecf5ff;
  }

  .step-content {
    margin-left: 15px;
    display: flex;
    align-items: center;
  }

  .step-number {
    width: 24px;
    height: 24px;
    background: #409eff;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }

  .step-text {
    font-size: 14px;
    color: #606266;
  }

  .contact-info {
    margin-top: 20px;
    padding: 20px;
    background: #f5f7fa;
    border-radius: 8px;
  }

  .contact-images {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }

  .contact-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s;
    padding: 10px;
    border-radius: 8px;
  }

  .contact-item:hover {
    background: #f5f7fa;
    transform: translateY(-5px);
  }

  .contact-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .contact-image.qrcode {
    padding: 4px;
    background: #fff;
  }

  .contact-label {
    margin-top: 8px;
    color: #606266;
    font-size: 14px;
  }

  @media screen and (max-width: 768px) {
    .contact-images {
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      padding: 15px;
    }

    .contact-image {
      width: 60px;
      height: 60px;
    }

    .contact-label {
      font-size: 12px;
    }
  }

  @media screen and (max-width: 480px) {
    .contact-images {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      padding: 10px;
    }
  }

  .custom-alert {
    margin: 20px 0;
  }
</style>