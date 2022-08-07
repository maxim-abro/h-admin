import { createRouter, createWebHistory } from "vue-router";
import home from "../views/home.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
      meta: {
        auth: true
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
      component: () => import('@/views/post/index.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: "/shop",
      name: "shops",
      component: () => import('@/views/shop/index.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/shop/add',
      name: 'add_shop',
      component: () => import("@/views/shop/add.vue"),
      meta: {
        auth: true
      }
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth
  const store = useAuthStore()

  if (requireAuth && store.isAuth) {
    next();
  } else if (requireAuth && !store.isAuth) {
    next('/auth?message=non_authorize')
  } else {
    next();
  }
})

export default router;
