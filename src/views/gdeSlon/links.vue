<template>
  <h1 class="text-2xl font-bold mb-5">Партнёрская программа adv cake</h1>

  <m-card>
    <h2 class='text-xl font-bold mb-3'>Новая связь</h2>
    <div class='grid grid-cols-2 gap-4'>
      <select v-model='data.linkDto.id_slon' class='block mb-5 placeholder-zinc-800 text-zinc-900 border border-zinc-300 bg-white focus:outline-0 rounded p-2 box-border w-full focus:outline-0 focus:ring focus:ring-primary'>
        <option v-for='item of data.slonShops' :value='item.id' :key='item.id'>{{ item.title }}</option>
      </select>

      <select v-model='data.linkDto.uin_shop' class='block mb-5 placeholder-zinc-800 text-zinc-900 border border-zinc-300 bg-white focus:outline-0 rounded p-2 box-border w-full focus:outline-0 focus:ring focus:ring-primary'>
        <option v-for='item of data.shops' :value='item.uin' :key='item.id'>{{ item.title }}</option>
      </select>
    </div>
    <m-button @click='handleLink(data.linkDto)' :disabled='!data.linkDto.id_slon || !data.linkDto.uin_shop' class='mx-auto' color='primary'>Создать связь</m-button>
  </m-card>

  <m-card class='mb-8'>
    <h2 class='text-xl font-bold mb-3'>Все связи магазинов</h2>
    <table class='table table-list mt-3 w-full mb-5'>
      <thead>
      <tr class='text-primary-700'>
        <th class='ltr:text-left rtl:text-right uppercase text-second'>cake</th>
        <th class='ltr:text-left rtl:text-right uppercase text-second'>халява</th>
      </tr>
      </thead>

      <tbody>
      <tr class='border-y border-y-2 h-10 text-center' v-for='item of data.links' :key='item.id'>
        <td>{{ item.slon_shop.title }}</td>
        <td>{{ item.shop.title }}</td>
      </tr>
      </tbody>
    </table>
  </m-card>
</template>

<script setup lang="ts">
import MCard from "@/components/_core/MCard.vue";
import MButton from '@/components/_core/MButton.vue';
import type { ShopModel } from "@/models/shop.model";
import http from "@/modules/api";
import { useAlertStore } from "@/stores/alert";
import { useLoadStore } from "@/stores/load";
import { onMounted, reactive } from "vue";

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

async function handleLink(dto:LinksDto):any {
  try {
    load.handleLoad();
    await http.post("/slon/link", dto);
    const links = await http.get("/slon/link");
    data.links = links.data;
    load.handleLoad();
  } catch (e) {
    console.log(e)
  }
}
</script>
