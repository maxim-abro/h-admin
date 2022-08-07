<template>
  <h1 class="text-2xl font-bold mb-5">Добавить магазин</h1>
  <div class="flex gap-5">
    <div class="w-9/12 rounded rounded-lg flex-col p-5 items-center shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full">
      <form @submit.prevent>
        <label for="title" class="mb-2 font-bold block">Название</label>
        <m-input
          type="text"
          name="title"
          class="mb-5"
        />

        <label for="description" class="mb-2 font-bold block">Описание</label>
        <textarea
          name="description"
          class="block mb-5 placeholder-zinc-800 text-zinc-900 border border-zinc-300 bg-white focus:outline-0 rounded
          p-2 box-border w-full focus:outline-0 focus:ring focus:ring-primary"
        ></textarea>

        <label for="contact" class="mb-2 font-bold block">Контакт сайта</label>
        <m-input
          type="text"
          name="contact"
          class="mb-5"
        />

        <label for="url" class="mb-2 font-bold block">Ссылка</label>
        <m-input
          type="url"
          name="url"
          class="mb-5"
        />

        <label for="dostavka" class="mb-2 font-bold block">Виды доставки</label>
        <m-input
          type="text"
          name="dostavka"
          class="mb-5"
        />
      </form>
    </div>

    <div class="w-3/12">
      <div class="rounded rounded-lg flex-col p-5 items-center shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full mb-5">
        <h2 class="text-lg font-medium">Публикация</h2>
        <m-switch class="mb-3">Горячее предложение</m-switch>

        <m-button class="uppercase font-bold">Опубликовать</m-button>
      </div>

      <div class="rounded rounded-lg flex-col p-5 items-center shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full">
        <h2 class="text-lg font-medium">Категории</h2>

        <label for="category" v-for="category of data.categories">
          <input name="category" type="checkbox">
          <span></span>
        </label>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MInput from '@/components/_core/MInput.vue'
import MButton from '@/components/_core/MButton.vue'
import MSwitch from '@/components/_core/MSwitch.vue'
import http from '@/modules/api'
import { onMounted, reactive, computed } from "vue";
import type { CategoryModel } from "@/models/category.model";

const data = reactive({
  categories: [] as object[]
})

onMounted(async () => {
  const categories = await http.get('/category')

  data.categories = categories.data
})
</script>
