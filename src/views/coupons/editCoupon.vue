<template>
  <div class="h-full flex flex-auto flex-col px-4 sm:px-6 py-4 sm:py-6 md:px-8">
    <h1 class="mb-4 text-2xl font-bold">Изменить промокод</h1>

    <form
      v-if="!load.isLoad"
      @submit.prevent="handleForm(data.postInput, route.params.uin)"
    >
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="lg:col-span-2">
          <div class="flex flex-col mb-8">
            <label class="mb-2">Название промокод</label>
            <m-input
              placeholder="название"
              :input-prop="data.postInput.title"
              v-model="data.postInput.title"
            />
          </div>

          <div class="flex flex-col mb-8">
            <label class="mb-2">Описание промокоды</label>
            <textarea
              placeholder="описание"
              class="focus:outline-0 rounded-lg p-2 box-border placeholder-zinc-300 h-40 text-zinc-900 border-2 border-zinc-300 bg-white w-full focus:border-primary dark:focus:border-primary dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-600"
              v-model="data.postInput.description"
            />
          </div>

          <div class="flex flex-col mb-8">
            <label class="mb-2">Ссылка на скидку</label>
            <m-input
              placeholder="ссылка"
              type="url"
              v-model="data.postInput.url"
              :input-prop="data.postInput.url"
            />
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex flex-col mb-8">
            <label class="mb-2">Тип скидки</label>
            <select
              class="focus:outline-0 rounded-lg p-2 box-border w-full focus:border-primary placeholder-zinc-300 text-zinc-900 border-2 border-zinc-300 bg-white dark:focus:border-primary dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-600"
              v-model="data.postInput.type"
            >
              <option value="promoCode">Промокод</option>
              <option value="sale">Скидка</option>
            </select>
          </div>
          <div class="flex flex-col mb-8">
            <label class="mb-2">Магазин</label>
            <select
              class="focus:outline-0 rounded-lg p-2 box-border w-full focus:border-primary placeholder-zinc-300 text-zinc-900 border-2 border-zinc-300 bg-white dark:focus:border-primary dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-600"
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
              :input-prop="data.postInput.endDate"
            />
          </div>
          <div class="flex flex-col mb-8">
            <label class="mb-2">Промокод</label>
            <m-input
              placeholder="MINUS40"
              type="text"
              v-model="data.postInput.code"
              :input-prop="data.postInput.code"
            />
          </div>
          <div class="flex flex-col mb-8">
            <label class="mb-2">Категория</label>
            <select
              class="focus:outline-0 rounded-lg p-2 box-border w-full focus:border-primary placeholder-zinc-300 text-zinc-900 border-2 border-zinc-300 bg-white dark:focus:border-primary dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-600"
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
        class="sticky z-10 border-t-2 dark:border-slate-600 -bottom-1 -mx-8 px-8 flex items-center justify-end py-4 bg-white dark:bg-slate-700"
      >
        <m-button type="submit">изменить</m-button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import MInput from "@/components/_core/MInput.vue";
import { onMounted, reactive } from "vue";
import http from "@/modules/api";
import { useLoadStore } from "@/stores/load";
import { useAlertStore } from "@/stores/alert";
import MButton from "@/components/_core/MButton.vue";
import type { ShopModel } from "@/models/shop.model";
import type { CategoryModel } from "@/models/category.model";
import type { PostModel } from "@/models/post.model";
import { useRoute, useRouter } from "vue-router";
import logging from "@/modules/logging";

const load = useLoadStore();
const alert = useAlertStore();
const route = useRoute();
const router = useRouter();

const data = reactive({
  shops: [] as ShopModel[],
  categories: [] as CategoryModel[],
  postInput: {} as PostModel,
});

onMounted(async () => {
  try {
    load.handleLoad();
    const allCategories = await http.get("/admin/category/all");
    const allShops = await http.get("/admin/shop");
    const postData = await http.get(`/post/${route.params.uin}`);
    data.postInput = postData.data;
    data.categories = allCategories.data;

    data.shops = allShops.data;
    load.handleLoad();
  } catch (e) {
    console.log(e);
    load.handleLoad();
  }
});

async function handleForm(form: PostModel, uin: string): Promise<void> {
  try {
    load.handleLoad();
    await http.patch(`/admin/post/${uin}`, form);
    await logging(`Изменил промокод промокод`, "edit");
    router.push("/coupons");
    alert.handleAlert("Промокод изменён", "success");
    load.handleLoad();
  } catch (e) {
    console.log(e);
    alert.handleAlert("Ошибка изменения промокода", "danger");
    load.handleLoad();
  }
}
</script>
