import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../components/home/Home.vue";
import Login from "../components/Login.vue";
import ErrorStore from "@/store/modules/error";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/register",
    name: "register",
    component: Login,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (ErrorStore.hasError) {
    ErrorStore.clearError();
  }
  next();
});

export default router;
