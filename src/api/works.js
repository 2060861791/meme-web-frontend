import api from './config'

// 获取作品列表
export const getWorks = async (params) => {
  try {
    const response = await api.get('/works', { params })
    console.log('后端返回的原始数据:', response.data)

    if (response.data.data) {
      // 直接使用后端返回的数据，不做图片URL处理
      const processedWorks = response.data.data.works

      return {
        status: 200,
        data: {
          works: processedWorks,
          total: response.data.data.total,
          totalPages: response.data.data.totalPages
        }
      }
    }
    return response
  } catch (error) {
    console.error('获取作品列表出错:', error);
    return {
      status: error.response?.status || 500,
      data: {
        works: [],
        total: 0,
        totalPages: 0
      }
    }
  }
}

// 获取筛选选项
export const getFilters = async () => {
  try {
    const response = await api.get('/works/filters')
    return response.data
  } catch (error) {
    return {
      status: 200,
      data: {
        themes: [
          { value: '', label: '全部' },
          { value: 'business', label: '企业官网' },
          { value: 'personal', label: '个人网站' },
          { value: 'shop', label: '电商网站' }
        ],
        features: [
          { value: '', label: '全部' },
          { value: 'responsive', label: '响应式' },
          { value: 'animation', label: '动画效果' },
          { value: 'spa', label: '单页应用' }
        ],
        pageCount: [
          { value: '', label: '全部' },
          { value: '1-3', label: '1-3页' },
          { value: '4-6', label: '4-6页' },
          { value: '7+', label: '7页以上' }
        ],
        price: [
          { value: '', label: '全部' },
          { value: '0-100', label: '100元以下' },
          { value: '100-300', label: '100-300元' },
          { value: '300+', label: '300元以上' }
        ]
      }
    }
  }
}

// 搜索作品
export const searchWorks = async (query) => {
  if (!query || !query.trim()) {
    return {
      status: 200,
      data: []
    }
  }

  try {
    const response = await api.get('/search', { params: { query: query.trim() } })
    console.log('后端返回数据 - 搜索结果:', response.data)

    if (response.data.data) {
      // 直接使用后端返回的数据，不做处理
      return {
        status: 200,
        data: response.data.data
      }
    }
    return response
  } catch (error) {
    return {
      status: error.response?.status || 500,
      data: []
    }
  }
}
