import { createRouter, createWebHashHistory } from 'vue-router'
import Dashboard from './views/Dashboard.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Dashboard,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
})

export default router;
