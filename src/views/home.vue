<template>
  <div
    class="relative h-full flex flex-auto flex-col px-4 sm:px-6 py-4 sm:py-6 md:px-8"
  >
    <div
      class="flex justify-between flex-col sm:flex-row items-center mb-4"
      v-if="data.time"
    >
      <div class="text-xl font-bold">
        {{ getWelcome }}, {{ auth.userData.login }}
      </div>
      <div class="text-xl font-bold">
        Сегодня
        {{
          data.time.toLocaleDateString({
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        }}, {{ getHours }}:{{ getMinutes }}:{{ getSeconds }}
      </div>
    </div>
    <div class="flex flex-col gap-4 h-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        <m-card>
          <div class="p-3">
            <div class="flex items-center gap-4">
              <div
                class="rounded-lg bg-indigo-100 text-indigo-600"
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
                <div
                  class="flex gap-1.5 items-end mb-2"
                  v-if="data.postCounter"
                >
                  <h3 class="font-bold text-black text-2xl leading-none">
                    {{ data.postCounter }}
                  </h3>
                  <p class="font-semibold">Купоны</p>
                </div>
                <div
                  v-if="!data.postCounter"
                  class="animate-pulse bg-slate-700 h-5 rounded w-20 mb-2"
                ></div>
                <p v-if="data.postCounter" class="flex items-center gap-1">
                  <span
                    class="text-emerald-600"
                    :class="{
                      'text-emerald-600':
                        minus(
                          data.postCounter,
                          data.yesterdaysStatistics.count_post
                        ) >= 0,
                      'text-red-600':
                        minus(
                          data.postCounter,
                          data.yesterdaysStatistics.count_post
                        ) < 0,
                    }"
                    >{{
                      minus(
                        data.postCounter,
                        data.yesterdaysStatistics.count_post
                      )
                    }}</span
                  >
                  <span>за этот день</span>
                </p>
                <div
                  v-if="!data.postCounter"
                  class="animate-pulse bg-slate-700 h-3 rounded w-24"
                ></div>
              </div>
            </div>
          </div>
        </m-card>
        <m-card>
          <div class="p-3">
            <div class="flex items-center gap-4">
              <div
                class="rounded-lg bg-cyan-100 text-cyan-600"
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
                <div
                  v-if="data.shopCounter"
                  class="flex gap-1.5 items-end mb-2"
                >
                  <h3 class="font-bold text-black text-2xl leading-none">
                    {{ data.shopCounter }}
                  </h3>
                  <p class="font-semibold">Магазины</p>
                </div>
                <div
                  v-if="!data.shopCounter"
                  class="animate-pulse bg-slate-700 rounded w-20 h-5 mb-2"
                ></div>
                <p v-if="data.shopCounter" class="flex items-center gap-1">
                  <span
                    class="text-emerald-600"
                    :class="{
                      'text-emerald-600':
                        minus(
                          data.shopCounter,
                          data.yesterdaysStatistics.count_shop
                        ) >= 0,
                      'text-red-600':
                        minus(
                          data.shopCounter,
                          data.yesterdaysStatistics.count_shop
                        ) < 0,
                    }"
                    >{{
                      minus(
                        data.shopCounter,
                        data.yesterdaysStatistics.count_shop
                      )
                    }}</span
                  >
                  <span>за этот день</span>
                </p>
                <div
                  v-if="!data.shopCounter"
                  class="animate-pulse bg-slate-700 h-3 rounded w-24"
                ></div>
              </div>
            </div>
          </div>
        </m-card>
        <m-card>
          <div class="p-3">
            <div class="flex items-center gap-4">
              <div
                class="rounded-lg bg-emerald-100 text-emerald-600"
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
                <div
                  v-if="data.categoryCounter"
                  class="flex gap-1.5 items-end mb-2"
                >
                  <h3 class="font-bold text-black text-2xl leading-none">
                    {{ data.categoryCounter }}
                  </h3>
                  <p class="font-semibold">Категории</p>
                </div>
                <div
                  v-if="!data.categoryCounter"
                  class="animate-pulse bg-slate-700 h-5 rounded w-20 mb-2"
                ></div>
                <p v-if="data.categoryCounter" class="flex items-center gap-1">
                  <span
                    class="text-emerald-600"
                    :class="{
                      'text-emerald-600':
                        minus(
                          data.categoryCounter,
                          data.yesterdaysStatistics.count_category
                        ) >= 0,
                      'text-red-600':
                        minus(
                          data.categoryCounter,
                          data.yesterdaysStatistics.count_category
                        ) < 0,
                    }"
                    >{{
                      minus(
                        data.categoryCounter,
                        data.yesterdaysStatistics.count_category
                      )
                    }}</span
                  >
                  <span>за этот день</span>
                </p>
                <div
                  v-if="!data.categoryCounter"
                  class="animate-pulse bg-slate-700 h-3 rounded w-24"
                ></div>
              </div>
            </div>
          </div>
        </m-card>
        <m-card>
          <div class="p-3">
            <div class="flex items-center gap-4">
              <div
                class="rounded-lg bg-amber-100 text-amber-600"
                style="
                  width: 55px;
                  height: 55px;
                  min-width: 55px;
                  line-height: 55px;
                  font-size: 27px;
                "
              >
                <span class="flex h-full items-center justify-center">
                  <font-awesome-icon icon="quote-left" />
                </span>
              </div>
              <div>
                <div
                  v-if="data.blogCounter"
                  class="flex gap-1.5 items-end mb-2"
                >
                  <h3 class="font-bold text-black text-2xl leading-none">
                    {{ data.blogCounter }}
                  </h3>
                  <p class="font-semibold">Посты</p>
                </div>
                <div
                  v-if="!data.blogCounter"
                  class="animate-pulse bg-slate-700 h-5 rounded mb-2 w-20"
                ></div>
                <p v-if="data.blogCounter" class="flex items-center gap-1">
                  <span
                    class="text-emerald-600"
                    :class="{
                      'text-emerald-600':
                        minus(
                          data.blogCounter,
                          data.yesterdaysStatistics.count_blog
                        ) >= 0,
                      'text-red-600':
                        minus(
                          data.blogCounter,
                          data.yesterdaysStatistics.count_blog
                        ) < 0,
                    }"
                    >{{
                      minus(
                        data.blogCounter,
                        data.yesterdaysStatistics.count_blog
                      )
                    }}</span
                  >
                  <span>за этот день</span>
                </p>
                <div
                  v-if="!data.blogCounter"
                  class="animate-pulse bg-slate-700 h-3 rounded w-24"
                ></div>
              </div>
            </div>
          </div>
        </m-card>
      </div>
      <div class="grid grid-cols-1 xl:grid-cols-7 gap-4">
        <m-card class="xl:col-span-5 p-3">
          <h3 class="text-center text-xl font-bold mb-2">
            Статистика просмотров
          </h3>
          <YandexStatistic
            v-if="data.statisticYM.totals.length"
            :chart-data="dataToChart"
          />
          <div v-if="!data.statisticYM.totals.length" class="animate-pulse">
            <div class="bg-slate-700 h-6 mb-2 w-96 rounded"></div>
            <div class="bg-slate-700 h-6 mb-2 w-80 rounded"></div>
            <div class="bg-slate-700 h-6 mb-2 w-72 rounded"></div>
            <div class="bg-slate-700 h-6 mb-2 w-64 rounded"></div>
            <div class="bg-slate-700 h-6 mb-2 w-56 rounded"></div>
            <div class="bg-slate-700 h-6 mb-2 w-44 rounded"></div>
            <div class="bg-slate-700 h-6 mb-2 w-32 rounded"></div>
          </div>
        </m-card>
        <m-card class="xl:col-span-2 p-3">
          <h3 class="text-center text-xl font-bold mb-2">
            Статистика категорий
          </h3>
          <categories-chart
            v-if="categoriesChart.labels.length"
            :chart-data="categoriesChart"
          />
          <div
            v-if="!categoriesChart.labels.length"
            class="animate-pulse bg-slate-700 h-64 w-64 rounded-full mx-auto"
          ></div>
        </m-card>
      </div>
      <m-card class="p-3">
        <h3 class="text-xl font-bold">Блог</h3>
        <div class="w-full overflow-x-scroll">
          <table v-if="data.blog.length" class="min-w-full">
            <thead>
              <tr class="bg-zinc-50 font-[100]">
                <th class="text-left">Название</th>
                <th class="">Статус</th>
                <th class="">Дата создания</th>
                <th class="">Действие</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="i of data.blog"
                class="text-center hover:bg-zinc-50 border-b border-b-collapse"
              >
                <td class="text-left py-3 min-w-[200px]">{{ i.title }}</td>
                <td>
                  <span class="bg-emerald-100 text-emerald-600 px-1 rounded"
                    >Создано</span
                  >
                </td>
                <td>
                  {{
                    new Date(i.date).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  }}
                </td>
                <td>
                  <a :href="`/blog/edit/${i.lat_title}`" class="">изменить</a>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            v-if="!data.blog.length"
            class="animate-pulse grid grid-cols-5 gap-1"
          >
            <div class="bg-slate-700 h-7 rounded"></div>
            <div class="bg-slate-700 h-7 rounded"></div>
            <div class="bg-slate-700 h-7 rounded"></div>
            <div class="bg-slate-700 h-7 rounded"></div>
            <div class="bg-slate-700 h-7 rounded"></div>
            <div class="bg-slate-700 h-5 rounded"></div>
            <div class="bg-slate-700 h-5 rounded"></div>
            <div class="bg-slate-700 h-5 rounded"></div>
            <div class="bg-slate-700 h-5 rounded"></div>
            <div class="bg-slate-700 h-5 rounded"></div>
            <div class="bg-slate-700 h-5 rounded"></div>
            <div class="bg-slate-700 h-5 rounded"></div>
            <div class="bg-slate-700 h-5 rounded"></div>
            <div class="bg-slate-700 h-5 rounded"></div>
            <div class="bg-slate-700 h-5 rounded"></div>
            <div class="bg-slate-700 h-5 rounded"></div>
            <div class="bg-slate-700 h-5 rounded"></div>
            <div class="bg-slate-700 h-5 rounded"></div>
            <div class="bg-slate-700 h-5 rounded"></div>
            <div class="bg-slate-700 h-5 rounded"></div>
          </div>
        </div>
      </m-card>

      <div class="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <m-card class="p-3 sm:col-span-8">
          <h3 class="text-center text-xl font-bold mb-2">Статистика сайта</h3>
          <income-chart v-if="data.siteStatistics.datasets" :chart-data="data.siteStatistics" />
          <div v-if="!data.siteStatistics.datasets" class="animate-pulse">
            <div class="bg-slate-700 h-6 mb-2 w-96 rounded"></div>
            <div class="bg-slate-700 h-6 mb-2 w-80 rounded"></div>
            <div class="bg-slate-700 h-6 mb-2 w-72 rounded"></div>
            <div class="bg-slate-700 h-6 mb-2 w-64 rounded"></div>
            <div class="bg-slate-700 h-6 mb-2 w-56 rounded"></div>
            <div class="bg-slate-700 h-6 mb-2 w-44 rounded"></div>
            <div class="bg-slate-700 h-6 mb-2 w-32 rounded"></div>
          </div>
        </m-card>
        <m-card class="p-3 sm:col-span-4">
          <h3 class="text-center text-xl font-bold mb-2">Статистика сайта</h3>
          <income-chart v-if="data.incomeStatistics.datasets" :chart-data="data.incomeStatistics.datasets" />
          <div v-if="!data.incomeStatistics.datasets" class="animate-pulse">
            <div class="bg-slate-700 h-6 mb-2 w-96 rounded"></div>
            <div class="bg-slate-700 h-6 mb-2 w-80 rounded"></div>
            <div class="bg-slate-700 h-6 mb-2 w-72 rounded"></div>
            <div class="bg-slate-700 h-6 mb-2 w-64 rounded"></div>
            <div class="bg-slate-700 h-6 mb-2 w-56 rounded"></div>
            <div class="bg-slate-700 h-6 mb-2 w-44 rounded"></div>
            <div class="bg-slate-700 h-6 mb-2 w-32 rounded"></div>
          </div>
        </m-card>
      </div>
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
import YandexStatistic from "@/components/charts/YandexStatistic.vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import IncomeChart from "@/components/charts/IncomeChart.vue";

