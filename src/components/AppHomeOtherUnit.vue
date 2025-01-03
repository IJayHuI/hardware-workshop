<script setup>
  import axios from 'axios'
  import { ref } from 'vue'
  import { useLoadingStore } from '../pinia'

  const otherUnitProducts = ref([])

  useLoadingStore().homeOtherUnitLoading = false
  axios
    .get('/server/hardware-workshop-homes?sort[0]=priority:asc&filters[priority][$gt]=3&populate=product&populate=image')
    .then((response) => {
      otherUnitProducts.value = response.data.data
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => (useLoadingStore().homeOtherUnitLoading = true))
</script>

<template>
  <div class="other-unit">
    <template v-for="otherUnitProduct in otherUnitProducts">
      <router-link :to="'/product-detail?model=' + otherUnitProduct.product.model" class="link">
        <img :src="'https://strapi.jayhu.site/' + otherUnitProduct.image.url" />
        <div class="info">
          <h1 :style="otherUnitProduct.whiteFontColor ? 'color: white' : 'color: black'" style="font-size: 40px; text-align: center">{{ otherUnitProduct.product.name }}</h1>
          <p :style="otherUnitProduct.whiteFontColor ? 'color: white' : 'color: black'" style="font-size: 21px; text-align: center" v-if="otherUnitProduct.subtitle != null">{{ otherUnitProduct.subtitle }}</p>
          <Button style="text-decoration: none; margin-top: 10px" label="进一步了解" severity="info" rounded></Button>
        </div>
      </router-link>
    </template>
  </div>
</template>
<style scoped>
  .other-unit {
    width: 100%;
    display: grid;
    gap: 12px;
    grid-template-columns: 1fr 1fr;
    padding: 12px;
  }
  .link {
    width: 100%;
    height: 580px;
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
