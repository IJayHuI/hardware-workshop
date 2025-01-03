<script setup>
  import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
  import { useRoute } from 'vue-router'
  import { useLoadingStore } from '../pinia'
  import axios from 'axios'

  const route = useRoute()
  const currentIndex = ref(1) // 从克隆的第一张开始
  const bannerData = ref([])

  const bannerWidth = ref('100%') // 用来控制遮罩的宽度
  const bannerRadius = ref('0px')

  let timer

  // 获取数据并插入克隆的最后一张
  const getDatas = (path) => {
    clearInterval(timer)
    useLoadingStore().bannerLoading = false
    axios
      .get(`/server/hardware-workshop-banners?populate=image&filters[type][$eq]=${path}`)
      .then((response) => {
        const rawData = []
        if (response.data.data && response.data.data.length > 0 && response.data.data[0].image) {
          response.data.data[0].image.forEach((image) => {
            rawData.push('https://strapi.jayhu.site' + image.url)
          })
        }
        // 克隆最后一张图片到最前面
        bannerData.value = [
          rawData[rawData.length - 1], // 克隆的最后一张
          ...rawData
        ]
        if (bannerData.value.length > 2) startCarousel()
      })
      .finally(() => {
        setTimeout(() => (useLoadingStore().bannerLoading = true), 500)
      })
  }

  getDatas(route.path.substring(1))

  watch(
    () => route.path,
    () => {
      getDatas(route.path.substring(1))
    }
  )

  // 启动轮播
  const startCarousel = () => {
    timer = setInterval(() => {
      document.querySelector('.itemList').style.transition = 'transform .5s ease-in-out'
      currentIndex.value++
      if (currentIndex.value === bannerData.value.length - 1) {
        setTimeout(() => {
          document.querySelector('.itemList').style.transition = 'none'
          currentIndex.value = 0
        }, 500)
      }
    }, 4000)
  }

  // 处理滚动事件
  const handleScroll = () => {
    const scrollY = window.scrollY
    if (scrollY < 400 && scrollY > 100) {
      bannerWidth.value = `${100 - (scrollY - 100) / 30}%`
      bannerRadius.value = `${(scrollY - 100) / 8}px`
    }
  }

  onMounted(() => {
    // 监听滚动事件
    window.addEventListener('scroll', handleScroll)
  })

  onBeforeUnmount(() => {
    clearInterval(timer)
    window.removeEventListener('scroll', handleScroll)
  })
</script>

<template>
  <div class="container banner-size" :style="{ width: bannerWidth, borderRadius: bannerRadius }">
    <div class="itemList" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div class="item" v-for="(item, index) in bannerData" :key="index">
        <img :src="item" alt="carousel image" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .banner-size {
    max-width: 1920px;
    height: 600px;
    margin: auto;
  }

  .container {
    overflow: hidden;
    position: relative;
  }

  .itemList {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .item {
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
  }

  .item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
</style>
