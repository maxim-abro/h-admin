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
  try {
    const requireAuth = to.meta.auth;
    const store = useAuthStore();

    if (requireAuth && store.isAuth) {
      const result = await http.get("/auth/check")

      if (result.data.message === "ok") {
        console.log("ok");
        next();
      } else {
        console.log("!!!ok");
        next("/auth?message=non_authorize");
      }
    } else if (requireAuth && !store.isAuth) {
      console.log("ok if");
      next("/auth?message=non_authorize");
    } else {
      next();
    }
  } catch (e) {
    const store = useAuthStore();
    console.log("catch");
    next("/auth?message=non_authorize");
    store.logout();
  }
});

export default router;
