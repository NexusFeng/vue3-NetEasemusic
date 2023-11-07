import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import type { App } from 'vue'

import initGuards from './guards'

const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path === '/')
    next('/song-list/discovery')
  else
    next()
})

export const install = (app: App) => {
  initGuards(router)
  app.use(router)
}
