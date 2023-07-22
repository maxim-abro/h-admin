<template>
  <div
    class="relative h-full flex flex-auto flex-col px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:px-8"
  >
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">Магазины</h1>

      <div class="flex items-center">
        <m-input
          v-model="filterData"
          type="search"
          placeholder="поиск..."
          class="mr-4"
        />
        <m-button class="" @click="$router.push('/shops/add/')"
          >добавить&nbsp;магазин</m-button
        >
      </div>
    </div>

    <table>
      <thead>
        <tr class="bg-zinc-100">
          <th></th>
          <th @click="handleOrder('title')" class="text-start cursor-pointer">
            <span class="mr-2">Название</span>
            <svg
              v-if="orderData.col === 'title' && orderData.type === 'DESC'"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="inline bi bi-caret-down-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
              />
            </svg>
            <svg
              v-if="orderData.col === 'title' && orderData.type === 'ASC'"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="inline bi bi-caret-up-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
              />
            </svg>
          </th>
          <th @click="handleOrder('counter')" class="text-start cursor-pointer">
            <span class="mr-2">Просмотры</span>
            <svg
              v-if="orderData.col === 'counter' && orderData.type === 'DESC'"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="inline bi bi-caret-down-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
              />
            </svg>
            <svg
              v-if="orderData.col === 'counter' && orderData.type === 'ASC'"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="inline bi bi-caret-up-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
              />
            </svg>
          </th>
          <th>купоны</th>
          <th>Действие</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="shop of orderedShops" :key="shop.uin" class="border-y">
          <td class="py-2 px-2 w-24">
            <img
              class="ml-auto"
              :src="`https://za-halyavoi.ru/api/static/${shop.image}`"
              :alt="shop.image"
            />
          </td>
          <td class="py-2 px-2">
            {{ shop.title }}
          </td>
          <td class="py-2 px-2">
            {{ shop.counter }}
          </td>
          <td class="py-2 px-2"></td>
          <td class="py-2 px-2"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useAlertStore } from "@/stores/alert";
import { useLoadStore } from "@/stores/load";
import MInput from "@/components/_core/MInput.vue";
import MButton from "@/components/_core/MButton.vue";
import http from "@/modules/api";

const alert = useAlertStore();
const load = useLoadStore();

const allShops = ref([]);
const orderedShops = ref([]);
const filterData = ref("");
const orderData = ref({
  col: "",
  type: "",
});

onMounted(async () => {
  try {
    load.handleLoad();
    const shopsResult = await http.get("/admin/v2/shop/all");
    allShops.value = shopsResult.data;
    orderedShops.value = shopsResult.data;
    load.handleLoad();
  } catch (e) {
    console.log(e);
    alert.handleAlert("Ошибка загрузки!!", "danger");
  }
});

watch(
  () => filterData.value,
  () => {
    if (filterData.value) {
      orderedShops.value = orderedShops.value.filter((i) => {
        return i.title.toLowerCase().includes(filterData.value.toLowerCase());
      });
    } else {
      orderedShops.value = allShops.value;
    }
  }
);

function handleOrder(col: string) {
  if (orderData.value.col === col) {
    if (orderData.value.type === "ASC") {
      orderData.value.type = "DESC";
    } else {
      orderData.value.col = "";
      orderData.value.type = "";
    }
  } else {
    orderData.value.col = col;
    orderData.value.type = "ASC";
  }
  orderedShops.value = orderTable(allShops.value, orderData.value);
}

function orderTable(shops: object[], order: any) {
  if (order.col) {
    return shops.sort((i, x) => {
      let modifier = 1;
      if (order.type === "DESC") modifier = -1;
      if (order.col === "title") {
        if (i[order.col].toLowerCase() < x[order.col].toLowerCase())
          return -1 * modifier;
        if (i[order.col].toLowerCase() > x[order.col].toLowerCase())
          return 1 * modifier;
        return 0;
      }
      if (i[order.col] < x[order.col]) return -1 * modifier;
      if (i[order.col] > x[order.col]) return 1 * modifier;
    });
  } else {
    return allShops.value;
  }
}
</script>
