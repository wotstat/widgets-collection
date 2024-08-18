import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";
import { getAllWidgetsRoutes, pathResolve } from "./utils";

import HomeView from './pages/collectionList/Index.vue'
import PreviewView from './pages/previewPopup/Index.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: HomeView },
  { path: '/preview/:widget*', component: PreviewView },
]


const widgetsOptions = getAllWidgetsRoutes()
const widgetModules = import.meta.glob('./widgets/**/*.vue')

const widgets = widgetsOptions.map(w => {
  const modulePath = './' + pathResolve(w.path, w.options.widget)
  if (!(modulePath in widgetModules)) return null;

  const module = widgetModules[modulePath]

  return {
    path: w.route,
    component: module,
    meta: w.options,
  } as RouteRecordRaw
}).filter(t => t !== null)

routes.push(...widgets)


export default createRouter({
  history: createWebHistory(),
  routes,
})