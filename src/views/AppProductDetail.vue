<script setup>
  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useLoadingStore, useLoginStore, usebrowserLastProductStore, useCountCartStore } from '../pinia'

  import Galleria from 'primevue/galleria'
  import { useToast } from 'primevue/usetoast'

  import axios from 'axios'

  const route = useRoute()
  const images = ref([])
  const introductionImages = ref([])
  const summaryInfo = ref({})
  const toast = useToast()

  const getDatas = (model) => {
    useLoadingStore().loadingStatus = true
    axios
      .get(`/server/hardware-workshop-products?populate=thumbnail&populate=introductionImage&filters[model][$eq]=${model}`)
      .then((response) => {
        const data = response.data.data[0]
        images.value = data.thumbnail?.map((image) => ({
          thumbnailImageSrc: 'https://strapi.jayhu.site' + image.url,
          itemImageSrc: 'https://strapi.jayhu.site' + image.url
        }))
        summaryInfo.value = { price: data.price, name: data.name, model: data.model, id: data.documentId }

        usebrowserLastProductStore().thunmnail = 'https://strapi.jayhu.site' + data.thumbnail[0].url
        usebrowserLastProductStore().name = data.name
        usebrowserLastProductStore().model = '/product-detail?model=' + data.model

        data.introductionImage.forEach((image) => {
          introductionImages.value.push(image.url)
        })
        introductionImages.value.sort()
      })
      .finally(() => {
        setTimeout(() => (useLoadingStore().loadingStatus = false), 500)
      })
  }

  getDatas(route.query.model)
  watch(
    () => route.query.model,
    () => {
      getDatas(route.query.model)
    }
  )

  const addToCart = () => {
    // 加入购物车逻辑
    if (!useLoginStore().loginStatus) toast.add({ severity: 'error', summary: '您还未登录', life: 3000 })
    else {
      axios
        .get(`/server/hardware-workshop-carts?filters[user][documentId][$eq]=${JSON.parse(sessionStorage.getItem('user')).documentId}&filters[product][documentId][$eq]=${summaryInfo.value.id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          if (response.data.data.length == 0) {
            axios
              .post(
                '/server/hardware-workshop-carts', // API 路径
                {
                  data: {
                    product: summaryInfo.value.id, // 关联的 HardwareWorkshopProduct 的 documentId
                    count: 1, // 数量
                    user: JSON.parse(sessionStorage.getItem('user')).documentId // 关联的用户 ID
                  }
                },
                {
                  headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json'
                  }
                }
              )
              .then((response) => {
                useCountCartStore().getCount()
                toast.add({ severity: 'success', summary: '添加成功', life: 3000 })
              })
              .catch((error) => {
                toast.add({ severity: 'error', summary: '加入购物车失败', life: 3000 })
              })
          } else toast.add({ severity: 'error', summary: '已添加过该物品', life: 3000 })
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
</script>

<template>
  <div class="page-size">
    <div class="summary-info">
      <Galleria :value="images" thumbnailsPosition="bottom" containerStyle="max-width: 600px; width: 40%">
        <template #item="slotProps">
          <img :src="slotProps.item.itemImageSrc" style="width: 100%" />
        </template>
        <template #thumbnail="slotProps">
          <img :src="slotProps.item.thumbnailImageSrc" style="width: 100px; height: 100px" />
        </template>
      </Galleria>
      <div class="product-info">
        <h1>{{ summaryInfo.name }}</h1>
        <h1>RMB {{ summaryInfo.price }}</h1>
        <Button @click="addToCart" icon="pi pi-shopping-cart" label="加入购物车" severity="success" rounded></Button>
      </div>
    </div>

    <div class="introduction page-size">
      <h1>图文详情</h1>
      <template v-for="introductionImage in introductionImages">
        <img :src="'https://strapi.jayhu.site' + introductionImage" />
      </template>
    </div>
  </div>
</template>

<style scoped>
  .summary-info {
    padding: 40px 0;
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
  .product-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 35px;
  }
  .introduction img {
    width: 100%;
    float: left;
  }
  .page-size {
    width: 80%;
  }
</style>
