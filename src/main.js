import { createApp } from 'vue'
import App from './App.vue'
import VueGtag from 'vue-gtag'

import './assets/main.css'

createApp(App)
  .use(VueGtag, { config: { id: import.meta.env.VITE_GTAG_ID } })
  .mount('#app')
