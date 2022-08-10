<template>
  <m-alert
    :type="alertStore.type"
    :open-props="alertStore.open"
    @close="alertStore.open = false"
    >{{ alertStore.text }}</m-alert
  >
  <m-global-load/>
  <header
    class="px-4 drop-shadow w-full h-16 bg-white z-40 -mx flex items-center fixed top-0"
  >
    <button
      class="text-second hover:text-primary h-full hover:duration-75 duration-75 mr-4"
      @click="data.openMenu = !data.openMenu"
    >
      <font-awesome-icon icon="bars" class="text-3xl" />
    </button>
    <router-link to="/">
      <img src="@/assets/logo.png" alt="" class="h-16" />
    </router-link>
  </header>
  <div class="px-4 pt-4 min-h-screen bg-zinc-100 flex gap-8">
    <aside
      class="pt-16 -ml-4 w-[130px] h-[calc(100vh - 4rem)] z-30 fixed overflow-auto bg-white shadow"
      :style="!data.openMenu ? 'margin-left: -145px' : ''"
    >
      <template v-for="(item, idx) of data.menuItems" :key="idx">
        <m-collapse v-if="!item.url">
          <template #trigger>
            <button
              class="flex flex-col items-center text-lg border-b w-full py-2 hover:text-primary"
            >
              <font-awesome-icon
                v-if="item.icon"
                :icon="item.icon"
                class="mb-2"
              />
              <span>{{ item.title }}</span>
            </button>
          </template>

          <template #content>
            <router-link
              v-for="child of item.children"
              :key="child.title"
              :to="child.url"
              class="text-center hover:text-primary"
              >{{ child.title }}</router-link
            >
          </template>
        </m-collapse>
        <router-link
          v-if="item.url"
          :to="item.url"
          class="flex flex-col items-center text-lg border-b w-full py-2 hover:text-primary"
        >
          <font-awesome-icon :icon="item.icon" />
          <span>{{ item.title }}</span>
        </router-link>
      </template>
    </aside>
    <main class="mt-16 w-full">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import MAlert from "@/components/_core/MAlert.vue";
import MCollapse from "@/components/_core/MCollapse.vue";
import MGlobalLoad from "@/components/_core/MGlobalLoad.vue";
import { RouterLink } from "vue-router";
import { reactive } from "vue";
import { useAlertStore } from "@/stores/alert";

const alertStore = useAlertStore();

const data = reactive({
  openMenu: false as boolean,
  activeMenu: 0,
  menuItems: [
    {
      title: "Панель",
      icon: "laptop",
      url: "/",
    },
    {
      title: "магазины",
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
      title: "Купоны",
      icon: "ticket",
      url: "/post",
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
      url: "/adv_cake",
    },
    {
      title: "vk",
      icon: "fa-brands fa-vk",
      url: "/vk",
    },
  ],
});
</script>
