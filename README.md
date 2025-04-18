# 🖼 meme网站作品展示与管理前台（前端）

## 🎨 项目简介

网站前台旨在展示网页设计作品，提供筛选、预览和购买功能。本项目采用Vue3 + Element Plus构建，并已集成自动部署流程，通过Docker容器化部署。

------

## ✨ 功能特性

- 响应式设计：适配各类设备
- 网格展示：支持主题、技术、页数、价格筛选
- 关键词搜索、价格排序、预览详情
- 提供网页定制与售后服务说明
- 在线扫码联系购买
- 图片预加载提升浏览体验
- GitHub Actions 自动部署：Push 到 main 分支即可部署

------

## 🚀 快速启动

```
git clone <Git仓库地址>
cd <项目目录>
npm install
npm run dev # 启动开发环境
npm run build # 构建生产环境
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

## 🔌 后端接口集成

前端通过 Axios 调用后端 API：

- `GET /api/works`：获取作品列表
- `GET /api/works/filters`：获取筛选选项
- `GET /api/search`：关键词搜索

所有请求由 Nginx 代理转发。

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

## 🧩 实际问题与优化

> ❗服务器带宽有限，初期访问图片加载缓慢，严重影响用户体验。

解决方案：

- 后台上传前使用本地工具（如 ImageMagick、Squoosh）将图片压缩为中等质量的 WebP 格式；
- 通过 **腾讯云 CDN** 对静态资源进行加速，显著提升加载速度。

---

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