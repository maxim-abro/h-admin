<template>
  <h1 class="text-3xl font-bold mb-5">Добавить новость</h1>
  <m-input class="mb-5" v-model="data.blogData.title" placeholder="Заголовок" />

  <textarea
    v-model="data.blogData.description"
    name="description"
    placeholder="Описание"
    class="block mb-10 placeholder-zinc-800 text-zinc-900 border border-zinc-300 bg-white focus:outline-0 rounded p-2 box-border w-full focus:outline-0 focus:ring focus:ring-primary"
  ></textarea>

  <h2 class="text-2xl font-bold mb-2">Выберите блок</h2>
  <div class="flex">
    <select class="w-40 mr-10" v-model="data.activeTypeBlock">
      <option value="p">параграф</option>
      <option value="img">картинка</option>
      <option value="h2">h2</option>
      <option value="h3">h3</option>
      <option value="h4">h4</option>
    </select>
    <m-button @click="addBlock(data.activeTypeBlock)">Добавить блок</m-button>
  </div>
  <h2 class="text-2xl font-bold mb-2">Контент</h2>

  <template v-for="(i, _idx) of data.blogData.body" :key="_idx">
    <div v-if="i.type === 'p'" class="mb-5">
      <textarea
        v-model="i.content"
        name="description"
        placeholder="Параграф"
        class="block mb-5 placeholder-zinc-800 text-zinc-900 border border-zinc-300 bg-white focus:outline-0 rounded p-2 box-border w-full focus:outline-0 focus:ring focus:ring-primary"
      ></textarea>
    </div>
    <div v-if="i.type === 'img'" class="mb-5"></div>
    <div
      v-if="i.type === 'h2' || i.type === 'h3' || i.type === 'h4'"
      class="mb-5"
    >
      <m-input v-model="i.content" :placeholder="`тег ${i.type}`" />
    </div>
    <div v-if="i.type === 'img'" class="mb-5">
      <m-input @change="inputImage($event, _idx)" type="file" />
    </div>
  </template>

  <m-button>Добавить новость</m-button>
</template>

<script setup>
import MButton from "@/components/_core/MButton.vue";
import http from "@/modules/api";
import MInput from "@/components/_core/MInput.vue";
import { onMounted, reactive, watch, computed } from "vue";
import { useRouter } from "vue-router";
import {useAlertStore} from "@/stores/alert";
import {useLoadStore} from "@/stores/load";

const alert = useAlertStore();
const load = useLoadStore();
const router = useRouter();
const data = reactive({
  blogData: {
    title: "",
    description: "",
    body: [],
    date: new Date(),
    preview: "",
    counter: 0,
    likes: 0,
    author: "",
  },
  activeTypeBlock: "p",
});

onMounted(async () => {});

async function inputImage(event, idx) {
  try {
    load.handleLoad();
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    const res = await http.post("/upload_blog", formData);

    data.blogData.body[idx].content = res.data;

    alert.handleAlert("Картинка загружена", "success");
    load.handleLoad();
  } catch (e) {
    console.log(e);
    alert.handleAlert("Ошибка загрузки картинки", "danger");
    load.handleLoad();
  }
}
function addBlock(value) {
  data.blogData.body.push({
    type: value,
    content: "",
  });
}
</script>
