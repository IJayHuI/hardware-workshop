import { defineStore } from 'pinia'

import { ref, watch } from 'vue'
import axios from 'axios'

export const useLoadingStore = defineStore('loading', () => {
  const loadingStatus = ref(false)

  const bannerLoading = ref(true)
  const productLoading = ref(true)

  const homeTopThreeLoading = ref(true)
  const homeOtherUnitLoading = ref(true)

  // 定义一个方法来更新 loadingStatus
  const updateHardwareClassLoadingStatus = () => {
    loadingStatus.value = !(bannerLoading.value && productLoading.value)
  }

  const updateHomeLoadingStatus = () => {
    loadingStatus.value = !(homeTopThreeLoading.value && homeOtherUnitLoading.value)
  }

  // 监听 bannerLoading 和 productLoading 的变化
  watch([bannerLoading, productLoading], updateHardwareClassLoadingStatus)
  watch([homeTopThreeLoading, homeOtherUnitLoading], updateHomeLoadingStatus)

  // 初始化时执行一次
  // updateLoadingStatus()

  return {
    loadingStatus,
    bannerLoading,
    productLoading,
    homeTopThreeLoading,
    homeOtherUnitLoading
  }
})

export const useLoginStore = defineStore('login', () => {
  const loginStatus = ref(false)

  const checkStatus = () => {
    loginStatus.value = sessionStorage.getItem('jwt') && sessionStorage.getItem('user') ? true : false
  }
  return {
    loginStatus,
    checkStatus
  }
})

export const usebrowserLastProductStore = defineStore('browserLastProduct', () => {
  const thunmnail = ref('')
  const name = ref('')
  const model = ref('')
  return {
    thunmnail,
    name,
    model
  }
})

export const useCountCartStore = defineStore('countCart', () => {
  const count = ref(0)
  const getCount = () => {
    axios
      .get(`/server/hardware-workshop-carts?filters[user][documentId][$eq]=${JSON.parse(sessionStorage.getItem('user')).documentId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        count.value = response.data.data.length
      })
  }
  return {
    count,
    getCount
  }
})
