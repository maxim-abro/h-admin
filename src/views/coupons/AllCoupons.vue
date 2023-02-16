<template>
  <div
    class="relative h-full flex flex-auto flex-col px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:px-8"
  >
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">Промокоды</h1>

      <div class="flex items-center">
        <m-input
          v-model="filterData"
          type="search"
          placeholder="поиск..."
          class="mr-4"
        />
        <select
          v-model="data.activeShop"
          class="focus:outline-0 rounded-lg p-2 box-border placeholder-zinc-300 h-full mr-4 text-zinc-900 border border-2 border-zinc-300 bg-white focus:outline-0 focus:border-primary"
        >
          <option value="%" disabled selected>------</option>
          <option v-for="shop of data.shops" :key="shop.uin" :value="shop.uin">
            {{ shop.title }}
          </option>
        </select>
        <m-button class="" @click="$router.push('/shops/add/')"
          >добавить&nbsp;магазин</m-button
        >
      </div>
    </div>

    <table>
      <thead>
        <tr class="bg-zinc-100">
          <th>Название</th>
          <th>Магазин</th>
          <th>Просмотры</th>
          <th>Лайки</th>
          <th>Тип</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="post of data.coupons" class="border-y">
          <th class="py-2 px-2">{{ post.title }}</th>
          <th class="py-2 px-2">{{ post.shop.title }}</th>
          <th class="py-2 px-2">{{ post.counter }}</th>
          <th class="py-2 px-2">{{ post.rating }}</th>
          <th class="py-2 px-2">
            {{ post.type === "promoCode" ? "Промокод" : "Скидка" }}
          </th>
        </tr>
      </tbody>
    </table>

    <m-pagination :pages="data.pagination.total_pages" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from "vue";
import { useAlertStore } from "@/stores/alert";
import { useLoadStore } from "@/stores/load";
import MInput from "@/components/_core/MInput.vue";
import MButton from "@/components/_core/MButton.vue";
import http from "@/modules/api";
import MPagination from "@/components/_core/MPagination.vue";

const alert = useAlertStore();
const load = useLoadStore();

const data = reactive({
  shops: [] as object[],
  coupons: [] as object[],
  page: 1 as number,
  activeShop: "%" as string,
  orderData: {
    col: "" as string,
    type: "" as string,
  },
  pagination: {
    current_page: 1,
    total_pages: 1,
    total_elements: 1,
  },
});

onMounted(async () => {
  try {
    load.handleLoad();
    const shops = await http.get("/admin/v2/shop/all");
    const coupons = await http.get("/post?page=1");
    data.shops = shops.data;
    data.coupons = coupons.data.rows;
    data.pagination.total_elements = coupons.data.count;
    data.pagination.total_pages = Math.ceil(coupons.data.count / 15);
    load.handleLoad();
  } catch (e) {
    console.log(e);
    load.handleLoad();
    alert.handleAlert("Ошибка загрузки!!", "danger");
  }
});
</script>
