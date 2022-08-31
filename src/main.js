import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/tailwind.css'
import 'nprogress/nprogress.css'
import '@vuepic/vue-datepicker/dist/main.css'

createApp(App).use(store).use(router).mount('#app')
