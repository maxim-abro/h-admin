<template>
  <m-alert
    :type="alertStore.type"
    :open-props="alertStore.open"
    @close="alertStore.open = false"
    >{{ alertStore.text }}</m-alert
  >
  <m-global-load />
  <div class="flex flex-auto min-w-0 text-zinc-700">
    <m-aside
      class="hidden sm:block"
      :menu="data.menuItems"
      @toggle-menu="toggleMenu($event)"
    />
    <div
      class="flex flex-col flex-auto min-h-screen relative w-full bg-zinc-100 border-1 border-gray200"
    >
      <m-head />
      <m-mobile-aside
        v-if="popup.openMobileMenu"
        :menu="data.menuItems"
        @toggle-menu="toggleMenu($event)"
      />
      <div class="h-full flex flex-auto flex-col justify-between">
        <main class="h-full">
          <slot />
        </main>
        <m-footer />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MAlert from "@/components/_core/MAlert.vue";
import MGlobalLoad from "@/components/_core/MGlobalLoad.vue";
import MHead from "@/components/MHead.vue";
import { onMounted, reactive } from "vue";
import { useAlertStore } from "@/stores/alert";
import MAside from "@/components/MAside.vue";
import { useAsideStore } from "@/stores/aside";
import MFooter from "@/components/MFooter.vue";
import MMobileAside from "@/components/MMobileAside.vue";
import { usePopupStore } from "@/stores/popup";
import { useAuthStore } from "@/stores/auth";

const aside = useAsideStore();
const alertStore = useAlertStore();
const popup = usePopupStore();
const auth = useAuthStore();

const data = reactive({
  openMenu: false as boolean,
  activeMenu: 0,
  menuItems: [
    {
      title: "Панель управления",
      icon: "laptop",
      open: false,
      children: [
        {
          title: "Скрам доска",
          url: "/scrum",
        },
        {
          title: "Дашборд",
          url: "/",
        },
      ],
    },
    {
      title: "Магазины",
      icon: "store",
      open: false,
      children: [
        {
          title: "Все магазины",
          url: "/shops/all",
        },
        {
          title: "Добавить новый",
          url: "/shops/add",
        },
      ],
    },
    {
      title: "Купоны",
      icon: "ticket",
      open: false,
      children: [
        {
          title: "Все купоны",
          url: "/coupons",
        },
        {
          title: "Добавить купон",
          url: "/coupons/add",
        },
      ],
    },
    {
      title: "Категории",
      icon: "layer-group",
      open: false,
      children: [
        {
          title: "Все категории",
          url: "/category",
        },
        {
          title: "Добавить новый",
          url: "/category/add",
        },
      ],
    },
    {
      title: "gde slon",
      icon: "handshake",
      open: false,
      url: "/gde_slon",
      children: [
        {
          title: "Дашборд",
          url: "/gde_slon",
        },
        {
          title: "Линки",
          url: "/gde_slon/link",
        },
      ],
    },
    {
      title: "adv cake",
      icon: "handshake",
      open: false,
      children: [
        {
          title: "Дашборд",
          url: "/adv_cake",
        },
        {
          title: "Линки",
          url: "/adv_cake/link",
        },
      ],
    },
    {
      title: "vk",
      icon: "fa-brands fa-vk",
      open: false,
      url: "/vk",
    },
    {
      title: "События",
      icon: "fa-solid fa-cake-candles",
      open: false,
      url: "/holiday",
      children: [
        {
          title: "Все события",
          url: "/holiday",
        },
      ],
    },
    {
      title: "Блог",
      icon: "newspaper",
      open: false,
      children: [
        {
          title: "Все блоги",
          url: "/news",
        },
        {
          title: "Добавить",
          url: "/news/add",
        },
      ],
    },
  ],
});

onMounted(async () => {
  await auth.getLoginData();
});

function toggleMenu(idx: number) {
  const result = data.menuItems.find((i, _idx) => {
    return idx === _idx;
  });
  if (result) {
    result.open = !result.open;
  }
}
</script>

<style scoped></style>
