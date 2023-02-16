<template>
  <div
    v-if="!load.isLoad"
    class="relative h-full flex flex-auto flex-col px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:px-8"
  >
    <div class="flex flex-col gap-4 h-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        <m-card>
          <div class="p-3">
            <div class="flex items-center gap-4">
              <div
                class="rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-100"
                style="
                  width: 55px;
                  height: 55px;
                  min-width: 55px;
                  line-height: 55px;
                  font-size: 27px;
                "
              >
                <span class="flex h-full items-center justify-center">
                  <font-awesome-icon icon="ticket" />
                </span>
              </div>
              <div>
                <div class="flex gap-1.5 items-end mb-2">
                  <h3 class="font-bold text-black text-2xl leading-none">
                    {{ data.postCounter }}
                  </h3>
                  <p class="font-semibold">Купоны</p>
                </div>
                <p class="flex items-center gap-1">
                  <span class="text-emerald-600">+10</span>
                  <span>за этот день</span>
                </p>
              </div>
            </div>
          </div>
        </m-card>
        <m-card>
          <div class="p-3">
            <div class="flex items-center gap-4">
              <div
                class="rounded-lg bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-100"
                style="
                  width: 55px;
                  height: 55px;
                  min-width: 55px;
                  line-height: 55px;
                  font-size: 27px;
                "
              >
                <span class="flex h-full items-center justify-center">
                  <font-awesome-icon icon="cart-shopping" />
                </span>
              </div>
              <div>
                <div class="flex gap-1.5 items-end mb-2">
                  <h3 class="font-bold text-black text-2xl leading-none">
                    {{ data.shopCounter }}
                  </h3>
                  <p class="font-semibold">Магазины</p>
                </div>
                <p class="flex items-center gap-1">
                  <span class="text-emerald-600">+10</span>
                  <span>за этот день</span>
                </p>
              </div>
            </div>
          </div>
        </m-card>
        <m-card>
          <div class="p-3">
            <div class="flex items-center gap-4">
              <div
                class="rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100"
                style="
                  width: 55px;
                  height: 55px;
                  min-width: 55px;
                  line-height: 55px;
                  font-size: 27px;
                "
              >
                <span class="flex h-full items-center justify-center">
                  <font-awesome-icon icon="layer-group" />
                </span>
              </div>
              <div>
                <div class="flex gap-1.5 items-end mb-2">
                  <h3 class="font-bold text-black text-2xl leading-none">
                    {{ data.categoryCounter }}
                  </h3>
                  <p class="font-semibold">Категории</p>
                </div>
                <p class="flex items-center gap-1">
                  <span class="text-emerald-600">+10</span>
                  <span>за этот день</span>
                </p>
              </div>
            </div>
          </div>
        </m-card>
        <!--        <m-card>-->
        <!--          <div class="p-3">-->
        <!--            <div class="flex items-center gap-4">-->
        <!--              <div-->
        <!--                class="rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-100"-->
        <!--                style="-->
        <!--                  width: 55px;-->
        <!--                  height: 55px;-->
        <!--                  min-width: 55px;-->
        <!--                  line-height: 55px;-->
        <!--                  font-size: 27px;-->
        <!--                "-->
        <!--              >-->
        <!--                <span class="flex h-full items-center justify-center">-->
        <!--                  <font-awesome-icon icon="ticket" />-->
        <!--                </span>-->
        <!--              </div>-->
        <!--              <div>-->
        <!--                <div class="flex gap-1.5 items-end mb-2">-->
        <!--                  <h3 class="font-bold text-black text-2xl leading-none">33</h3>-->
        <!--                  <p class="font-semibold">Купоны</p>-->
        <!--                </div>-->
        <!--                <p class="flex items-center gap-1">-->
        <!--                  <span class="text-emerald-600">+10</span>-->
        <!--                  <span>за этот день</span>-->
        <!--                </p>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </m-card>-->
      </div>
      <div class="grid grid-cols-1 xl:grid-cols-7 gap-4">
        <m-card class="xl:col-span-5 p-3">
          <h3 class="text-center text-xl font-bold mb-2">Статистика сайта</h3>
        </m-card>
        <m-card class="xl:col-span-2 p-3">
          <h3 class="text-center text-xl font-bold mb-2">
            Статистика категорий
          </h3>
          <categories-chart :chart-data="categoriesChart" />
        </m-card>
      </div>
      <m-card class="p-3">
        <h3 class="text-xl font-bold">Посты</h3>
      </m-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import http from "@/modules/api";
