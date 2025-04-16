<template>
  <div class="filter-panel">
    <div class="filter-header">
      <h3>筛选条件</h3>
      <el-button icon="ArrowLeft" circle @click="togglePanel" size="small" title="隐藏筛选器" />
    </div>
    <el-form :model="filterOptions" label-position="top" ref="filterForm">
      <el-form-item label="主题">
        <el-select v-model="filterOptions.theme" placeholder="全部主题" clearable>
          <el-option v-for="item in filters.themes" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="技术特点">
        <el-select v-model="filterOptions.features" placeholder="全部特点" clearable multiple collapse-tags
          collapse-tags-tooltip>
          <el-option v-for="item in filters.features" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="页面数量">
        <el-select v-model="filterOptions.pageRange" placeholder="全部页数" clearable>
          <el-option v-for="item in filters.pageCount" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="价格范围">
        <el-select v-model="filterOptions.priceRange" placeholder="全部价格" clearable>
          <el-option v-for="item in filters.price" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="applyFilters">应用筛选</el-button>
        <el-button @click="resetFilters">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted, defineEmits, defineProps } from 'vue'
  import { getFilters } from '../api/works'
  import { ArrowLeft } from '@element-plus/icons-vue' // 引入图标

  const filters = reactive({
    themes: [],
    features: [],
    pageCount: [],
    price: []
  })

  const filterOptions = ref({
    theme: '',
    features: [],
    pageRange: '',
    priceRange: ''
  })

  const emit = defineEmits(['filter-change', 'toggle-visibility']) // 声明事件

  const fetchFilters = async () => {
    try {
      const res = await getFilters()
      filters.themes = res.data.themes || []
      filters.features = res.data.features || []
      filters.pageCount = res.data.pageCount || []
      filters.price = res.data.price || []
    } catch (error) {
      console.error("获取筛选选项失败:", error)
    }
  }

  const applyFilters = () => {
    emit('filter-change', { ...filterOptions.value })
  }

  const resetFilters = () => {
    filterOptions.value = {
      theme: '',
      features: [],
      pageRange: '',
      priceRange: ''
    }
    emit('filter-change', {})
  }

  // 新增：触发隐藏/显示事件
  const togglePanel = () => {
    emit('toggle-visibility')
  }

  onMounted(() => {
    fetchFilters()
  })
</script>

<style scoped>
  .filter-panel {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e4e7ed;
  }

  .filter-header h3 {
    margin: 0;
    font-size: 18px;
    color: #303133;
  }

  .filter-panel :deep(.el-form-item) {
    margin-bottom: 15px;
  }

  .filter-panel :deep(.el-select) {
    width: 100%;
  }

  .filter-panel :deep(.el-button) {
    margin-right: 10px;
  }

  .filter-panel :deep(.el-button:last-child) {
    margin-right: 0;
  }

  @media screen and (max-width: 768px){
    .filter-header{
      display:  none;
    }
  }
</style>