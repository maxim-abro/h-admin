<template>
  <div
    class="relative h-full flex flex-auto flex-col px-4 sm:px-6 py-4 sm:py-6 md:px-8"
  >
    <m-card v-show="!preview" class="p-3">
      <div class="max-w-[1000px] mx-auto">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold my-4">Новый пост</h1>
          <m-button class="w-max" @click="preview = true">Предосмотр</m-button>
        </div>
        <div class="mb-2 text-lg font-bold">Название поста</div>
        <m-input
          v-model="blogInput.title"
          placeholder="Введите название поста"
          class="mb-8"
        />

        <div class="mb-2 text-lg font-bold">Краткое описание</div>
        <m-input
          v-model="blogInput.description"
          placeholder="Введите название поста"
          class="mb-8"
        />

        <div class="mb-2 text-lg font-bold">Картинка для поста</div>
        <m-input
          @change="fetchImage"
          type="file"
          placeholder="Введите название поста"
          class="mb-8"
        />

        <div class="mb-2 text-lg font-bold">Пост</div>
        <m-tiptap v-model="blogInput.body"></m-tiptap>

        <div class="mb-4 mt-8 text-lg font-bold">
          Теги (строго через запятую)
        </div>
        <m-input
          v-model="blogInput.tags"
          placeholder="Названия тегов"
          class="mb-8"
        />
      </div>
    </m-card>
    <m-card v-show="preview" class="p-3">
      <div class="max-w-[1000px] mx-auto">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold my-4">Предосмотр поста</h1>
          <m-button class="w-max" @click="preview = false">Назад</m-button>
        </div>
        <div
          class="prose lg:prose-xl prose-stone dark:prose-invert mb-10 max-w-none prose-a:bg-[#fdb13c60]"
        >
          <h1>{{ blogInput.title }}</h1>
          <small>{{ getTextDate(blogInput.date) }}</small>
          <div v-html="blogInput.body"></div>
        </div>
      </div>
    </m-card>
    <div class="sticky z-10 border-t-2 dark:border-slate-600 -bottom-1 -mx-8 px-8 py-4 bg-white dark:bg-slate-700">
      <div class="max-w-[1000px] mx-auto flex items-center justify-end">
        <m-button @click="fetchBlog(blogInput)">добавить</m-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MTiptap from "@/components/_core/MTiptap.vue";
import MCard from "@/components/_core/MCard.vue";
import api from "@/modules/api";
import MButton from "@/components/_core/MButton.vue";
import MInput from "@/components/_core/MInput.vue";
import { ref } from "vue";
import type { Ref, UnwrapRef } from "vue";
import { useLoadStore } from "@/stores/load";
import { useAlertStore } from "@/stores/alert";
import { useRouter } from "vue-router";
import http from "@/modules/api";
import logging from "@/modules/logging";

const load = useLoadStore();
const alert = useAlertStore();
const router = useRouter();

interface BlogType {
  title: string;
  description: string;
  body: string;
  date: Date;
  preview: string;
  tags: string;
}

const preview: Ref<UnwrapRef<boolean>> = ref(false);
const blogInput: Ref<UnwrapRef<BlogType>> = ref({
  title: "",
  description: "",
  body: "",
  date: new Date(),
  preview: "",
  tags: "",
});

function getTextDate(date: Date) {
  return new Date(date).toLocaleDateString("ru", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

async function fetchBlog(data: BlogType) {
  try {
    load.handleLoad();
    await api.post("/blog", {
      title: data.title,
      description: data.description,
      preview: data.preview,
      date: data.date,
      body: data.body,
      tags: data.tags.split(","),
    });
    alert.handleAlert("Блог добавлен", "success");
    await logging(`Добавил блог ${data.title}`, "add");
    load.handleLoad();
    await router.push("/");
  } catch (e) {
    console.log(e);

    alert.handleAlert("Ошибка добавления блога", "danger");
    load.handleLoad();
  }
}

async function fetchImage(event: any) {
  try {
    load.handleLoad();
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    const res = await http.post("/upload_blog", formData);
    blogInput.value.preview = `/blog/${res.data}`;
    alert.handleAlert("Изображение загружено", "danger");
    load.handleLoad();
  } catch (e) {
    console.log(e);

    alert.handleAlert("Ошибка загрузки изображения", "danger");
    load.handleLoad();
  }
}
</script>