import { onMounted, reactive, computed } from "vue";
import type { PostModel } from "@/models/post.model";
import type { CategoryModel } from "@/models/category.model";
import type { ShopModel } from "@/models/shop.model";
import { useAlertStore } from "@/stores/alert";
import { useLoadStore } from "@/stores/load";
import MCard from "@/components/_core/MCard.vue";
import CategoriesChart from "@/components/charts/CategoriesChart.vue";

const alert = useAlertStore();
const load = useLoadStore();

const data = reactive({
  shopCounter: 0 as number,
  postCounter: 0 as number,
  categoryCounter: 0 as number,
  emptyShops: [] as object[],
  allCategories: [] as CategoryModel[],
  shops: [] as ShopModel[],
  postInput: {} as PostModel,
});

onMounted(async () => {
  await updateData();
});

const categoriesChart = computed(() => {
  const result = {
    labels: [] as number[],
    datasets: [
      {
        backgroundColor: [
          "#fdb13c",
          "#926EAE",
          "#003841",
          "#F80000",
          "#85BB65",
          "#FF8C00",
          "#523C36",
          "#3CB371",
          "#990066",
          "#FFCC00",
          "#FCFCEE",
          "#3BB08F",
          "#ADD8E6",
          "#FFDAB9",
          "#BEF574",
          "#FFC0CB",
          "#490005",
          "#4C3C18",
          "#47A76A",
        ],
        borderColor: "#FFF",
        borderJoinStyle: "bevel",
        data: [] as number[],
      },
    ],
  };
  data.allCategories.forEach((i: any) => {
    result.labels.push(i.title);
    result.datasets[0].data.push(i.counter);
  });

  return result;
});

const handleForm = async () => {
  try {
    load.handleLoad();
    await http.post("/admin/post/add", data.postInput);
    alert.handleAlert("Промокод добавлен", "success");
    load.handleLoad();
  } catch (e) {
    console.log(e);
    alert.handleAlert("Ошибка добавления промокода", "danger");
    load.handleLoad();
  }
};

async function updateData() {
  try {
    load.handleLoad();
    const res = await http.get("/admin/counter");
    const allCategories = await http.get("/admin/category/all");
    const allShops = await http.get("/admin/shop");
    const emptyShops = await http.get("/shop/is/empty");
    /////////////////////////////////
    data.shopCounter = res.data.shop;
    data.postCounter = res.data.post;
    data.categoryCounter = res.data.category;
    data.allCategories = allCategories.data;
    data.shops = allShops.data;
    data.emptyShops = emptyShops.data;
    load.handleLoad();
  } catch (e) {
    console.log(e);
    alert.handleAlert("Ошибка загрузки!!", "danger");
  }
}

const updateCake = async () => {
  try {
    load.handleLoad();
    await http.get("/cron/update_cake");
    await updateData();
    alert.handleAlert("Купоны обновлены", "success");
    load.handleLoad();
  } catch (e) {
    alert.handleAlert("Ошибка обновления купонов", "danger");
    load.handleLoad();
  }
};

const updateSlon = async () => {
  try {
    load.handleLoad();
    load.handleLoad();
    await http.get("/cron/update_slon");
    await updateData();
    alert.handleAlert("Купоны обновлены", "success");
    load.handleLoad();
  } catch (e) {
    alert.handleAlert("Ошибка обновления купонов", "danger");
    load.handleLoad();
  }
};
</script>
