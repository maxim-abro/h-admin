<template>
  <h1 class="text-2xl font-bold mb-5">Партнёрская программа gdeslon</h1>

  <m-card class="mb-5">
    <div class="grid md:grid-cols-3 gap-5">
      <div class="w-full">
        <span>Выберите магазин площадки:</span>
        <select
          class="mb-5 placeholder-zinc-800 text-zinc-900 border border-zinc-300 bg-white focus:outline-0 rounded p-2 box-border ml-3 focus:outline-0 focus:ring focus:ring-primary"
          v-model="data.inputShopId"
          @change="getCoupons(data.inputShopId)"
        >
          <option
            v-for="shop in data.slonShops"
            :key="shop.id"
            :value="shop.id"
          >
            {{ shop.title }}
          </option>
        </select>
      </div>

      <div class="w-full">
        <span>Выберите категорию:</span>
        <select
          class="mb-5 placeholder-zinc-800 text-zinc-900 border border-zinc-300 bg-white focus:outline-0 rounded p-2 box-border ml-3 focus:outline-0 focus:ring focus:ring-primary"
          v-model="data.categoryActive"
        >
          <option
            v-for="category in data.categories"
            :key="category.uin"
            :value="category.uin"
          >
            {{ category.title }}
          </option>
        </select>
      </div>

      <div class="w-full">
        <span>Выберите ваш магазин:</span>
        <select
          class="mb-5 placeholder-zinc-800 text-zinc-900 border border-zinc-300 bg-white focus:outline-0 rounded p-2 box-border ml-3 focus:outline-0 focus:ring focus:ring-primary"
          v-model="data.shopActive"
        >
          <option v-for="shop of data.shops" :key="shop.uin" :value="shop.uin">
            {{ shop.title }}
          </option>
        </select>
      </div>
    </div>

    <m-button @click="pushCoupons">Добавить промокоды на сайт</m-button>
  </m-card>

  <m-load v-if="data.loadTable" />

  <m-card v-if="data.slonCoupons.length">
    <table class="table table_hoverable w-full mt-3">
      <thead>
        <tr>
          <th class="ltr:text-left rtl:text-right uppercase">Выбранные</th>
          <th class="ltr:text-left rtl:text-right uppercase">Название</th>
          <th class="ltr:text-left rtl:text-right uppercase">Дата окончания</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="shop of data.slonCoupons" :key="shop.id" class="border-b">
          <td class="py-4 text-center">
            <input type="checkbox" v-model="shop.toSite" />
          </td>
          <td class="py-4 text-center">{{ shop.title }}</td>
          <td class="py-4 text-center">{{ shop.endDate || "31.05.2023**" }}</td>
        </tr>
      </tbody>
    </table>
  </m-card>
</template>

<script setup lang="ts">
import { reactive, onMounted, computed } from "vue";
import MCard from "@/components/_core/MCard.vue";
import MLoad from "@/components/_core/MLoad.vue";
import MButton from "@/components/_core/MButton.vue";
import http from "@/modules/api";
import type { CategoryModel } from "@/models/category.model";
import type { ShopModel } from "@/models/shop.model";
import type { PostModel } from "@/models/post.model";
import {useLoadStore} from "@/stores/load";
import {useAlertStore} from "@/stores/alert";

const alert = useAlertStore();

const load = useLoadStore();

type SlonShopModel = {
  id: string;
  title: string;
  description: string;
  url: string;
};

const data = reactive({
  slonShops: [] as SlonShopModel[],
  slonCoupons: [] as object[],
  categories: [] as CategoryModel[],
  shops: [] as ShopModel[],
  coupons: [] as PostModel[],
  inputShopId: "" as string,
  loadTable: false as boolean,
  categoryActive: "" as string,
  shopActive: "" as string,
});

onMounted(async () => {
  const slonShops = await http.get("/slon/shop");
  const shops = await http.get("/shop");
  const categories = await http.get("/category");

  data.slonShops = slonShops.data;
  data.categories = categories.data;
  data.shops = shops.data;
});

const couponsToSite = computed((): object[] => data.slonCoupons.filter((i:any) => i.toSite));

const getCoupons = async (idShop: string) => {
  try {
    load.handleLoad();
    data.loadTable = true;

    const coupons = await http.get(`/slon/shop/${idShop}`);

    data.loadTable = false;

    data.slonCoupons = coupons.data;
    load.handleLoad();
  } catch (e) {
    console.log(e);
    data.loadTable = false;
    load.handleLoad();
  }
};

const pushCoupons = async () => {
  try {
    load.handleLoad();
    for (const item of couponsToSite.value) {
      await http.post("/admin/post/add", {
        // @ts-ignore
        title: item.title,
        // @ts-ignore
        description: item.description,
        type: "sale",
        shopUin: data.shopActive,
        // @ts-ignore
        endDate: item.endDate || "2023-05-31",
        // @ts-ignore
        url: item.url,
        code: "",
        category: data.categoryActive,
        // @ts-ignore
        recomended: item.recomended,
      });
    }
    load.handleLoad();
    alert.handleAlert("Промокоды добавлены", "success");
  } catch (e) {
    console.log(e);
    load.handleLoad();
    alert.handleAlert("Ошибка добавления промокода", "danger");
  }
};
</script>
