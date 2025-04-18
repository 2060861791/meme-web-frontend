# 🖼 meme网站作品展示与管理前台（前端）

## 🎨 项目简介

网站前台旨在展示网页设计作品，提供筛选、预览和购买功能。本项目采用Vue3 + Element Plus构建，并已集成自动部署流程，通过Docker容器化部署。

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
git clone <Git仓库地址>
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

## 🔧 自动化部署（已更新）

原本项目使用 GitHub Actions 实现自动部署，流程包括：

1. 构建 Docker 镜像并打包为 `.tar` 文件
2. 将压缩后的镜像通过 `scp` 上传至服务器
3. 在服务器解压并运行容器

⚠️ **该方式存在构建慢、传输慢的问题（总耗时约 10 分钟），现已废弃。**

------

✅ 当前部署方式（部署时间缩短至 40 秒内）

现在采用更高效的部署流程，结合 GitHub Actions 和服务器本地构建，大幅提升效率：

1. 在 GitHub 仓库中配置了 SSH 私钥（通过 `Secrets` 管理），并启用了 `actions/checkout` 直接拉取源码
2. 自动登录服务器并执行如下部署流程：
   - 进入项目目录，`git pull` 获取最新代码
   - 使用服务器本地的 `Dockerfile` 构建镜像
   - 重启容器，完成部署

该方式避免了远程打包上传 `.tar` 文件的环节，整体部署耗时已从 **10 分钟+ 降低至约 60 秒**。

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

本项目为网页设计售卖平台的前端展示部分，需配合对应的后台管理系统与后端服务使用。整体项目融合了现代前端技术栈与最佳实践，致力于提供良好的用户浏览体验与便捷的内容管理能力。

> ⚠️ 本项目及相关代码仅为**个人学习与项目练习**使用。

### 🔗 项目结构与相关仓库

以下是该平台相关的项目仓库链接：

- **🖼 前台展示页面（当前项目）：**
   [meme-web-frontend](https://github.com/2060861791/meme-web-frontend)
- 🛠 后台管理系统（后台项目）：
   [meme-web-admin](https://github.com/2060861791/meme-web-admin)
- ⚙️ 后端服务（API接口与业务逻辑）：
   [meme-web-server](https://github.com/2060861791/meme-web-server)