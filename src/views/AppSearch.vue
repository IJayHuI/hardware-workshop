<script setup>
  import { ref, watch } from 'vue'
  import { useLoadingStore } from '../pinia'
  import { useRoute } from 'vue-router'
  import router from '../router'

  import axios from 'axios'

  const route = useRoute()
  const searchProducts = ref([])

  const getDatas = (search) => {
    searchProducts.value = []
    useLoadingStore().loadingStatus = true
    axios
      .get(`/server/hardware-workshop-products?populate=mainThumbnail&filters[name][$containsi]=${search}`)
      .then((response) => {
        searchProducts.value = response.data.data
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setTimeout(() => (useLoadingStore().loadingStatus = false), 500)
      })
  }

  getDatas(route.query.search)
  watch(
    () => route.query.search,
    () => {
      getDatas(route.query.search)
    }
  )
</script>
<template>
  <h1 class="page-size title">
    搜索 {{ route.query.search }}
    <br />
    一共找到 {{ searchProducts.length }} 个结果。
  </h1>
  <div class="products page-size">
    <Card class="product" v-for="searchProduct in searchProducts" :key="searchProduct.id" @click="router.push('/product-detail?model=' + searchProduct.model)">
      <template #header>
        <div v-if="searchProduct.mainThumbnail" class="product-thumbnail"><img :src="`https://strapi.jayhu.site${searchProduct.mainThumbnail.url}`" alt="product thumbnail" /></div>
      </template>
      <template #title>
        <p>{{ searchProduct.name }}</p>
      </template>
      <template #footer>
        <h2>RMB {{ searchProduct.price }}</h2>
      </template>
    </Card>
  </div>
</template>
<style scoped>
  .title {
    padding: 40px 0;
  }

  .products {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 275px));
  }
  .product {
    overflow: hidden;
    transition: outline 0.32s;
    outline: 0 solid var(--p-card-background);
  }

  .product:hover {
    outline: 3px solid var(--p-content-color);
  }

  .product-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
