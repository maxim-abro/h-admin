<template>
  <div
    class="relative h-full flex flex-auto flex-col px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:px-8"
  >
    <div class="flex justify-between items-center flex-col sm:flex-row mb-4">
      <h1 class="text-xl font-bold mb-2 sm: mb-0">Промокоды</h1>

      <div class="flex items-center">
        <select
          v-model="data.activeShop"
          class="focus:outline-0 rounded-lg p-2 box-border placeholder-zinc-300 h-full mr-4 text-zinc-900 border border-2 border-zinc-300 bg-white focus:outline-0 focus:border-primary"
        >
          <option value="%" selected>все магазины</option>
          <option v-for="shop of data.shops" :key="shop.uin" :value="shop.uin">
            {{ shop.title }}
          </option>
        </select>
        <m-button
          class="text-xs sm:text-base"
          @click="$router.push('/shops/add/')"
          >добавить&nbsp;промокод</m-button
        >
      </div>
    </div>

    <div class="min-w-full overflow-x-scroll">
      <table class="w-full">
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
            <th class="py-2 px-2 min-w-[200px]">{{ post.title }}</th>
            <th class="py-2 px-2">{{ post.shop.title }}</th>
            <th class="py-2 px-2">{{ post.counter }}</th>
            <th class="py-2 px-2">{{ post.rating }}</th>
            <th class="py-2 px-2">
              {{ post.type === "promoCode" ? "Промокод" : "Скидка" }}
            </th>
          </tr>
        </tbody>
      </table>
    </div>

    <m-pagination
      v-model="data.pagination.current_page"
      :pages="data.pagination.total_pages"
      @update:model-value="changePage"
    />
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

watch(
  () => data.activeShop,
  async () => await changeShop()
);

async function changePage() {
  load.handleLoad();
  const result = await http.get(
    `/post?page=${data.pagination.current_page}&${
      data.activeShop !== "%" ? "shop=" + data.activeShop : ""
    }`
  );

  data.coupons = result.data.rows;
  load.handleLoad();
}

async function changeShop() {
  load.handleLoad();
  data.pagination.current_page = 1;
  const result = await http.get(
    `/post?page=${data.pagination.current_page}&${
      data.activeShop !== "%" ? "shop=" + data.activeShop : ""
    }`
  );
  data.pagination.total_elements = result.data.count;
  data.pagination.total_pages = Math.ceil(result.data.count / 15);
  data.coupons = result.data.rows;
  load.handleLoad();
}
</script>
