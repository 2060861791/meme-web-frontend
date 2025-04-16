import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例，使用相对路径
const api = axios.create({
  baseURL: '/api',  // 保持相对路径，让 Nginx 处理代理
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  },
  // 允许跨域携带cookie
  withCredentials: true
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 添加时间戳参数，防止缓存
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: new Date().getTime()
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          ElMessage.error('访问未授权，请检查接口配置')
          break
        case 404:
          ElMessage.error('请求的资源不存在')
          break
        default:
          ElMessage.error('网络请求失败，请稍后重试')
      }
    } else if (error.code === 'ECONNABORTED') {
      ElMessage.error('请求超时，请检查网络连接')
    } else {
      ElMessage.error('网络连接失败，请检查网络设置')
    }
    return Promise.reject(error)
  }
)

export default api 