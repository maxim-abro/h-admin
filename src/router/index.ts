import { createRouter, createWebHistory } from "vue-router";
import home from "../views/home.vue";
import { useAuthStore } from "@/stores/auth";
import http from "@/modules/api";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
      meta: {
        auth: true,
      },
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("@/views/auth.vue"),
      meta: {
        layout: "auth",
      },
    },
    {
      path: "/post",
      name: "posts",
      component: () => import("@/views/post/index.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/shop",
      name: "shops",
      component: () => import("@/views/shop/index.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/shop/add",
      name: "add_shop",
      component: () => import("@/views/shop/add.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/gde_slon",
      name: "gde_slon",
      component: () => import("@/views/gdeSlon.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/adv_cake",
      name: "adv_cake",
      component: () => import("@/views/advCake.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/vk",
      name: "vk",
      component: () => import("@/views/vk.vue"),
      meta: {
        auth: true,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const requireAuth = to.meta.auth;
  const store = useAuthStore();

  if (requireAuth && store.isAuth) {
    const result = await http.get("/auth/check");

    console.log(result.data.message)
    if (result.data.message === 'ok') {
      next();
    } else {
      next();
    }

    next();
  } else if (requireAuth && !store.isAuth) {
    next("/auth?message=non_authorize");
  } else {
    next();
  }
});

export default router;
