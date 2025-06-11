import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";
import { getAllWidgetsRoutes, pathResolve } from "./utils";

import CollectionList from './pages/collectionList/Index.vue'
import PreviewPopup from './pages/previewPopup/Index.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('./pages/main/Index.vue') },
  { path: '/iframe/collection', component: CollectionList },
  { path: '/iframe/preview/:widget*', component: PreviewPopup },
  { path: '/manual-install', component: () => import('./pages/manualInstall/Index.vue') },
  { path: '/preview/:widget*', component: () => import('./pages/main/Index.vue') },
  { path: '/demo-widget', redirect: '/tools/debug' },
  { path: '/admin', component: () => import('./pages/admin/Index.vue') },
  { path: '/common-issues', component: () => import('./pages/commonIssues/Index.vue') },
  { path: '/remote-control', component: () => import('./pages/remoteControl/Index.vue') },
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