<template>
  <h1 class="text-2xl font-bold mb-5">Добавить магазин</h1>
  <div class="flex flex-col lg:flex-row gap-5">
    <div
      class="w-full lg:w-9/12 h-max rounded rounded-lg flex-col p-5 items-center shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full"
    >
      <form @submit.prevent>
        <label for="title" class="mb-2 font-bold block">Название</label>
        <m-input
          type="text"
          name="title"
          class="mb-5"
          v-model="data.shopData.title"
        />

        <label for="description" class="mb-2 font-bold block">Описание</label>
        <textarea
          name="description"
          class="block mb-5 placeholder-zinc-800 text-zinc-900 border border-zinc-300 bg-white focus:outline-0 rounded p-2 box-border w-full focus:outline-0 focus:ring focus:ring-primary"
          v-model="data.shopData.description"
        ></textarea>

        <label for="contact" class="mb-2 font-bold block">Контакт сайта</label>
        <m-input
          type="text"
          name="contact"
          class="mb-5"
          v-model="data.shopData.contacts"
        />

        <label for="url" class="mb-2 font-bold block">Ссылка</label>
        <m-input
          type="url"
          name="url"
          class="mb-5"
          v-model="data.shopData.url"
        />

        <label for="dostavka" class="mb-2 font-bold block">Виды доставки</label>
        <m-input
          type="text"
          name="dostavka"
          class="mb-5"
          v-model="data.shopData.dostavka"
        />
      </form>
    </div>

    <div class="w-full lg:w-3/12">
      <div
        class="rounded rounded-lg flex-col p-5 items-center shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full mb-5"
      >
        <h2 class="text-lg font-medium">Публикация</h2>
        <m-switch class="mb-3">Горячее предложение</m-switch>

        <m-button class="uppercase font-bold" type="button" :disabled="data.loadHandle" @click="handleForm"
          >Опубликовать</m-button
        >
      </div>

      <div
        class="rounded rounded-lg flex-col p-5 items-center shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full mb-5"
      >
        <h2 class="text-lg font-medium mb-3">Категории</h2>

        <label for="category" class="block" v-for="category of data.categories">
          <input
            name="category"
            type="checkbox"
            class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-primary-600 checked:border-primary-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            v-model="category.checked"
          />
          <span>{{ category.title }}</span>
        </label>
      </div>

      <div
        class="rounded rounded-lg flex-col p-5 items-center shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full mb-5"
      >
        <h2 class="text-lg font-medium mb-3">теги</h2>
        <m-input type="text" v-model="data.shopData.tags" />
      </div>

      <div
        class="rounded rounded-lg flex-col p-5 items-center shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full"
      >
        <h2 class="text-lg font-medium mb-3">Изображение</h2>

        <input
          type="file"
          @change="inputImage"
          class="focus:outline-0 placeholder-zinc-800 bg-gray-200 p-2 w-full my-3 focus:outline-0 focus:ring focus:ring-primary"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed } from "vue";
import type { ShopModel } from "@/models/shop.model";
import http from "@/modules/api";
import MInput from "@/components/_core/MInput.vue";
import MButton from "@/components/_core/MButton.vue";
import MSwitch from "@/components/_core/MSwitch.vue";

const data = reactive({
  categories: [] as object[],
  shopData: {} as ShopModel,
  loadHandle: false as boolean,
});

onMounted(async () => {
  const categories = await http.get("/category");

  data.categories = categories.data.map((i:any) => {
    return {
      title: i.title,
      uin: i.uin,
      checked: false,
    };
  });
});

const checkedCategories = computed(() =>
  data.categories.filter((i:any) => i.checked)
);

const inputImage = async (event: any) => {
  try {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    const res = await http.post("/upload", formData);

    data.shopData.image = res.data;
  } catch (e) {
    console.log(e);
  }
};

const handleForm = async () => {
  try {
    data.loadHandle = true
    const categories = [] as object[];

    checkedCategories.value.forEach((i:any) => categories.push(i.uin));

    await http.post("/admin/shop", {
      title: data.shopData.title,
      description: data.shopData.description,
      image: data.shopData.image,
      contacts: data.shopData.contacts,
      url: data.shopData.url,
      dostavka: data.shopData.dostavka,
      tags: data.shopData.tags,
      categories: categories.join(","),
    });
  } catch (e) {
    console.log(e);
  }
};
</script>
