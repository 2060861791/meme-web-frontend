<template>
    <div class="work-list">
        <div class="main-content">
            <el-card v-loading="loading" element-loading-text="加载中..." class="main-card">
                <div class="toolbar">
                    <el-radio-group v-model="sortBy" size="large" @change="handleSortChange">
                        <el-radio-button value="priceAsc" style="margin-right: 10px;">价格从低到高</el-radio-button>
                        <el-radio-button value="priceDesc">价格从高到低</el-radio-button>
                    </el-radio-group>
                </div>

                <div v-if="!loading && works.length === 0" class="no-data">
                    <el-empty :description="noDataText" :image-size="120">
                        <template #image>
                            <el-icon :size="60" color="#909399">
                                <Search />
                            </el-icon>
                        </template>
                    </el-empty>
                </div>

                <div v-else class="works-grid">
                    <el-card v-for="work in works" :key="work.id" class="work-card" shadow="hover"
                        @click="showWorkDetail(work)">
                        <div class="work-thumbnail">
                            <img :src="work.thumbnails[0] || work.thumbnail" :alt="work.title" loading="lazy" />
                            <div class="theme-tag">
                                <el-tag size="small" effect="dark" type="success">{{ work.theme }}</el-tag>
                            </div>
                        </div>
                        <div class="work-content">
                            <h3 class="work-title" :title="work.title">{{ work.title }}</h3>
                            <div class="work-features">
                                <el-tag v-for="feature in work.features" :key="feature" size="small" type="info"
                                    effect="plain" class="feature-tag">
                                    {{ feature }}
                                </el-tag>
                            </div>
                            <div class="work-footer">
                                <div class="work-meta">
                                    <el-tag size="small" type="warning" effect="plain">
                                        <el-icon>
                                            <Document />
                                        </el-icon>
                                        <span>{{ work.pageCount }}页</span>
                                    </el-tag>
                                </div>
                                <div class="price">￥{{ work.price }}</div>
                            </div>
                        </div>
                    </el-card>
                </div>

                <div class="pagination-wrapper" v-if="!loading && total > 0">
                    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total"
                        :page-sizes="[12, 24, 36]" layout="total, sizes, prev, pager, next"
                        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
                </div>
            </el-card>

            <el-dialog v-model="dialogVisible" :title="selectedWork?.title" width="90%" class="work-detail-dialog"
                :fullscreen="isMobile">
                <div class="work-detail">
                    <div class="detail-layout">
                        <!-- 图片展示区 -->
                        <div class="detail-image">
                            <img :src="currentImage" :alt="selectedWork?.title" class="main-image" />
                            <div class="image-nav" v-if="selectedWork?.thumbnails?.length > 1">
                                <el-button circle @click="prevImage" :disabled="currentImageIndex === 0">
                                    <el-icon>
                                        <ArrowLeft />
                                    </el-icon>
                                </el-button>
                                <span class="image-counter">{{ currentImageIndex + 1 }}/{{
                                    selectedWork.thumbnails.length
                                    }}</span>
                                <el-button circle @click="nextImage"
                                    :disabled="currentImageIndex === selectedWork.thumbnails.length - 1">
                                    <el-icon>
                                        <ArrowRight />
                                    </el-icon>
                                </el-button>
                            </div>
                        </div>

                        <!-- 作品信息区 -->
                        <div class="detail-info">
                            <div class="info-section">
                                <div class="info-item">
                                    <label>主题：</label>
                                    <el-tag type="success">{{ selectedWork.theme }}</el-tag>
                                </div>
                                <div class="info-item">
                                    <label>技术特点：</label>
                                    <div class="features-list">
                                        <el-tag v-for="feature in selectedWork.features" :key="feature" type="info"
                                            class="feature-tag">
                                            {{ feature }}
                                        </el-tag>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <label>页面数量：</label>
                                    <span>{{ selectedWork.pageCount }}页</span>
                                </div>
                                <div class="info-item">
                                    <label>价格：</label>
                                    <span class="price">￥{{ selectedWork.price }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogVisible = false">关闭</el-button>
                        <el-button type="primary" @click="handlePurchase">立即购买</el-button>
                    </span>
                </template>
            </el-dialog>

            <!-- 购买弹窗 -->
            <el-dialog v-model="purchaseDialogVisible" title="扫码联系" width="90%" :max-width="360"
                class="purchase-dialog">
                <div class="dialog-content">
                    <div class="qrcode-container">
                        <img :src="qrcodeImage" alt="联系二维码" class="qrcode-image" />
                        <p class="qrcode-tip" style="text-align: center;">扫描上方二维码联系客服</p>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, computed, watchEffect, inject, onBeforeMount } from 'vue'
    import { Document, View, Search, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
    import { getWorks } from '../api/works'
    import { ElMessage } from 'element-plus'
    import qrcodeImage from '../assets/images/qrcode.jpg'

    // 获取图片缓存服务
    const imageCache = inject('imageCache', {
        preloadImage: (src) => Promise.resolve(src),
        isImageCached: () => false,
        addImageToCache: () => { },
        getCacheSize: () => 0
    })

    const works = ref([])
    const total = ref(0)
    const currentPage = ref(1)
    const pageSize = ref(12)
    const loading = ref(false)
    const currentFilter = ref({})
    const dialogVisible = ref(false)
    const selectedWork = ref(null)
    const purchaseDialogVisible = ref(false)
    const sortBy = ref('default')
    const currentImageIndex = ref(0)
    const isMobile = ref(false)

    // 检测是否为移动设备
    const checkMobile = () => {
        isMobile.value = window.innerWidth <= 768
    }

    onBeforeMount(() => {
        checkMobile()
        window.addEventListener('resize', checkMobile)
    })

    const currentImage = computed(() => {
        if (!selectedWork.value?.thumbnails?.length) return '';
        return selectedWork.value.thumbnails[currentImageIndex.value];
    })

    // 图片预加载函数，在切换图片前预加载下一张
    const preloadNextImage = () => {
        if (!selectedWork.value?.thumbnails) return

        const nextIndex = currentImageIndex.value + 1
        if (nextIndex < selectedWork.value.thumbnails.length) {
            const nextImageSrc = selectedWork.value.thumbnails[nextIndex]
            imageCache.preloadImage(nextImageSrc)
                .then((img) => {
                    console.log(`预加载下一张图片成功: ${nextImageSrc}`)
                    // 更新图片元素的src，使用原始URL而不是img.src
                    const imgElement = document.querySelector('.main-image')
                    if (imgElement) {
                        imgElement.src = nextImageSrc
                    }
                })
                .catch(() => console.warn(`预加载下一张图片失败: ${nextImageSrc}`))
        }
    }

    const preloadPrevImage = () => {
        if (!selectedWork.value?.thumbnails) return

        const prevIndex = currentImageIndex.value - 1
        if (prevIndex >= 0) {
            const prevImageSrc = selectedWork.value.thumbnails[prevIndex]
            imageCache.preloadImage(prevImageSrc)
                .then((img) => {
                    console.log(`预加载上一张图片成功: ${prevImageSrc}`)
                    // 更新图片元素的src，使用原始URL而不是img.src
                    const imgElement = document.querySelector('.main-image')
                    if (imgElement) {
                        imgElement.src = prevImageSrc
                    }
                })
                .catch(() => console.warn(`预加载上一张图片失败: ${prevImageSrc}`))
        }
    }

    // 切换图片函数，添加预加载
    const nextImage = () => {
        if (selectedWork.value?.thumbnails && currentImageIndex.value < selectedWork.value.thumbnails.length - 1) {
            currentImageIndex.value++
            const nextImageSrc = selectedWork.value.thumbnails[currentImageIndex.value]

            // 检查图片是否已缓存
            if (imageCache.isImageCached(nextImageSrc)) {
                const cachedImg = imageCache.getCachedImage(nextImageSrc)
                const imgElement = document.querySelector('.main-image')
                if (imgElement) {
                    // 确保使用完整URL而不是相对路径
                    imgElement.src = nextImageSrc
                }
            } else {
                preloadNextImage()
            }
        }
    }

    const prevImage = () => {
        if (currentImageIndex.value > 0) {
            currentImageIndex.value--
            const prevImageSrc = selectedWork.value.thumbnails[currentImageIndex.value]

            // 检查图片是否已缓存
            if (imageCache.isImageCached(prevImageSrc)) {
                const cachedImg = imageCache.getCachedImage(prevImageSrc)
                const imgElement = document.querySelector('.main-image')
                if (imgElement) {
                    // 确保使用完整URL而不是相对路径
                    imgElement.src = prevImageSrc
                }
            } else {
                preloadPrevImage()
            }
        }
    }

    // 添加空数据文本计算属性
    const noDataText = computed(() => {
        if (Object.keys(currentFilter.value).length > 0) {
            return '没有找符合条件的网页模板'
        }
        return '暂无数据'
    })

    // 获取作品列表
    const fetchWorks = async (newPageSize = pageSize.value, filters = {}) => {
        loading.value = true
        try {
            // 移除 undefined 和 null 的参数
            const validFilters = Object.fromEntries(
                Object.entries(filters).filter(([_, v]) => v != null)
            )

            // 添加时间戳参数，防止缓存
            const timestamp = new Date().getTime()
            const res = await getWorks({
                page: currentPage.value,
                pageSize: newPageSize,
                _t: timestamp, // 添加时间戳参数
                ...validFilters
            })
            console.log(res, "res");

            if (res && res.status === 200) {
                works.value = res.data.works || []
                total.value = res.data.total || 0
                const totalPages = res.data.totalPages
                if (currentPage.value > totalPages && totalPages > 0) {
                    currentPage.value = 1
                    await fetchWorks()
                    return
                }
                pageSize.value = newPageSize

                // 预加载第一页作品的首张缩略图
                if (works.value.length > 0) {
                    works.value.slice(0, 4).forEach(work => {
                        if (work.thumbnails && work.thumbnails.length > 0) {
                            imageCache.preloadImage(work.thumbnails[0])
                        } else if (work.thumbnail) {
                            imageCache.preloadImage(work.thumbnail)
                        }
                    })
                }
            } else {
                works.value = []
                total.value = 0
                ElMessage.error('获取作品列表失败')
            }
        } catch (error) {
            console.error('获取作品列表失败:', error)
            works.value = []
            total.value = 0
            ElMessage.error('获取作品表失败')
        } finally {
            loading.value = false
        }
    }

    // 处理搜索结果
    const handleSearchResult = (result) => {
        if (result && result.status === 200) {
            // 直接使用搜索返回的数据
            works.value = result.data
            total.value = result.data.length
            currentPage.value = 1
            loading.value = false
        } else {
            works.value = []
            total.value = 0
            ElMessage.error('搜索失败')
        }
        loading.value = false
    }

    // 处理筛选条件变化
    const handleFilterChange = (filters) => {
        // 解构价格和页数区间参数
        const { priceRange, pageRange, ...otherFilters } = filters

        // 构建新的筛选参数对象
        currentFilter.value = {
            ...otherFilters,
            // 处理价格区间
            ...(handlePriceRange(priceRange)),
            // 处理页数区间
            ...(handlePageRange(pageRange)),
            sortBy: sortBy.value
        }

        // 移除未定义的属性
        Object.keys(currentFilter.value).forEach(key => {
            if (currentFilter.value[key] === undefined) {
                delete currentFilter.value[key];
            }
        });

        currentPage.value = 1
        // 添加时间戳参数，防止缓存
        fetchWorks(pageSize.value, {
            ...currentFilter.value,
            _t: new Date().getTime()
        })
    }

    // 处理价格区间的特殊情
    const handlePriceRange = (priceRange) => {
        if (!priceRange) return {}

        // 处理"50元以上"的情况
        if (priceRange === '50+') {
            return {
                priceMin: 50,
                priceMax: undefined
            }
        }

        // 处理普通区间
        const [min, max] = priceRange.split('-').map(Number)
        return {
            priceMin: min,
            priceMax: max
        }
    }

    // 处理页数区间的特殊情况
    const handlePageRange = (pageRange) => {
        if (!pageRange) return {}

        // 处理"1页"的情况
        if (pageRange === '1') {
            return {
                pageCountMin: 1,
                pageCountMax: 1
            }
        }

        // 处理"10页以上"的情况
        if (pageRange === '10+') {
            return {
                pageCountMin: 10,
                pageCountMax: undefined
            }
        }

        // 处理普通间
        const [min, max] = pageRange.split('-').map(Number)
        return {
            pageCountMin: min,
            pageCountMax: max
        }
    }

    // 处理页码变化
    const handleCurrentChange = (page) => {
        currentPage.value = page
        fetchWorks()
    }

    // 处理每页数量变化
    const handleSizeChange = (size) => {
        pageSize.value = size
        currentPage.value = 1
        fetchWorks()
    }

    // 组件挂载时获取作品列表
    onMounted(() => {
        fetchWorks()
    })

    // 预加载详情页所有图片
    const preloadWorkImages = (work) => {
        if (!work?.thumbnails?.length) return

        // 延迟预加载所有缩略图，但优先加载当前显示的图片
        setTimeout(() => {
            work.thumbnails.forEach((src, index) => {
                // 跳过当前已显示的图片
                if (index === currentImageIndex.value) return

                // 使用图片缓存服务预加载图片
                imageCache.preloadImage(src)
                    .then(() => console.log(`预加载成功: ${src}`))
                    .catch(() => console.warn(`预加载失败: ${src}`))
            })
        }, 500)
    }

    // 监听当前图片索引变化，预加载前后图片
    watchEffect(() => {
        if (selectedWork.value && dialogVisible.value) {
            // 当图片索引变化时，预加载前后图片
            preloadNextImage()
            preloadPrevImage()
        }
    })

    // 显示作品详情
    const showWorkDetail = (work) => {
        console.log("原始作品数据:", work);
        console.log("原始缩略图:", work.thumbnails);

        // 处理缩略图URL
        if (work.thumbnails && work.thumbnails.length) {
            // 创建一个新的数组，避免修改原始数据
            const processedThumbnails = work.thumbnails.map(url => {
                const processed = url;
                console.log(`处理URL: ${url} -> ${processed}`);
                return processed;
            });
            selectedWork.value = { ...work, thumbnails: processedThumbnails };
        } else {
            selectedWork.value = work;
        }
        console.log("处理后的作品数据:", selectedWork.value);
        currentImageIndex.value = 0;
        dialogVisible.value = true;

        // 预加载详情页的所有图片
        preloadWorkImages(selectedWork.value);
    }

    // 处理对话框关闭
    const handleClose = (done) => {
        currentImageIndex.value = 0 // 重置图片索引
        selectedWork.value = null
        done()
    }

    // 处理购买
    const handlePurchase = () => {
        purchaseDialogVisible.value = true
        dialogVisible.value = false
    }

    // 处理购买对话框关闭
    const handlePurchaseDialogClose = (done) => {
        done()
    }

    // 处理排序变化
    const handleSortChange = (value) => {
        sortBy.value = value
        currentPage.value = 1

        // 构建排序参数，默认排序时不传递 sortBy 参数
        const sortParam = value === 'default' ? undefined : value

        // 添加时间戳参数，防止缓存
        fetchWorks(pageSize.value, {
            ...currentFilter.value,
            sortBy: sortParam,
            _t: new Date().getTime()
        })
    }

    // 添加复制功能
    const copyRemark = () => {
        if (selectedWork.value?.title) {
            navigator.clipboard.writeText(selectedWork.value.title)
                .then(() => {
                    ElMessage.success('已复制到剪贴板')
                })
                .catch(() => {
                    ElMessage.error('复制失败，请手动复制')
                })
        }
    }

    defineExpose({
        handleFilterChange,
        handleSearchResult
    })
</script>

<style scoped>
    .dialog-content {
        display: flex;
        flex-direction: column;
        /* 垂直排列 */
        align-items: center;
        /* 水平居中 */
        justify-content: center;
        /* 垂直居中（如果高度固定） */
        min-height: 150px;
        /* 可根据内容调整 */
    }

    .work-list {
        display: flex;
        padding: 0;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
    }

    .main-content {
        flex: 1;
        padding: 0 20px;
    }

    .main-card {
        border-radius: 0;
        margin: 0;
        width: 100%;
        box-shadow: none;
    }

    .main-card :deep(.el-card__body) {
        padding: 10px;
    }

    .toolbar {
        margin-bottom: 15px;
        padding: 10px;
        background: #f5f7fa;
        border-radius: 4px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
    }

    .works-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        margin-bottom: 20px;
    }

    .work-card {
        cursor: pointer;
        transition: all 0.3s;
        border-radius: 4px;
        overflow: hidden;
    }

    .work-card:hover {
        transform: translateY(-5px);
    }

    .work-card :deep(.el-card__body) {
        padding: 0;
    }

    .work-thumbnail {
        position: relative;
        padding-top: 75%;
        overflow: hidden;
    }

    .work-thumbnail img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .theme-tag {
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .work-content {
        padding: 10px;
    }

    .work-title {
        margin: 0 0 8px;
        font-size: 16px;
        color: #303133;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .work-features {
        margin-bottom: 8px;
    }

    .feature-tag {
        margin-right: 6px;
        margin-bottom: 6px;
    }

    .work-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .price {
        font-size: 18px;
        color: #f56c6c;
        font-weight: bold;
    }

    .pagination-wrapper {
        display: flex;
        justify-content: center;
        padding-top: 15px;
    }

    @media screen and (max-width: 1200px) {
        .works-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
        }
    }

    @media screen and (max-width: 768px) {
        .works-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
        }

        .toolbar {
            flex-direction: column;
            align-items: stretch;
            padding: 8px;
            margin-bottom: 10px;
        }

        .el-radio-group {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
        }

        .el-radio-button {
            flex: 1;
            margin-right: 6px;
        }

        .el-radio-button:last-child {
            margin-right: 0;
        }

        .work-title {
            font-size: 14px;
        }

        .price {
            font-size: 16px;
        }

        .work-content {
            padding: 8px;
        }

        .main-card :deep(.el-card__body) {
            padding: 5px;
        }

        .pagination-wrapper {
            padding-top: 10px;
        }
    }

    @media screen and (max-width: 480px) {
        .works-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 6px;
        }

        .work-features {
            margin-bottom: 5px;
        }

        .feature-tag {
            margin-right: 4px;
            margin-bottom: 4px;
            font-size: 10px;
        }

        .work-title {
            font-size: 12px;
            margin: 0 0 5px;
        }

        .price {
            font-size: 14px;
        }

        .work-meta :deep(.el-tag) {
            font-size: 10px;
            padding: 0 4px;
        }
    }

    .work-detail-dialog {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
    }

    .work-detail {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .detail-layout {
        display: flex;
        gap: 20px;
        margin: 10px 0;
        width: 100%;
    }

    .detail-image {
        flex: 1;
        max-width: 60%;
        position: relative;
    }

    .main-image {
        width: 100%;
        height: auto;
        max-height: 60vh;
        object-fit: contain;
        border-radius: 4px;
    }

    .image-nav {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 8px;
        align-items: center;
        background: rgba(255, 255, 255, 0.8);
        padding: 6px;
        border-radius: 20px;
    }

    .image-counter {
        margin: 0 6px;
        color: #606266;
    }

    .detail-info {
        flex: 1;
        max-width: 40%;
    }

    .info-section {
        background: #f5f7fa;
        padding: 15px;
        border-radius: 4px;
    }

    .info-item {
        margin-bottom: 15px;
    }

    .info-item:last-child {
        margin-bottom: 0;
    }

    .info-item label {
        display: block;
        margin-bottom: 6px;
        color: #909399;
        font-size: 14px;
    }

    .features-list {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
    }

    .feature-tag {
        margin-right: 6px;
        margin-bottom: 6px;
    }

    .price {
        font-size: 22px;
        color: #f56c6c;
        font-weight: bold;
    }

    /* 购买弹窗样式 */
    .purchase-dialog {
        text-align: center;
    }

    .qrcode-container {
        padding: 15px;
    }

    .qrcode-image {
        width: 200px;
        height: 200px;
        object-fit: contain;
        max-width: 100%;
    }

    .qrcode-tip {
        margin-top: 12px;
        color: #909399;
        font-size: 14px;
    }

    @media screen and (max-width: 768px) {
        .detail-layout {
            flex-direction: column;
            gap: 10px;
        }

        .detail-image,
        .detail-info {
            max-width: 100%;
        }

        .main-image {
            max-height: 50vh;
        }

        .qrcode-image {
            width: 180px;
            height: 180px;
        }

        .info-section {
            padding: 10px;
        }

        .info-item {
            margin-bottom: 10px;
        }

        .features-list {
            gap: 4px;
        }

        .feature-tag {
            margin-right: 4px;
            margin-bottom: 4px;
        }

        .image-nav {
            bottom: 5px;
            padding: 4px;
        }

        .image-counter {
            margin: 0 4px;
            font-size: 12px;
        }

        .work-detail-dialog :deep(.el-dialog__title) {
            font-size: 16px;
        }

        .work-detail-dialog :deep(.el-dialog__body) {
            padding: 10px;
        }
    }
</style>