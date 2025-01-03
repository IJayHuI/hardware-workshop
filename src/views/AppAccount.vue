<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import InputText from 'primevue/inputtext'
  import Password from 'primevue/password'
  import { useToast } from 'primevue/usetoast'

  import { useLoadingStore, useLoginStore, useCountCartStore } from '../pinia'

  import axios from 'axios'
  import router from '../router'

  const toast = useToast()

  const userInfo = ref({
    username: '',
    password: ''
  })

  const newUserInfo = ref({
    username: '',
    mail: '',
    password: ''
  })

  const loginType = ref(true)

  const login = () => {
    useLoadingStore().loadingStatus = true
    axios
      .post('/server/auth/local', { identifier: userInfo.value.username, password: userInfo.value.password })
      .then((response) => {
        sessionStorage.setItem('jwt', response.data.jwt)
        sessionStorage.setItem('user', JSON.stringify(response.data.user))
        router.push('/')
        useLoginStore().checkStatus()
        useCountCartStore().getCount()
        toast.add({ severity: 'success', summary: '登录成功', life: 3000 })
      })
      .catch((error) => {
        if (error.status == 500) toast.add({ severity: 'error', summary: '请检查网络连接', life: 3000 })
        else if (error.status == 400) toast.add({ severity: 'error', summary: '账号或密码错误', life: 3000 })
      })
      .finally(() => (useLoadingStore().loadingStatus = false))
  }

  const register = () => {
    useLoadingStore().loadingStatus = true
    axios
      .post('/server/auth/local/register', { username: newUserInfo.value.username, email: newUserInfo.value.mail, password: newUserInfo.value.password })
      .then((response) => {
        sessionStorage.setItem('jwt', response.data.jwt)
        sessionStorage.setItem('user', JSON.stringify(response.data.user))
        useLoginStore().loginStatus = true
        useCountCartStore().getCount()
        router.push('/')
        toast.add({ severity: 'success', summary: '创建账号成功', life: 3000 })
      })
      .catch((error) => {
        if (error.status == 500) toast.add({ severity: 'error', summary: '请检查网络连接', life: 3000 })
        else if (error.status == 400) toast.add({ severity: 'error', summary: '邮箱或用户名已存在', life: 3000 })
      })
      .finally(() => (useLoadingStore().loadingStatus = false))
  }

  // 全局监听 Enter
  onMounted(() => {
    window.addEventListener('keydown', handleEnter)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleEnter)
  })

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      login()
    }
  }
</script>

<template>
  <Card class="page-size" v-if="loginType">
    <template #header><h1 style="text-align: center">登 录</h1></template>
    <template #content>
      <div class="form">
        <div class="row">
          <i class="pi pi-user"></i>
          <InputText fluid size="large" type="text" placeholder="请输入用户名或邮箱" v-model="userInfo.username" />
        </div>
        <div class="row">
          <i class="pi pi-lock"></i>
          <Password style="width: 100%" size="large" toggleMask :feedback="false" placeholder="请输入密码" v-model="userInfo.password" />
        </div>
        <div class="row">
          <Button @click="login" label="登 录" severity="success" rounded></Button>
          <Button @click="loginType = false" label="没有账号，注册" severity="secondary" rounded variant="outlined"></Button>
        </div>
      </div>
    </template>
  </Card>
  <Card class="page-size" v-else>
    <template #header><h1 style="text-align: center">注 册</h1></template>
    <template #content>
      <div class="form">
        <div class="row">
          <i class="pi pi-user"></i>
          <InputText fluid size="large" type="text" placeholder="请输入用户名" v-model="newUserInfo.username" />
        </div>
        <div class="row">
          <i class="pi pi-envelope"></i>
          <InputText fluid size="large" type="text" placeholder="请输入邮箱" v-model="newUserInfo.mail" />
        </div>
        <div class="row">
          <i class="pi pi-lock"></i>
          <Password style="width: 100%" size="large" toggleMask :feedback="false" placeholder="请输入密码" v-model="newUserInfo.password" />
        </div>
        <div class="row">
          <Button @click="register" label="注 册" severity="success" rounded></Button>
          <Button @click="loginType = true" label="已有账号，登录" severity="secondary" rounded variant="outlined"></Button>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
  .page-size {
    max-width: 400px;
    background: none;
    box-shadow: none;
    padding: 80px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
  }

  .row {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .row i {
    font-size: 22px;
  }
</style>
