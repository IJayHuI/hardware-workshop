<script setup>
  import { ref } from 'vue'
  import { useLoginStore, usebrowserLastProductStore } from '../pinia'

  import axios from 'axios'

  const cartCount = ref(0)

  const logout = () => {
    sessionStorage.clear()
    useLoginStore().loginStatus = false
  }

  if (useLoginStore().loginStatus)
    axios
      .get(`/server/hardware-workshop-carts?filters[user][documentId][$eq]=${JSON.parse(sessionStorage.getItem('user')).documentId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        cartCount.value = response.data.data.length
      })
      .catch((error) => {
        console.error('Error:', error)
      })
</script>
<template>
  <div class="second-menu-size">
    <div class="cart" v-if="useLoginStore().loginStatus">
      <div class="left">
        <div class="cart-product">
          <h2 v-if="cartCount == 0">您的购物袋是空的。</h2>
          <h2 v-else>您的购物袋有 {{ cartCount }} 件商品。</h2>
        </div>
        <div class="browser-last-product" v-if="usebrowserLastProductStore().name != ''">
          <h2>最近浏览</h2>
          <div class="last-product">
            <img :src="usebrowserLastProductStore().thunmnail" alt="product" width="100" height="100" />
            <span>
              <h3>{{ usebrowserLastProductStore().name }}</h3>
              <router-link class="link" :to="usebrowserLastProductStore().model">前往详情页</router-link>
            </span>
          </div>
        </div>
      </div>
      <div class="operation">
        <Button @click="logout" icon="pi pi-user" label="退出登录" severity="danger" rounded></Button>
        <Button style="text-decoration: none" as="router-link" to="/cart" icon="pi pi-shopping-cart" label="前往购物车" severity="success" rounded></Button>
      </div>
    </div>
    <div class="no-login" v-else>
      <router-link class="link" to="/account"><h1>您还没有登录，点击前往登录</h1></router-link>
    </div>
  </div>
</template>
<style scoped>
  .cart {
    display: flex;
    flex-direction: row;
  }
  .left {
    flex: 1;
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  .last-product {
    display: flex;
    gap: 5px;
  }
  .last-product img {
    border-radius: 15px;
  }

  .operation {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .link:hover {
    text-decoration: underline;
  }
  .no-login {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
