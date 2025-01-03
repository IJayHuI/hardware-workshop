<script setup>
  import { ref } from 'vue'
  import { useLoadingStore, useCountCartStore } from '../pinia'

  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import { useToast } from 'primevue/usetoast'

  import axios from 'axios'

  const products = ref([])
  const countRMB = ref(0)
  const toast = useToast()

  const getDatas = (username) => {
    useLoadingStore().loadingStatus = true
    axios
      .get(`/server/hardware-workshop-carts?populate=product.mainThumbnail&filters[user][documentId][$eq]=${username}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        products.value = response.data.data
        countRMB.value = calcRMB(products.value)
      })
      .finally(() => {
        setTimeout(() => (useLoadingStore().loadingStatus = false), 500)
      })
  }
  getDatas(JSON.parse(sessionStorage.getItem('user')).documentId)

  const calcRMB = (products) => {
    let rmb = 0
    products.forEach((product) => {
      rmb += product.product.price * product.count
    })
    return rmb
  }

  const productCount = (data, num) => {
    data.count += num
    countRMB.value = calcRMB(products.value)
    axios
      .put(
        '/server/hardware-workshop-carts/' + data.documentId,
        { data: { count: data.count } },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .catch((error) => {
        console.error(error)
      })
  }

  const deleteProduct = (data) => {
    axios
      .delete('/server/hardware-workshop-carts/' + data.documentId, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (response.status == 204) {
          useCountCartStore().getCount()
          products.value = products.value.filter((product) => product.id != data.id)
          toast.add({ severity: 'success', summary: '删除成功', life: 3000 })
        }
      })
      .catch((error) => {
        console.error(error)
        toast.add({ severity: 'error', summary: '删除失败', life: 3000 })
      })
  }
</script>

<template>
  <h1 class="title" v-if="products.length > 0">您的购物车总计 RMB {{ countRMB }}</h1>
  <h1 class="title" v-else>您的购物车是空的哦</h1>
  <div class="page-size" v-if="products.length > 0">
    <DataTable :value="products" tableStyle="min-width: 50rem">
      <Column>
        <template #body="{ data }">
          <img :src="`https://strapi.jayhu.site${data.product.mainThumbnail.url}`" style="width: 150px; border-radius: 15px" />
        </template>
      </Column>
      <Column header="产品名称">
        <template #body="{ data }">
          <router-link :to="'/product-detail?model=' + data.product.model" class="link">{{ data.product.name }}</router-link>
        </template>
      </Column>
      <Column field="count" header="数量">
        <template #body="{ data }">
          <div class="count">
            <Button @click="productCount(data, -1)" :disabled="data.count <= 1" icon="pi pi-minus" severity="secondary" rounded></Button>
            <span>{{ data.count }}</span>
            <Button @click="productCount(data, 1)" icon="pi pi-plus" severity="secondary" rounded></Button>
          </div>
        </template>
      </Column>
      <Column field="price" header="价格">
        <template #body="{ data }">单价：{{ data.product.price }}<br />总价：{{ data.product.price * data.count }}</template>
      </Column>
      <Column>
        <template #body="{ data }">
          <Button @click="deleteProduct(data)" icon="pi pi-trash" label="删除商品" severity="danger" rounded></Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
  .title {
    font-size: 40px;
    text-align: center;
    margin: 50px 0;
  }

  .count {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .link {
    color: unset;
    text-decoration: none;
  }

  .link:hover {
    text-decoration: underline;
  }
</style>
