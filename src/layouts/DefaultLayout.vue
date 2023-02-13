<template>
  <m-alert
    :type="alertStore.type"
    :open-props="alertStore.open"
    @close="alertStore.open = false"
    >{{ alertStore.text }}</m-alert
  >
  <m-global-load />
  <div class='flex flex-auto min-w-0'>
    <m-aside :menu='data.menuItems'/>
    <div class='flex flex-col flex-auto min-h-screen relative w-full bg-white dark:bg-gray-800 border-1 border-gray200 dark:border-gray-700'>
      <m-head/>
    </div>
  </div>
</template>

<script setup lang="ts">
import MGlobalLoad from "@/components/_core/MGlobalLoad.vue";
import MHead from '@/components/MHead.vue';
import { RouterLink } from "vue-router";
import { reactive } from "vue";
import { useAlertStore } from "@/stores/alert";
import MAside from '@/components/MAside.vue';

const alertStore = useAlertStore();

const data = reactive({
  openMenu: false as boolean,
  activeMenu: 0,
  menuItems: [
    {
      title: "Панель управления",
      icon: "laptop",
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
      children: [
        {
          title: "Все магазины",
          url: "/shop",
        },
        {
          title: "Добавить новый",
          url: "/shop/add",
        },
      ],
    },
    {
      title: "Заработок",
      icon: "money-bill",
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
      url: "/coupons",
    },
    {
      title: "Категории",
      icon: "layer-group",
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
      url: "/gde_slon",
    },
    {
      title: "adv cake",
      icon: "handshake",
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
      url: "/vk",
    },
    {
      title: "События",
      icon: "fa-solid fa-cake-candles",
      url: "/holiday",
    },
    {
      title: "Блог",
      icon: "newspaper",
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
</script>

<style scoped>

</style>
