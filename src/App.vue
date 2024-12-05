<script setup>
  import AppMenu from './components/AppMenu.vue'
  import AppFoot from './components/AppFoot.vue'

  import ProgressSpinner from 'primevue/progressspinner'
  import Toast from 'primevue/toast'

  import { useLoadingStore, useLoginStore } from './pinia'
  useLoginStore().checkStatus()
</script>

<template>
  <transition name="fade">
    <div class="loading" v-if="useLoadingStore().loadingStatus">
      <ProgressSpinner strokeWidth="5" />
    </div>
  </transition>
  <app-menu></app-menu>
  <div style="height: 50px"></div>
  <router-view></router-view>
  <app-foot></app-foot>
  <Toast />
</template>

<style scoped>
  .loading {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 99;
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
