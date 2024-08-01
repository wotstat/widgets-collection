import './style.scss'

import { createApp } from 'vue'
import routes from './routes.ts'
import App from './App.vue'

createApp(App)
  .use(routes)
  .mount('#app')
