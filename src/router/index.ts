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
