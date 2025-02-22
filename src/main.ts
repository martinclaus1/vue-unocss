import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { PrimeVue } from '@primevue/core'
import 'virtual:uno.css'
import { customTheme } from '@/theme'

const app = createApp(App)

app.use(router).use(PrimeVue, {
  theme: {
    preset: customTheme,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'uno-preflight, primevue, uno-icons, uno-default',
      },
    },
  },
})

app.mount('#app')
