<script setup>
  import InputText from 'primevue/inputtext'
  import router from '../router'
  import { ref } from 'vue'

  const text = ref('')

  const search = () => {
    router.push('/search?search=' + text.value)
  }
</script>
<template>
  <div class="second-menu-size">
    <div class="search">
      <InputText style="flex: 1" size="large" placeholder="搜索硬件工坊" v-model="text" />
      <Button @click="search()" icon="pi pi-search" severity="secondary" rounded></Button>
    </div>
  </div>
</template>
<style scoped>
  .search {
    display: flex;
    justify-content: center;
    gap: 15px;
  }
</style>
