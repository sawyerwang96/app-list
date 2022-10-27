import { createApp } from 'vue'
import { createPinia } from 'pinia'
import lazyload from './directives/lazyload'

import App from './App.vue'

import '@/assets/style/index.scss'

const app = createApp(App)

app.use(createPinia())
app.use(lazyload)

app.mount('#app')
