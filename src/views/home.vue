<template>
  <h1 class="text-3xl font-bold mb-8">Главная страница</h1>

  <m-load v-if="data.load" />

  <div class="" v-if="!data.load">
    <div class="grid lg:grid-cols-2 gap-5">
      <div class="grid sm:grid-cols-3 gap-5 w-full mb-5">
        <div
          class="flex h-48 gap-5 rounded rounded-lg flex-col items-center justify-center shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full"
        >
          <font-awesome-icon icon="ticket" class="text-primary text-3xl" />
          <div class="text-sm">Купоны</div>
          <div class="text-primary text-xl">{{ data.postCounter }}</div>
        </div>
        <div
          class="flex h-48 rounded rounded-lg flex-col items-center shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full"
        >
          <div
            class="flex h-48 gap-5 rounded rounded-lg flex-col items-center justify-center shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full"
          >
            <font-awesome-icon
              icon="shopping-cart"
              class="text-primary text-3xl"
            />
            <div class="text-sm">Магазины</div>
            <div class="text-primary text-xl">{{ data.shopCounter }}</div>
          </div>
        </div>
        <div
          class="flex h-48 rounded rounded-lg flex-col items-center shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full"
        >
          <div
            class="flex h-48 gap-5 rounded rounded-lg flex-col items-center justify-center shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full"
          >
            <font-awesome-icon
              icon="layer-group"
              class="text-primary text-3xl"
            />
            <div class="text-sm">Категории</div>
            <div class="text-primary text-xl">{{ data.categoryCounter }}</div>
          </div>
        </div>
      </div>
      <div class="grid sm:grid-cols-4 gap-5">
        <div
          class="flex h-48 rounded rounded-lg flex-col items-center shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full"
        >
          <button @click="updateCake" class='w-full h-full text-primary font-bold hover:text-second'>CAKE update</button>
        </div>
        <div
          class="flex h-48 rounded rounded-lg flex-col items-center shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full"
        >
          <button @click="updateSlon" class='w-full h-full text-primary font-bold hover:text-second'>SLON update</button>
        </div>
        <div
          class="flex h-48 rounded rounded-lg flex-col items-center shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full"
        ></div>
        <div
          class="flex h-48 rounded rounded-lg flex-col items-center shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full"
        ></div>
      </div>
    </div>

    <div class="grid lg:grid-cols-2 gap-5 mb-5">
      <div
        class="flex rounded rounded-lg flex-col items-center shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full"
      ></div>
      <div
        class="p-5 rounded rounded-lg flex-col items-center shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full"
      >
        <h2 class="text-second font-medium text-xl">Пустые магазины</h2>
        <table
          class="table table-list mt-3 w-full mb-5"
          v-if="data.emptyShops.length"
        >
          <thead>
            <tr class="text-primary-700">
              <th class="ltr:text-left rtl:text-right uppercase text-second">
                Название
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="post of data.emptyShops"
              :key="post.title"
              class="border-y border-y-2 h-10"
            >
              <td class="">{{ post.title }}</td>
            </tr>
          </tbody>
        </table>
        <m-button color="primary" class="font-bold">Все посты</m-button>
      </div>
    </div>

    <div class="grid lg:grid-cols-2 gap-5">
      <div
        class="rounded rounded-lg flex-col items-center shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-[99%]"
      >
        <h2 class="text-second font-medium text-xl px-5 pt-5">Категории</h2>
        <polar-area-chart :chart-data="categoriesChart" />
      </div>
      <div
        class="rounded rounded-lg flex-col items-center shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full box-box p-5"
      >
        <h2 class="text-second font-medium text-xl mb-4">Добавить промокод</h2>
        <form @submit.prevent="handleForm">
          <label for="title" class="mb-2 block">Название</label>
          <m-input type="name" class="mb-5" v-model="data.postInput.title" />

          <label for="description" class="mb-2 block">Описание</label>
          <textarea
            name="description"
            class="block mb-5 placeholder-zinc-800 text-zinc-900 border border-zinc-300 bg-white focus:outline-0 rounded p-2 box-border w-full focus:outline-0 focus:ring focus:ring-primary"
            v-model="data.postInput.description"
          ></textarea>

          <label for="type" class="mb-2 block">Тип скидки</label>
          <select
            name="type"
            class="block mb-5 placeholder-zinc-800 text-zinc-900 border border-zinc-300 bg-white focus:outline-0 rounded p-2 box-border w-full focus:outline-0 focus:ring focus:ring-primary"
            v-model="data.postInput.type"
          >
            <option value="promoCode">Промокод</option>
            <option value="sale">Скидка</option>
          </select>

          <label for="shop" class="mb-2 block">Магазин</label>
          <select
            name="shop"
            class="block mb-5 placeholder-zinc-800 text-zinc-900 border border-zinc-300 bg-white focus:outline-0 rounded p-2 box-border w-full focus:outline-0 focus:ring focus:ring-primary"
            v-model="data.postInput.shopUin"
          >
            <option
              v-for="shop of data.shops"
              :key="shop.uin"
              :value="shop.uin"
            >
              {{ shop.title }}
            </option>
          </select>

          <label for="endDate" class="mb-2 block"
            >Дата окончания промокода</label
          >
          <m-input type="date" class="mb-5" v-model="data.postInput.endDate" />

          <label for="url" class="mb-2 block">Ссылка на скидку</label>
          <m-input type="url" class="mb-5" v-model="data.postInput.url" />

          <label for="promo" class="mb-2 block">Промокод</label>
          <m-input type="text" class="mb-5" v-model="data.postInput.code" />

          <label for="category" class="mb-2 block">Категория</label>
          <select
            name="category"
            class="block mb-5 placeholder-zinc-800 text-zinc-900 border border-zinc-300 bg-white focus:outline-0 rounded p-2 box-border w-full focus:outline-0 focus:ring focus:ring-primary"
            v-model="data.postInput.category"
          >
            <option
              v-for="category of data.allCategories"
              :key="category.uin"
              :value="category.uin"
            >
              {{ category.title }}
            </option>
          </select>

          <m-button type="submit" color="primary">Добавить</m-button>
        </form>
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
import {useLoadStore} from "@/stores/load";

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
  load: true as boolean,
});

