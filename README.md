# meme网页.site的前端服务

## 🖼 项目名称：meme网站作品展示与管理前端

这是一个作品展示和售卖的Vue3前端项目，旨在展示网页设计作品，提供筛选、预览和购买功能。本项目采用Vue3 + Element Plus构建，并已集成自动部署流程，通过Docker容器化部署。

------

## ✨ 功能特性

- **响应式设计**：适配PC端和移动端不同屏幕尺寸
- **作品展示**：网格布局展示设计作品
- **筛选系统**：按主题、技术特点、页面数量和价格范围进行筛选
- **搜索功能**：支持作品关键词搜索
- **预览功能**：查看作品详情和多张预览图
- **图片预加载**：提升用户浏览体验
- **价格排序**：支持价格升序和降序排列
- **在线购买**：扫码联系客服进行购买
- **定制说明**：提供网页定制流程指南
- **售后服务**：提供售后服务说明
- **已配置 GitHub Actions 自动部署**：Push 到 main 分支后自动部署到服务器

------

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <你的Git仓库地址>
cd <项目目录>
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

### 4. 构建生产版本

```bash
npm run build
```

### 5. 预览生产构建

```bash
npm run preview
```

------

## 🔧 自动化部署

项目已配置GitHub Actions实现自动部署，当推送代码到main分支时，会自动触发以下工作流：

1. 拉取最新代码
2. 构建Docker镜像
3. 导出并压缩Docker镜像
4. 将镜像上传至服务器
5. 在服务器上加载镜像并启动容器

详细配置请参见 `.github/workflows/deploy.yml` 文件。

------

## 📦 技术栈

- **Vue 3**：核心框架
- **Vue Router**：路由管理
- **Element Plus**：UI组件库
- **Axios**：HTTP请求客户端
- **VueUse**：Vue组合式API工具集
- **Vite**：构建工具
- **Docker**：容器化部署
- **Nginx**：静态资源服务和API代理

------

## 📁 项目结构

```
├── src/                  # 源代码目录
│   ├── api/              # API请求模块
│   ├── assets/           # 静态资源
│   ├── components/       # 公共组件
│   ├── router/           # 路由配置
│   ├── styles/           # 全局样式
│   ├── views/            # 页面视图
│   ├── App.vue           # 根组件
│   └── main.js           # 入口文件
├── public/               # 公共静态资源
├── .github/workflows/    # GitHub Actions配置
├── .env.development      # 开发环境变量
├── .env.production       # 生产环境变量
├── Dockerfile            # Docker构建配置
├── nginx.conf            # Nginx配置
└── vite.config.js        # Vite配置
```

------

## 📱 页面与路由

- **首页 (`/`)**：作品展示页面，支持筛选和搜索
- **定制指南 (`/custom-guide`)**：网页定制流程说明
- **售后服务 (`/after-sales`)**：售后服务和政策说明

------

## 🔌 API接口集成

前端通过Axios与后端API通信，主要接口包括：

- **获取作品列表**：`GET /api/works`
- **获取筛选选项**：`GET /api/works/filters`
- **搜索作品**：`GET /api/search`

Nginx配置自动将API请求代理到后端服务。

------

## 🐳 Docker部署

项目使用Docker实现容器化部署，通过多阶段构建优化镜像大小：

1. 第一阶段：在Node.js环境中构建Vue应用
2. 第二阶段：使用Nginx提供静态资源服务，并配置API代理

运行容器：

```bash
docker build -t meme-frontend .
docker run -d -p 8080:80 --name meme-website meme-frontend
```

------

## 📢 说明

本项目为网页设计售卖平台的前端部分，需要配合对应的后端服务使用。项目结合了现代前端技术和最佳实践，提供了良好的用户体验和管理功能。 