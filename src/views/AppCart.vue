<script setup>
  import { ref } from 'vue'
  import { useLoadingStore } from '../pinia'

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
      .get(`/server/hardware-workshop-carts?populate=model.thumbnail&populate=model&filters[user][documentId][$eq]=${username}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        response.data.data.forEach((product) => {
          products.value.push({
            name: product.model.name,
            count: product.count,
            price: product.model.price,
            thumbnail: product.model.thumbnail[0].url,
            id: product.documentId
          })
          calcRMB(products.value)
        })
      })
      .finally(() => {
        setTimeout(
          () => (useLoadingStore().loadingStatus = false), // 结束 loading
          500
        )
      })
  }
  getDatas(JSON.parse(sessionStorage.getItem('user')).documentId)

  const calcRMB = (products) => {
    countRMB.value = 0
    products.forEach((product) => {
      countRMB.value += product.price * product.count
    })
  }

  const productCount = (data, num) => {
    data.count += num
    calcRMB(products.value)
    axios
      .put(
        '/server/hardware-workshop-carts/' + data.id,
        {
          data: { count: data.count }
        },
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
      .delete('/server/hardware-workshop-carts/' + data.id, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response)
        if (response.status == 204) {
          toast.add({ severity: 'success', summary: '删除成功', life: 3000 })
          products.value = products.value.filter((product) => product.id != data.id)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
</script>

<template>
  <h1 class="title" v-if="products.length > 0">您的购物车总计 RMB {{ countRMB }}</h1>
  <h1 class="title" v-else>您的购物车是空的哦</h1>
  <div class="page-size" v-if="products.length > 0">
    <DataTable :value="products" tableStyle="min-width: 50rem">
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <h2>我的购物车</h2>
        </div>
      </template>
      <Column>
        <template #body="{ data }">
          <img :src="`https://server.jayhu.site${data.thumbnail}`" style="width: 150px" />
        </template>
      </Column>
      <Column field="name" header="产品名称"></Column>
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
        <template #body="{ data }">单价：{{ data.price }}<br />总价：{{ data.price * data.count }}</template>
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
</style>
