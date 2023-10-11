<template>
  <div
    class="relative h-full flex flex-auto flex-col px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:px-8"
  >
    <h1 class="mb-4 text-2xl font-bold">Добавить линк с CPA gde slon</h1>
    <m-card>
      <div class="p-3">
        <div class="flex justify-between items-center">
          <div class="">gdeSlon {{ data.links.length }} Магазинов</div>
          <div class="">za halyavoi {{ data.shops.length }} Магазинов</div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <select
            v-model="data.linkDto.id_slon"
            class="block mb-5 placeholder-zinc-800 text-zinc-900 border border-zinc-300 bg-white focus:outline-0 rounded p-2 box-border w-full focus:outline-0 focus:ring focus:ring-primary"
          >
            <option :value="i.id" v-for="i of notAddedShops" :key="i.id">
              {{ i.title }}
            </option>
          </select>
          <select
            v-model="data.linkDto.uin_shop"
            class="block mb-5 placeholder-zinc-800 text-zinc-900 border border-zinc-300 bg-white focus:outline-0 rounded p-2 box-border w-full focus:outline-0 focus:ring focus:ring-primary"
          >
            <option :value="i.uin" v-for="i of orderShops" :key="i.id">
              {{ i.title }}
            </option>
          </select>
        </div>
        <m-button @click="handleLink(data.linkDto)">Добавить</m-button>
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
import { computed, onMounted, reactive } from "vue";
import type { ShopModel } from "@/models/shop.model";
import logging from "@/modules/logging";

const alertStore = useAlertStore();
const load = useLoadStore();

interface SlonShopModel {
  id: string;
  title: string;
  description: string;
  url: string;
}
interface SlonLinks {
  id: number;
  uin_shop: string;
  id_slon: string;
  shop: object;
  slon_shop: object;
}
interface LinksDto {
  id_slon: string;
  uin_shop: string;
}

const data = reactive({
  slonShops: [] as SlonShopModel[],
  links: [] as SlonLinks[],
  shops: [] as ShopModel[],
  linkDto: {} as LinksDto,
});

onMounted(async () => {
  try {
    load.handleLoad();
    const slonShops = await http.get("/slon/shop");
    const shops = await http.get("/shop");
    const links = await http.get("/slon/link");

    data.slonShops = slonShops.data;
    data.shops = shops.data;
    data.links = links.data;
    load.handleLoad();
  } catch (e) {
    console.log(e);
    alertStore.handleAlert("Ошибка загрузки, посмотрите консоль", "danger");
    load.handleLoad();
  }
});

async function handleLink(dto: LinksDto) {
  try {
    load.handleLoad();
    await http.post("/slon/link", dto);
    await logging("Сделал линк в gde slon", "bind");
    const links = await http.get("/slon/link");
    data.links = links.data;
    load.handleLoad();
  } catch (e) {
    console.log(e);
  }
}

const notAddedShops = computed(() => {
  return data.slonShops.filter((c) => {
    const find = data.links.find((l) => {
      return l.slon_shop.title === c.title;
    });
    return !find;
  });
});

const orderShops = computed(() => {
  return data.shops.sort((a, b) => {
    return a.title + b.title;
  });
});
</script>
