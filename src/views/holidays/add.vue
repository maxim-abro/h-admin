<template>
  <h1 class="text-3xl font-bold mb-5">Добавить праздник</h1>

  <div class="flex flex-col lg:flex-row gap-5">
    <div
      class="w-full lg:w-9/12 h-max rounded rounded-lg flex-col p-5 items-center shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full"
    >
      <form @submit.prevent>
        <label for="title" class="mb-2 font-bold block">Название</label>
        <m-input
          v-model="data.holidayData.title"
          type="text"
          name="title"
          class="mb-5"
        />

        <label for="description" class="mb-2 font-bold block">Описание</label>
        <textarea
          v-model="data.holidayData.description"
          name="description"
          class="block mb-5 placeholder-zinc-800 text-zinc-900 border border-zinc-300 bg-white focus:outline-0 rounded p-2 box-border w-full focus:outline-0 focus:ring focus:ring-primary"
        ></textarea>
      </form>
    </div>

    <div class="w-full lg:w-3/12">
      <div
        class="rounded rounded-lg flex-col p-5 items-center shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full mb-5"
      >
        <h2 class="text-lg font-medium mb-6">Публикация</h2>
        <m-button
          @click="handleForm"
          class="uppercase font-bold"
          type="button"
          :disabled="data.loadHandle"
          >Опубликовать</m-button
        >
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

<script setup>
import http from "@/modules/api";
import MInput from "@/components/_core/MInput.vue";
import MButton from "@/components/_core/MButton.vue";
import { useAlertStore } from "@/stores/alert";
import { useLoadStore } from "@/stores/load";
import { reactive } from "vue";

const alert = useAlertStore();
const load = useLoadStore();

const data = reactive({
  loadHandle: false,
  holidayData: {
    title: "",
    description: "",
    image: "",
  },
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
    data.loadHandle = true;
    await http.post("/holiday", {
      title: data.holidayData.title,
      description: data.holidayData.description,
      image: data.holidayData.image,
    });

    alert.handleAlert("Магазин добавлен", "success");
    load.handleLoad();
  } catch (e) {
    console.log(e);
    alert.handleAlert("Ошибка добавления праздника", "danger");
    load.handleLoad();
  }
};
</script>
