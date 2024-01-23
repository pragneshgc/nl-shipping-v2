import Dashboard from '../pages/Dashboard.vue';

import { canUserAccessModule } from "../helpers";

const routes = [
  {
    path: "/",
    name: "home",
    component: Dashboard,
  },
  {
    path: "/import-tracking",
    name: "import tracking",
    component: () => import("../pages/ImportTracking.vue"),
  },
  {
    path: "/reports",
    name: "reports",
    component: () => import("../pages/Reports.vue"),
  },
  {
    path: "/order/:id",
    name: "order",
    component: () => import("../pages/Order.vue"),
  },
  {
    path: "/info",
    name: "App Info",
    //meta: { minRole: 20 },
    // component: FMD
    component: () =>
      import(
            /* webpackChunkName: "Info" */ "../pages/Info.vue"
      ),
  },
  {
    path: "/404",
    name: "404",
    //component: NotFound
    component: () =>
      import(
            /* webpackChunkName: "NotFound" */ "../pages/NotFound.vue"
      ),
  },
  {
    path: "/notallowed",
    name: "not allowed",
    //component: NotAllowed
    component: () =>
      import(
            /* webpackChunkName: "NotAllowed" */ "../pages/NotAllowed.vue"
      ),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: "/404"
  },
];

export default routes;

