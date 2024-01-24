import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/client/:id",
    name: "client",
    component: () => import("./pages/ClientPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
