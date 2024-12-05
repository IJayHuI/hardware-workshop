<script setup>
  import { ref } from 'vue'
  import { useLoadingStore } from '../pinia'
  import axios from 'axios'

  const topThreeProducts = ref([])

  useLoadingStore().homeTopThreeLoading = false
  axios
    .get('/server/hardware-workshop-homes?filters[priority][$lt]=4&populate=product&populate=image')
    .then((response) => {
      response.data.data.forEach((product) => {
        topThreeProducts.value.push({
          image: product.image.url,
          model: product.product.model,
          name: product.product.name,
          subtitle: product.subtitle,
          whiteFontColor: product.whiteFontColor,
          id: product.product.documentId
        })
      })
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => (useLoadingStore().homeTopThreeLoading = true))
</script>
<template>
  <div class="top-three">
    <template v-for="topThreeProduct in topThreeProducts">
      <router-link :to="'/product-detail?model=' + topThreeProduct.model" class="link">
        <img :src="'https://server.jayhu.site/' + topThreeProduct.image" />
        <div class="info">
          <h1 :style="topThreeProduct.whiteFontColor ? 'color: white' : 'color: black'" style="font-size: 56px">{{ topThreeProduct.name }}</h1>
          <p :style="topThreeProduct.whiteFontColor ? 'color: white' : 'color: black'" style="font-size: 28px" v-if="topThreeProduct.subtitle != null">{{ topThreeProduct.subtitle }}</p>
          <Button style="text-decoration: none; margin-top: 10px" label="进一步了解" severity="info" rounded></Button>
        </div>
      </router-link>
    </template>
  </div>
</template>
<style scoped>
  .top-three {
    width: 100%;
    display: grid;
    gap: 12px;
  }
  .link {
    width: 100%;
    height: 692px;
    position: relative;
  }

  .link img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .info {
    position: absolute;
    left: 0;
    top: 55px;
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
