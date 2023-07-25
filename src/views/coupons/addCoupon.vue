<template>
  <div
    class="h-full flex flex-auto flex-col px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:px-8"
  >
    <h1 class="mb-4 text-2xl font-bold">Добавить новый промокод</h1>

    <form @submit.prevent="handleForm(data.postInput)">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="lg:col-span-2">
          <div class="flex flex-col mb-8">
            <label class="mb-2">Название промокод</label>
            <m-input placeholder="название" v-model="data.postInput.title" />
          </div>

          <div class="flex flex-col mb-8">
            <label class="mb-2">Описание промокоды</label>
            <textarea
              placeholder="описание"
              class="focus:outline-0 rounded-lg p-2 box-border placeholder-zinc-300 h-40 text-zinc-900 border border-2 border-zinc-300 bg-white w-full focus:outline-0 focus:border-primary"
              v-model="data.postInput.description"
            />
          </div>

          <div class="flex flex-col mb-8">
            <label class="mb-2">Ссылка на скидку</label>
            <m-input
              placeholder="ссылка"
              type="url"
              v-model="data.postInput.url"
            />
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex flex-col mb-8">
            <label class="mb-2">Тип скидки</label>
            <select
              class="focus:outline-0 rounded-lg p-2 box-border w-full focus:outline-0 focus:border-primary placeholder-zinc-300 text-zinc-900 border border-2 border-zinc-300 bg-white"
              v-model="data.postInput.type"
            >
              <option value="promoCode">Промокод</option>
              <option value="sale">Скидка</option>
            </select>
          </div>
          <div class="flex flex-col mb-8">
            <label class="mb-2">Магазин</label>
            <select
              class="focus:outline-0 rounded-lg p-2 box-border w-full focus:outline-0 focus:border-primary placeholder-zinc-300 text-zinc-900 border border-2 border-zinc-300 bg-white"
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
          </div>
          <div class="flex flex-col mb-8">
            <label class="mb-2">Дата окончания промокода</label>
            <m-input
              placeholder="ссылка"
              type="date"
              v-model="data.postInput.endDate"
            />
          </div>
          <div class="flex flex-col mb-8">
            <label class="mb-2">Промокод</label>
            <m-input
              placeholder="MINUS40"
              type="text"
              v-model="data.postInput.code"
            />
          </div>
          <div class="flex flex-col mb-8">
            <label class="mb-2">Категория</label>
            <select
              class="focus:outline-0 rounded-lg p-2 box-border w-full focus:outline-0 focus:border-primary placeholder-zinc-300 text-zinc-900 border border-2 border-zinc-300 bg-white"
              v-model="data.postInput.category"
            >
              <option
                v-for="category of data.categories"
                :key="category.uin"
                :value="category.uin"
              >
                {{ category.title }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div
        class="sticky z-10 border-t-2 -bottom-1 -mx-8 px-8 flex items-center justify-end py-4 bg-white"
      >
        <m-button type="submit">добавить</m-button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import MInput from "@/components/_core/MInput.vue";
import { onMounted, reactive, ref } from "vue";
import http from "@/modules/api";
import { useLoadStore } from "@/stores/load";
import { useAlertStore } from "@/stores/alert";
import MButton from "@/components/_core/MButton.vue";
import type { ShopModel } from "@/models/shop.model";
import type { CategoryModel } from "@/models/category.model";
import type { PostModel } from "@/models/post.model";
import axios from "axios";

const load = useLoadStore();
const alert = useAlertStore();

const data = reactive({
  shops: [] as ShopModel[],
  categories: [] as CategoryModel[],
  postInput: {} as PostModel,
});

onMounted(async () => {
  try {
    const allCategories = await http.get("/admin/category/all");
    const allShops = await http.get("/admin/shop");

    data.categories = allCategories.data;
    data.shops = allShops.data;
  } catch (e) {
    console.log(e);
  }
});

async function handleForm(form: PostModel): string {
  try {
    load.handleLoad();
    await http.post("/admin/post/add", form);
    alert.handleAlert("Промокод добавлен", "success");
    load.handleLoad();
    return "ok";
  } catch (e) {
    console.log(e);
    alert.handleAlert("Ошибка добавления промокода", "danger");
    load.handleLoad();
    return "error";
  }
}
</script>
