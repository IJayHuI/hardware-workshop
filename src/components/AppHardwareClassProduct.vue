<script setup>
  import { watch, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useLoadingStore } from '../pinia'
  import axios from 'axios'

  import router from '../router'

  const route = useRoute()
  const products = ref([])

  const getDatas = (path) => {
    useLoadingStore().productLoading = false
    axios
      .get(`/server/hardware-workshop-products?populate=thumbnail&fields[0]=name&fields[1]=price&fields[2]=model&filters[class][$eq]=${path}`)
      .then((response) => {
        products.value = []
        response.data.data.forEach((product) => {
          products.value.push(product)
        })
      })
      .finally(() => {
        setTimeout(
          () => (useLoadingStore().productLoading = true), // 结束 loading
          500
        )
      })
  }

  getDatas(route.path.substring(1))
  watch(
    () => route.path,
    () => {
      getDatas(route.path.substring(1))
    }
  )
</script>
<template>
  <div class="products page-size">
    <Card class="product" v-for="product in products" :key="product.id" @click="router.push('/product-detail?model=' + product.model)">
      <template #header>
        <div class="product-thumbnail"><img :src="`https://server.jayhu.site${product.thumbnail[0].url}`" alt="product thumbnail" /></div>
      </template>
      <template #title>
        <p>{{ product.name }}</p>
      </template>
      <template #footer>
        <h2>RMB {{ product.price }}</h2>
      </template>
    </Card>
  </div>
</template>
<style scoped>
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
