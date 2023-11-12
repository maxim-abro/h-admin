<template>
  <div
    class="relative h-full flex flex-auto flex-col px-4 sm:px-6 py-4 sm:py-6 md:px-8"
  >
    <h1 class="mb-4 text-2xl font-bold">Добавить линк с CPA perfluence</h1>
    <m-card>
      <div class="p-3">
        <div class="flex justify-between items-center">
          <div class="">perfluence {{ links.length }} Магазинов</div>
          <div class="">za halyavoi {{ shops.length }} Магазинов</div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <select
            v-model="linkDto.id_perf"
            class="block mb-5 placeholder-zinc-800 text-zinc-900 border border-zinc-300 bg-white rounded p-2 box-border w-full focus:outline-0 focus:ring focus:ring-primary dark:focus:border-primary dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-600"
          >
            <option :value="i.id" v-for="i of notAddedShops" :key="i.id">
              {{ i.name }}
            </option>
          </select>
          <select
            v-model="linkDto.id_shop"
            class="block mb-5 placeholder-zinc-800 text-zinc-900 border border-zinc-300 bg-white rounded p-2 box-border w-full focus:outline-0 focus:ring focus:ring-primary dark:focus:border-primary dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-600"
          >
            <option :value="i.id" v-for="i of orderShops" :key="i.id">
              {{ i.title }}
            </option>
          </select>
        </div>
        <m-button @click="handleLink(linkDto)">Добавить</m-button>
      </div>
    </m-card>
  </div>
</template>

<script setup lang="ts">
import MCard from "@/components/_core/MCard.vue";
import MButton from "@/components/_core/MButton.vue";
import http from "@/modules/api";
import { useAlertStore } from "@/stores/alert";
import { useLoadStore } from "@/stores/load";
import { computed, onMounted, ref } from "vue";
import type { Ref, UnwrapRef } from "vue";
import type { ShopModel } from "@/models/shop.model";
import logging from "@/modules/logging";

const alertStore = useAlertStore();
const load = useLoadStore();

interface PerfShopModel {
  id: number;
  logo: string;
  name: string;
  category_id: number;
  category_name: string;
  activeBloggers: number;
  product_info: string;
}
interface PerfLinks {
  id: number;
  id_perf: number;
  id_shop: number;
  shop: {
    title: string;
  };
  perfluence_shop: {
    name: string;
  };
}
interface LinkDto {
  id_perf: number;
  id_shop: number;
}

const perfluenceShops: Ref<UnwrapRef<PerfShopModel[]>> = ref([]);
const links: Ref<UnwrapRef<PerfLinks[]>> = ref([]);
const shops: Ref<UnwrapRef<ShopModel[]>> = ref([]);
const linkDto: Ref<UnwrapRef<LinkDto>> = ref({
  id_perf: 0,
  id_shop: 0,
});

onMounted(async () => {
  try {
    load.handleLoad();
    const perfShops = await http.get("/perfluence/all_shops");
    const shopsData = await http.get("/shop");
    const linksData = await http.get("/perfluence/all_links");
    perfluenceShops.value = perfShops.data;
    links.value = linksData.data;
    shops.value = shopsData.data;
    load.handleLoad();
  } catch (e) {
    alertStore.handleAlert("Ошибка загрузки, посмотрите консоль", "danger");
    load.handleLoad();
  }
});

async function handleLink(dto: LinkDto) {
  try {
    load.handleLoad();
    await http.post("/perfluence/add_link", dto);
    await logging("Сделал линк в perfluence", "bind");
    const linksData = await http.get("/perfluence/all_links");
    links.value = linksData.data;
    load.handleLoad();
  } catch (e) {
    console.log(e);
    load.handleLoad();
  }
}

const notAddedShops = computed(() => {
  return perfluenceShops.value.filter((c) => {
    const find = links.value.find((l) => {
      return l.perfluence_shop.name === c.name;
    });
    return !find;
  });
});
const orderShops = computed(() => {
  return shops.value.sort((a, b) => {
    return a.title + b.title;
  });
});
</script>