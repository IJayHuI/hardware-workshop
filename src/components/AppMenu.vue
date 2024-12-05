<script setup>
  import { ref } from 'vue'
  import AppMenuAccount from './AppMenuAccount.vue'
  import AppMenuSearch from './AppMenuSearch.vue'

  const openSecondMenu = ref(false)
  const secondMenuType = ref('cart')
  const menuItems = [
    { to: '/cpu', text: 'CPU' },
    { to: '/mainboard', text: '主板' },
    { to: '/ram', text: '内存' },
    { to: '/gpu', text: '显卡' },
    { to: '/power', text: '电源' },
    { to: '/crate', text: '机箱' },
    { to: '/radiator', text: '散热器' },
    { to: '/harddisk', text: '硬盘' },
    { to: '/perripheral', text: '配件' }
  ]
  const setWindowScrollY = () => {
    window.scrollTo(0, 0)
  }

  const selectSecondMenuType = (type) => {
    if (type != secondMenuType.value) openSecondMenu.value = true
    else openSecondMenu.value = !openSecondMenu.value
    secondMenuType.value = type
  }
</script>

<template>
  <transition name="fade">
    <div @mouseenter="openSecondMenu = false" v-if="openSecondMenu" class="background"></div>
  </transition>
  <div class="container" :class="openSecondMenu ? 'container-open' : ''">
    <div class="content">
      <router-link class="link" to="/"><i class="pi pi-home"></i></router-link>
      <template v-for="menuItem in menuItems" :key="menuItem.to">
        <router-link @click="setWindowScrollY" class="link" :to="menuItem.to">{{ menuItem.text }}</router-link>
      </template>
      <span @click="selectSecondMenuType('cart')" class="link"><i class="pi pi-user"></i></span>
      <span @click="selectSecondMenuType('search')" class="link"><i class="pi pi-search"></i></span>
    </div>
    <div class="second-menu-container">
      <app-menu-account v-if="secondMenuType == 'cart'"></app-menu-account>
      <app-menu-search v-if="secondMenuType == 'search'"></app-menu-search>
    </div>
  </div>
</template>

<style scoped>
  .background {
    position: fixed;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    z-index: 1;
  }
  .container {
    position: fixed;
    width: 100%;
    transition: max-height 0.32s ease-in-out, box-shadow 0.32s;
    max-height: 50px;
    background-color: var(--menu-backgound-color);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    overflow: hidden;
    z-index: 9;
    box-shadow: none;
  }
  .container-open {
    max-height: 500px;
    box-shadow: 0 0 20px 0 gray;
  }

  @media (prefers-color-scheme: dark) {
    .container-open {
      box-shadow: 0 0 20px 0 black;
    }
  }

  .content {
    margin: 0 auto;
    height: 50px;
    width: 100%;
    max-width: 1024px;
    display: flex;
    justify-content: space-around;
  }
  .link {
    padding: 0 15px;
    height: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .second-menu-size {
    padding: 32px 0 80px 0;
    margin: 0 auto;
    width: 100%;
    max-width: 1024px;
  }
</style>