onMounted(async () => {
  await updateData()
});

const categoriesChart = computed(() => {
  const result = {
    labels: [] as number[],
    datasets: [
      {
        backgroundColor: "#fdb13c30",
        borderColor: "#fdb13c",
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
    const res = await http.get("/admin/counter");
    const allCategories = await http.get("/admin/category/all");
    const allShops = await http.get("/admin/shop")
    const emptyShops = await http.get("/shop/is/empty");
    /////////////////////////////////
    data.shopCounter = res.data.shop;
    data.postCounter = res.data.post;
    data.categoryCounter = res.data.category;
    data.allCategories = allCategories.data;
    data.shops = allShops.data;
    data.emptyShops = emptyShops.data;
    data.load = false;
  } catch (e) {
    console.log(e);
    alert.handleAlert("Ошибка загрузки!!", "danger");
  }
}

const updateCake = async () => {
  try {
    load.handleLoad();
    await http.get("/cron/update_cake");
    await updateData()
    alert.handleAlert("Купоны обновлены", "success");
    load.handleLoad();
  } catch (e) {
    alert.handleAlert("Ошибка обновления купонов", "danger");
    load.handleLoad();
  }
}

const updateSlon = async () => {
  try {
    load.handleLoad();
    load.handleLoad();
    await http.get("/cron/update_slon");
    await updateData()
    alert.handleAlert("Купоны обновлены", "success");
    load.handleLoad();
  } catch (e) {
    alert.handleAlert("Ошибка обновления купонов", "danger");
    load.handleLoad();
  }
}
</script>
