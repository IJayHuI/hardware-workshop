<script setup>
  import { watch, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import AppHardwareClassBanner from '../components/AppHardwareClassBanner.vue'
  import AppHardwareClassProduct from '../components/AppHardwareClassProduct.vue'

  const route = useRoute()
  const type = ref()

  const pageType = () => {
    if (route.path == '/cpu') return (type.value = 'CPU')
    else if (route.path == '/mainboard') return (type.value = '主板')
    else if (route.path == '/ram') return (type.value = '内存')
    else if (route.path == '/gpu') return (type.value = '显卡')
    else if (route.path == '/power') return (type.value = '电源')
    else if (route.path == '/harddisk') return (type.value = '硬盘')
    else if (route.path == '/crate') return (type.value = '机箱')
    else if (route.path == '/radiator') return (type.value = '散热器')
    else if (route.path == '/perripheral') return (type.value = '配件')
  }

  pageType()
  watch(
    () => route.path,
    () => {
      pageType()
    }
  )
</script>

<template>
  <h1 class="page-title page-size">{{ type }}</h1>
  <app-hardware-class-banner></app-hardware-class-banner>
  <h1 class="page-second-title page-size">查看所有 {{ type }}</h1>
  <app-hardware-class-product></app-hardware-class-product>
</template>

<style scoped>
  .page-title,
  .page-second-title {
    margin-top: 50px;
    margin-bottom: 50px;
  }

  .page-title {
    font-size: 80px;
  }
  .page-second-title {
    font-size: 56px;
  }
</style>
