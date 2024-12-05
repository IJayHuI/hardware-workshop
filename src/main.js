import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router'

import { createPinia } from 'pinia'

import Button from 'primevue/button'
import Card from 'primevue/card'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

createApp(App)
  .use(router)
  .component('Button', Button)
  .component('Card', Card)
  .use(createPinia())
  .use(ToastService)
  .use(PrimeVue, {
    theme: {
      preset: Aura
    }
  })
  .mount('#app')