const alert = useAlertStore();
const load = useLoadStore();
const auth = useAuthStore();

const data = reactive({
  shopCounter: 0 as number,
  postCounter: 0 as number,
  categoryCounter: 0 as number,
  blogCounter: 0 as number,
  emptyShops: [] as object[],
  allCategories: [] as CategoryModel[],
  shops: [] as ShopModel[],
  postInput: {} as PostModel,
  statisticYM: {
    query: {},
    totals: [],
    data: [],
  } as object,
  blog: [] as object[],
  yesterdaysStatistics: {} as object,
  time: null,
  siteStatistics: {
    // datasets: [],
    // labels: [],
  },
  incomeStatistics: {
    // datasets: [],
    // labels: [],
  },
});

onMounted(async () => {
  await updateData();
  setInterval(getTimer, 1000);
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

async function updateData() {
  try {
    const res = await http.get("/admin/counter");
    const allCategories = await http.get("/admin/category/all");
    const allShops = await http.get("/admin/shop");
    const emptyShops = await http.get("/shop/is/empty");
    const blog = await http.get("/blog/all");
    const yesterdaysStatistics = await http.get("/admin/statistic/db");
    const siteStatistics = await http.get("/statistic/site");
    const incomeStatistics = await http.get("/statistic/income");

    /////////////////////////////////
    data.shopCounter = res.data.shop;
    data.postCounter = res.data.post;
    data.categoryCounter = res.data.category;
    data.blogCounter = res.data.blog;
    data.allCategories = allCategories.data;
    data.shops = allShops.data;
    data.emptyShops = emptyShops.data;
    data.blog = blog.data;
    data.yesterdaysStatistics = yesterdaysStatistics.data;
    data.siteStatistics = siteStatistics.data;
    data.incomeStatistics = incomeStatistics.data;
    const statisticYM = await axios.get(
      "https://api-metrika.yandex.net/stat/v1/data/bytime?ids=89498019&date1=30daysAgo&metrics=ym:s:visits&group=day"
    );
    data.statisticYM = statisticYM.data;
  } catch (e) {
    console.log(e);
    alert.handleAlert("Ошибка загрузки!!", "danger");
  }
}

function getTimer() {
  data.time = new Date();
}

const minus = (a: number, b: number) => a - b;

const getHours = computed(() => {
  return addZero(data.time.getHours());
});
const getMinutes = computed(() => {
  return addZero(data.time.getMinutes());
});
const getSeconds = computed(() => {
  return addZero(data.time.getSeconds());
});

const dataToChart = computed(() => {
  return {
    labels: data.statisticYM.time_intervals,
    datasets: [
      {
        label: "Yandex Metric",
        backgroundColor: "#fdb13c",
        data: data?.statisticYM?.totals[0],
      },
    ],
  };
});

const addZero = (n: number) => (n < 10 ? "0" + n : n);

const getWelcome = computed(() => {
  if (getHours.value >= 5 && getHours.value < 12) {
    return "Доброе утро";
  } else if (getHours.value >= 12 && getHours.value < 16) {
    return "Добрый день";
  } else if (getHours.value >= 16 && getHours.value < 23) {
    return "Добрый вечер";
  } else {
    return "Доброй ночи";
  }
});
</script>
