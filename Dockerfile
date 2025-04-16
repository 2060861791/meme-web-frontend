# 1. 使用 Node.js 作为构建环境
FROM node:18-alpine AS builder

# 2. 设置工作目录
WORKDIR /app

# 3. 复制 package.json 和 package-lock.json（加快 npm install）
COPY package*.json ./

# 4. 安装依赖
RUN npm install --frozen-lockfile

# 5. 复制整个项目
COPY . .

# 6. 构建前端项目
RUN npm run build

# 7. 使用 Nginx 作为生产服务器
FROM nginx:alpine

# 8. 复制 Vue 生成的静态文件到 Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# 9. 复制 Nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 10. 暴露端口（Nginx 默认 80 端口）
EXPOSE 80

# 11. 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
