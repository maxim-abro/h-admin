<template>
  <div
    class="h-full flex flex-auto flex-col px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:px-8"
  >
    <h1 class="mb-4 text-2xl font-bold">Добавить новый магазин</h1>

    <form @submit.prevent="handleForm">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-3">
        <m-card class="lg:col-span-2 p-3">
          <div class="flex flex-col mb-8">
            <label class="mb-2">Название магазина</label>
            <m-input v-model="shopForm.title" placeholder="название" />
          </div>

          <div class="flex flex-col mb-8">
            <label class="mb-2">Контакт сайта</label>
            <m-input v-model="shopForm.contacts" placeholder="контакт" />
          </div>

          <div class="flex flex-col mb-8">
            <label class="mb-2">Ссылка на сайт</label>
            <m-input v-model="shopForm.url" placeholder="ссылка" />
          </div>

          <div class="flex flex-col mb-8">
            <label class="mb-2">Виды доставки</label>
            <m-input v-model="shopForm.dostavka" placeholder="доставка" />
          </div>

          <div class="flex flex-col mb-8">
            <label class="mb-2">Описание магазина</label>
            <textarea
              v-model="shopForm.description"
              placeholder="описание"
              class="focus:outline-0 rounded-lg p-2 box-border placeholder-zinc-300 h-40 text-zinc-900 border-2 border-zinc-300 bg-white w-full focus:border-primary dark:focus:border-primary dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-600"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col mb-8">
              <label class="mb-2">Теги для поиска</label>
              <m-input v-model="shopForm.tags" placeholder="теги" />
            </div>
            <div class="flex flex-col mb-8">
              <label class="mb-2">Категории</label>
              <select
                class="focus:outline-0 rounded-lg p-2 box-border placeholder-zinc-300 h-40 text-zinc-900 border-2 border-zinc-300 bg-white w-full focus:border-primary dark:focus:border-primary dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-600"
                v-model="shopForm.categories"
                multiple
              >
                <option v-for="c of categories" :key="c.uin" :value="c.uin">
                  {{ c.title }}
                </option>
              </select>
            </div>
          </div>
        </m-card>
        <m-card class="lg:col-span-1 p-3">
          <div
            v-if="!shopForm.image"
            class="border-2 border-dashed rounded-lg relative"
          >
            <div class="my-16 flex flex-col items-center justify-center">
              <input
                @change="inputImage"
                type="file"
                class="block cursor-pointer w-full opacity-0 h-full absolute left-0 top-0"
              />
              <font-awesome-icon class="text-5xl mx-auto" icon="image" />
              <div class="font-bold">Загрузите изображение</div>
            </div>
          </div>
          <img
            class="w-1/2 mx-auto"
            v-if="shopForm.image"
            :src="`https://za-halyavoi.ru/api/static/${shopForm.image}`"
            alt
          />
        </m-card>
      </div>
      <div
        class="sticky z-10 border-t-2 dark:border-slate-600 -bottom-1 -mx-8 px-8 flex items-center justify-end py-4 bg-white dark:bg-slate-700"
      >
        <m-button type="submit">добавить</m-button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import MInput from "@/components/_core/MInput.vue";
import { onMounted, ref } from "vue";
import http from "@/modules/api";
import { useLoadStore } from "@/stores/load";
import { useAlertStore } from "@/stores/alert";
import MButton from "@/components/_core/MButton.vue";
import MCard from "@/components/_core/MCard.vue";
import logging from "@/modules/logging";

const load = useLoadStore();
const alert = useAlertStore();

const categories = ref(null);

const shopForm = ref({
  title: "" as string,
  description: "" as string,
  categories: [] as any,
  image: "" as string,
  contacts: "" as string,
  url: "" as string,
  tags: "" as string,
  dostavka: "" as string,
});

onMounted(async () => {
  try {
    load.handleLoad();
    const categoriesResult = await http.get("/category");

    categories.value = categoriesResult.data.map((i: any) => {
      return {
        title: i.title,
        uin: i.uin,
        checked: false,
      };
    });

    load.handleLoad();
  } catch (e) {
    console.log(e);
    load.handleLoad();
    alert.handleAlert("Ошибка загрузки страницы", "danger");
  }
});

const inputImage = async (event: any) => {
  try {
    load.handleLoad();
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    const res = await http.post("/upload", formData);
    shopForm.value.image = res.data;
    alert.handleAlert("Картинка загружена", "success");
    load.handleLoad();
  } catch (e) {
    console.log(e);
    alert.handleAlert("Ошибка загрузки картинки", "danger");
    load.handleLoad();
  }
};

async function handleForm() {
  try {
    if (
      shopForm.value.title &&
      shopForm.value.description &&
      shopForm.value.contacts &&
      shopForm.value.url &&
      shopForm.value.dostavka &&
      shopForm.value.tags &&
      shopForm.value.categories.length
    ) {
      load.handleLoad();
      await http.post("/admin/shop", {
        title: shopForm.value.title,
        description: shopForm.value.description,
        image: shopForm.value.image,
        contacts: shopForm.value.contacts,
        url: shopForm.value.url,
        dostavka: shopForm.value.dostavka,
        tags: shopForm.value.tags,
        categories: shopForm.value.categories.join(","),
      });
      await logging(`Добавил магазин ${shopForm.value.title}`, "add");
      alert.handleAlert("Магазин добавлен", "success");
      load.handleLoad();
    }
  } catch (e) {
    console.log(e);
    alert.handleAlert("Ошибка добавления магазина", "danger");
    load.handleLoad();
  }
}
</script>
