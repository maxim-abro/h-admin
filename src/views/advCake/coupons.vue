<template>
  <h1 class="text-2xl font-bold mb-5">Партнёрская программа adv cake</h1>

  <m-load v-if="data.load" />

  <m-card class="mb-5" v-if="!data.load">
    <div class="grid md:grid-cols-3 gap-5">
      <div class="">
        <span>Выберите магазин площадки:</span>
        <select
          class="mb-5 placeholder-zinc-800 text-zinc-900 border border-zinc-300 bg-white focus:outline-0 rounded p-2 box-border ml-3 focus:outline-0 focus:ring focus:ring-primary"
          v-model="data.inputShopId"
          @change="getCoupons(data.inputShopId)"
        >
          <option
            v-for="shop in data.cakeShops"
            :key="shop.id"
            :value="shop.id"
          >
            {{ shop.title }}
          </option>
        </select>
      </div>

      <div class="">
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

      <div class="">
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

  <m-card v-if="data.cakeCoupons.length">
    <table class="table table_hoverable w-full mt-3">
      <thead>
        <tr>
          <th class="ltr:text-left rtl:text-right uppercase">Выбранные</th>
          <th class="ltr:text-left rtl:text-right uppercase">Название</th>
          <th class="ltr:text-left rtl:text-right uppercase">Дата окончания</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="shop of data.cakeCoupons" :key="shop.id" class="border-b">
          <td class="py-4 text-center">
            <input type="checkbox" v-model="shop.toSite" />
          </td>
          <td class="py-4 text-center">{{ shop.title }}</td>
          <td class="py-4 text-center">
            {{ shop.date_end || "31.09.2022**" }}
          </td>
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
import { useAlertStore } from "@/stores/alert";
import { useLoadStore } from "@/stores/load";

const alertStore = useAlertStore();
const load = useLoadStore();

type CakeShopModel = {
  id: string;
  title: string;
  description: string;
  url: string;
};

const data = reactive({
  cakeShops: [] as CakeShopModel[],
  cakeCoupons: [] as object[],
  coupons: [] as PostModel[],
  inputShopId: "" as string,
  shops: [] as ShopModel[],
  categories: [] as CategoryModel[],
  loadTable: false as boolean,
  categoryActive: "" as string,
  shopActive: "" as string,
  load: true as boolean,
});

const couponsToSite = computed<object[]>((): object[] =>
  data.cakeCoupons.filter((i: any) => i.toSite)
);

const getCoupons = async (idShop: string) => {
  try {
    load.handleLoad();
    data.loadTable = true;
    data.cakeCoupons = [];
    const coupons = await http.get(`/adv_cake/coupon/${idShop}`);

    data.loadTable = false;

    data.cakeCoupons = coupons.data;
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
        // @ts-ignore
        type: item.promocodes.length ? "promoCode" : "sale",
        // @ts-ignore
        shopUin: data.shopActive,
        // @ts-ignore
        endDate: item.date_end || "2022-09-31",
        // @ts-ignore
        url: item.landings[0].link,
        // @ts-ignore
        code: item.promocodes.length ? item.promocodes[0].name : "",
        category: data.categoryActive,
        // @ts-ignore
        recomended: item.recomended,
      });
    }
    load.handleLoad();
    alertStore.handleAlert("Все магазины добавлены", "success");
  } catch (e) {
    console.log(e);
    alertStore.handleAlert("Ошибка добавления магазинов", "danger");
    load.handleLoad();
  }
};

onMounted(async () => {
  try {
    const cakeShops = await http.get("/adv_cake/shop");
    const shops = await http.get("/shop");
    const categories = await http.get("/category");

    data.cakeShops = cakeShops.data;
    data.categories = categories.data;
    data.shops = shops.data;

    data.load = false;
  } catch (e) {
    console.log(e);
    alertStore.handleAlert("Ошибка загрузки!!!", "danger");
  }
});
</script>
