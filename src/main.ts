import './styles/main.scss'
import './styles/markdown.scss'

import { setup as setupYmMetrika } from './composition/ym/metrika';
import { createApp } from 'vue'
import routes from './routes.ts'
import App from './App.vue'

import "./utils/polyfills.ts";

createApp(App)
  .use(routes)
  .mount('#app')

setupYmMetrika({
  clickmap: false,
  trackLinks: true,
  accurateTrackBounce: true,
})
