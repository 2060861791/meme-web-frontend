<template>
    <!-- 预加载组件不渲染任何可见内容 -->
</template>

<script setup>
    import { onMounted, provide, ref } from 'vue'

    // 导入所有需要预加载的图片路径
    import logoImage from '@/assets/images/qrcode.jpg'
    import bilibiliImage from '@/assets/images/B站.jpg'
    import xianyuImage from '@/assets/images/闲鱼.jpg'
    import xiaohongshuImage from '@/assets/images/小红书.jpg'

    // 创建图片缓存管理器，只存储已加载状态
    const imageCacheMap = ref(new Map())

    // 需要优先加载的图片（preload）
    const preloadImages = [
        logoImage,
    ]

    // 后台预加载的图片（prefetch）
    const prefetchImages = [
        bilibiliImage,
        xianyuImage,
        xiaohongshuImage
    ]

    // 检查图片是否已缓存
    const isImageCached = (src) => {
        return imageCacheMap.value.has(src)
    }

    // 将图片添加到缓存
    const addImageToCache = (src) => {
        imageCacheMap.value.set(src, true)
        console.log(`Added to cache: ${src}`)
    }

    // 从缓存获取图片
    const getCachedImage = (src) => {
        return { src }
    }

    // 在组件挂载时进行图片预加载
    const preloadImageFn = (src) => {
        // 如果图片已缓存，直接返回
        if (isImageCached(src)) {
            console.log(`Using cached image: ${src}`)
            return Promise.resolve({ src })
        }

        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = src
            img.onload = () => {
                addImageToCache(src)
                // 返回原始URL，而不是img对象
                resolve({ src })
            }
            img.onerror = () => reject(src)
        })
    }

    // 优先加载重要图片
    const preloadPriorityImages = () => {
        preloadImages.forEach(src => {
            preloadImageFn(src)
                .then(() => console.log(`Preloaded: ${src}`))
                .catch(() => console.warn(`Failed to preload: ${src}`))
        })
    }

    // 后台加载次要图片
    const prefetchBackgroundImages = () => {
        const prefetcher = () => {
            let index = 0

            const loadNext = () => {
                if (index >= prefetchImages.length) return

                const src = prefetchImages[index++]
                preloadImageFn(src)
                    .then(() => {
                        console.log(`Prefetched: ${src}`)
                        // 递归加载下一张图片
                        setTimeout(loadNext, 300) // 间隔300ms加载下一张，避免阻塞主线程
                    })
                    .catch(() => {
                        console.warn(`Failed to prefetch: ${src}`)
                        // 即使失败也继续加载下一张
                        setTimeout(loadNext, 300)
                    })
            }

            // 开始加载第一张图片
            loadNext()
        }

        // 使用requestIdleCallback在浏览器空闲时进行预加载
        if (window.requestIdleCallback) {
            window.requestIdleCallback(prefetcher)
        } else {
            // 降级处理，使用setTimeout
            setTimeout(prefetcher, 1000)
        }
    }

    // 提供一个全局的图片缓存和预加载方法，供其他组件使用
    provide('imageCache', {
        preloadImage: preloadImageFn,
        isImageCached,
        addImageToCache,
        getCachedImage,
        getCacheSize: () => imageCacheMap.value.size
    })

    // 组件挂载时启动预加载过程
    onMounted(() => {
        // 立即加载重要图片
        preloadPriorityImages()

        // 页面加载完成后开始预加载次要图片
        if (document.readyState === 'complete') {
            prefetchBackgroundImages()
        } else {
            window.addEventListener('load', prefetchBackgroundImages)
        }

        // 监听页面可见性变化，在页面重新可见时检查未完成的预加载图片
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                // 页面变为可见状态，检查并继续预加载
                prefetchBackgroundImages()
            }
        })
    })
</script>