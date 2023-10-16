<template>
  <div
    class="relative h-full flex flex-auto flex-col px-4 sm:px-6 md:px-8 py-4 sm:py-6"
  >
    <h1 class="mb-4 text-2xl font-bold">Добавить событие</h1>

    <form @submit.prevent="handleForm">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="lg:col-span-2">
          <div class="flex flex-col mb-8">
            <label class="mb-2">Название события</label>
            <m-input v-model="data.holidayData.title" placeholder="название" />
          </div>
          <div class="flex flex-col mb-8">
            <label class="mb-2">Описание события</label>
            <textarea
              v-model="data.holidayData.description"
              placeholder="описание"
              class="rounded-lg p-2 box-border placeholder-zinc-300 h-40 text-zinc-900 border-2 border-zinc-300 bg-white w-full focus:outline-0 focus:border-primary dark:focus:border-primary dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-600"
            />
          </div>
        </div>

        <div class="lg:col-span-1">
          <div
            v-if="!data.holidayData.image"
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
            v-if="data.holidayData.image"
            :src="`https://za-halyavoi.ru/api/static/holidays/${data.holidayData.image}`"
            alt
          />
        </div>
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
import MButton from "@/components/_core/MButton.vue";
import { useLoadStore } from "@/stores/load";
import { useAlertStore } from "@/stores/alert";
import http from "@/modules/api";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import logging from "@/modules/logging";

interface HolidayDto {
  title: string;
  description: string;
  image: string;
}

const load = useLoadStore();
const alert = useAlertStore();
const router = useRouter();

const data = reactive({
  holidayData: {} as HolidayDto,
});

const inputImage = async (event) => {
  try {
    load.handleLoad();

    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    const res = await http.post("/upload_holiday", formData);

    data.holidayData.image = res.data;

    alert.handleAlert("Картинка загружена", "success");
    load.handleLoad();
  } catch (e) {
    console.log(e);
    alert.handleAlert("Ошибка загрузки картинки", "danger");
    load.handleLoad();
  }
};

const handleForm = async () => {
  try {
    load.handleLoad();
    await http.post("/holiday", {
      title: data.holidayData.title,
      description: data.holidayData.description,
      image: data.holidayData.image,
    });

    await logging("Добавил новый тег", "add");

    alert.handleAlert("Тег добавлен", "success");
    load.handleLoad();
  } catch (e) {
    console.log(e);
    alert.handleAlert("Ошибка добавления праздника", "danger");
    load.handleLoad();
  }
};
</script>
