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
      path: "/shops/all",
      name: "allShops",
      component: () => import("@/views/shops/all_shops.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/shops/add",
      name: "addShop",
      component: () => import("@/views/shops/add_shop.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/coupons",
      name: "allCoupons",
      component: () => import("@/views/coupons/AllCoupons.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/coupons/add",
      name: "addCoupon",
      component: () => import("@/views/coupons/addCoupon.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/gde_slon",
      name: "gdeSlonDash",
      component: () => import("@/views/gde_slon/index.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/gde_slon/link",
      name: "gdeSlonLinks",
      component: () => import("@/views/gde_slon/links.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/adv_cake",
      name: "advCakeDash",
      component: () => import("@/views/adv_cake/index.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/adv_cake/link",
      name: "advCakeLink",
      component: () => import("@/views/adv_cake/links.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/holiday",
      name: "allHolidays",
      component: () => import("@/views/holiday/index.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/holiday/add",
      name: "addHoliday",
      component: () => import("@/views/holiday/add.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/holiday/:id",
      name: "idHoliday",
      component: () => import("@/views/holiday/_id.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/scrum",
      name: "scrum",
      component: () => import("@/views/scrum/index.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/coupons/edit/:uin",
      name: "editCoupon",
      component: () => import("@/views/coupons/editCoupon.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/help",
      name: "help",
      component: () => import("@/views/help/index.vue"),
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
