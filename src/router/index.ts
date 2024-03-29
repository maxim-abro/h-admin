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
      component: () => import("@/views/gdeSlon/gdeSlon.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/gde_slon/links",
      name: "links_slon",
      component: () => import("@/views/gdeSlon/links.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/adv_cake/coupons",
      name: "coupons_cake",
      component: () => import("@/views/advCake/coupons.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/adv_cake/images",
      name: "images_cake",
      component: () => import("@/views/advCake/images.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/adv_cake/links",
      name: "links_cake",
      component: () => import("@/views/advCake/links.vue"),
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
    {
      path: "/library",
      name: "library",
      component: () => import("@/views/library.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/holiday",
      name: "holiday",
      component: () => import("@/views/holidays/index.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/holiday/add",
      name: "add_holidays",
      component: () => import("@/views/holidays/add.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/holiday/:id",
      name: "holiday_id",
      component: () => import("@/views/holidays/_id.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/news/add",
      name: "add_news",
      component: () => import("@/views/news/add.vue"),
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
      const result = await http.get("/auth/check");

      if (result.data.message === "ok") {
        next();
      } else {
        next("/auth?message=non_authorize");
      }
    } else if (requireAuth && !store.isAuth) {
      next("/auth?message=non_authorize");
    } else {
      next();
    }
  } catch (e) {
    const store = useAuthStore();
    next("/auth?message=non_authorize");
    store.logout();
  }
});

export default router;
