import { createWebHistory, createRouter } from "vue-router";


import HomeView from './pages/Index.vue'
import { getAllWidgets } from "./utils";

const routes = [
  { path: '/', component: HomeView },
]

routes.push(...getAllWidgets() as any);


export default createRouter({
  history: createWebHistory(),
  routes,
})