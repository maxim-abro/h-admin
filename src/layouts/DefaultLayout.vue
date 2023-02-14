<template>
  <m-alert
    :type="alertStore.type"
    :open-props="alertStore.open"
    @close="alertStore.open = false"
    >{{ alertStore.text }}</m-alert
  >
  <m-global-load />
  <div class="flex flex-auto min-w-0 text-zinc-700">
    <m-aside :menu="data.menuItems" @toggle-menu="toggleMenu($event)" />
    <div
      class="flex flex-col flex-auto min-h-screen relative w-full bg-white dark:bg-gray-800 border-1 border-gray200 dark:border-gray-700"
    >
      <m-head />
      <div class='h-full flex flex-auto flex-col justify-between'>
        <main class='h-full'>
          <slot/>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MAlert from "@/components/_core/MAlert.vue";
import MGlobalLoad from "@/components/_core/MGlobalLoad.vue";
import MHead from "@/components/MHead.vue";
import { reactive } from "vue";
import { useAlertStore } from "@/stores/alert";
import MAside from "@/components/MAside.vue";
import { useAsideStore } from "@/stores/aside";

const aside = useAsideStore();
const alertStore = useAlertStore();

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
      title: "Заработок",
      icon: "money-bill",
      open: false,
      children: [
        {
          title: "Adv Cake",
          url: "/money/adv_cake",
        },
        {
          title: "Gde Slon",
          url: "/money/gde_slon",
        },
        {
          title: "City Ads",
          url: "/money/city_ads",
        },
        {
          title: "perfluence",
          url: "/money/perfluence",
        },
        {
          title: "admitad",
          url: "/money/admitad",
        },
        {
          title: "РСЯ",
          url: "/money/rca",
        },
      ],
    },
    {
      title: "Купоны",
      icon: "ticket",
      open: false,
      url: "/coupons",
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
    },
    {
      title: "adv cake",
      icon: "handshake",
      open: false,
      children: [
        {
          title: "Купоны",
          url: "/adv_cake/coupons",
        },
        {
          title: "Изображения",
          url: "/adv_cake/images",
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
    },
    {
      title: "Блог",
      icon: "newspaper",
      open: false,
      children: [
        {
          title: "Все блоги",
          url: "/news/all",
        },
        {
          title: "Добавить",
          url: "/news/add",
        },
      ],
    },
  ],
});

function toggleMenu(idx: number) {
  if (aside.open) {
    const result = data.menuItems.find((i, _idx) => {
      return idx === _idx;
    });
    if (result) {
      result.open = !result.open;
    }
  }
}
</script>

<style scoped></style>
