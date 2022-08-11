<template>
  <h1 class="text-2xl font-bold mb-5">Изображения adv cake</h1>

  <m-card class="mb-5">
    <select
      class="mb-5 placeholder-zinc-800 text-zinc-900 border border-zinc-300 bg-white focus:outline-0 rounded p-2 box-border ml-3 focus:outline-0 focus:ring focus:ring-primary"
      v-model="data.inputShopId"
      @change="getImages(data.inputShopId)"
    >
      <option v-for="shop in data.cakeShops" :key="shop.id" :value="shop.id">
        {{ shop.title }}
      </option>
    </select>
  </m-card>

  <div class="flex flex-row gap-5" v-if="data.images.length">
    <div class="grid grid-cols-3 gap-5 w-9/12">
      <m-card
        v-for="image of data.images"
        :key="image.id"
        @click="changeActive(image)"
        class="flex justify-between items-center cursor-pointer"
      >
        <div class="flex items-center">
          <img :src="image.banner_image_url" alt="" class="w-20 my-auto mr-2" />
          <div class="">
            <div class="text-sm font-medium">{{ image.name }}</div>
            <div class="text-sm">{{ image.mime_type }}</div>
          </div>
        </div>
      </m-card>
    </div>

    <m-card class="w-3/12 h-max" v-if="!data.activeImage">
      <div class="">Выберите файл</div>
    </m-card>

    <m-card class="w-3/12 h-max" v-if="data.activeImage">
      <img
        :src="data.activeImage.banner_image_url"
        alt=""
        class="w-full my-auto mb-3"
      />

      <div class="text-sm mb-1">
        <b>Название:</b> {{ data.activeImage.name }}
      </div>
      <div class="text-sm mb-1">
        <b>Тип файла:</b> {{ data.activeImage.mime_type }}
      </div>
      <div class="text-sm mb-1">
        <b>Ширина:</b> {{ data.activeImage.size_width }}px
      </div>
      <div class="text-sm mb-3">
        <b>Высота:</b> {{ data.activeImage.size_height }}px
      </div>

      <m-button @click="saveToLibrary">Сохранить в библиотеку</m-button>
    </m-card>
  </div>
</template>

<script setup lang="ts">
import MCard from "@/components/_core/MCard.vue";
import MButton from "@/components/_core/MButton.vue";
import { reactive, onMounted } from "vue";
import http from "@/modules/api";
import { useLoadStore } from "@/stores/load";
import { useAlertStore } from "@/stores/alert";
const load = useLoadStore();
const alert = useAlertStore();

const data = reactive({
  cakeShops: [] as object[],
  inputShopId: "" as string,
  images: [] as object[],
  activeImage: null as any,
});

onMounted(async () => {
  const cakeShops = await http.get("/adv_cake/shop");

  data.cakeShops = cakeShops.data;
});

const getImages = async (idShop: string) => {
  try {
    load.handleLoad();
    const image = await http.get(`/adv_cake/image/${idShop}`);

    data.images = image.data.data;
    load.handleLoad();
  } catch (e) {
    console.log(e);
    load.handleLoad();
  }
};

const changeActive = (x: object) => (data.activeImage = x);

const saveToLibrary = async () => {
  try {
    load.handleLoad();
    await http.post("/admin/upload_img", {
      uri: data.activeImage.banner_image_url,
      path: ["library"],
      name: `${data.activeImage.name}.${data.activeImage.mime_type.split('/')[1]}`,
    });
    alert.handleAlert("Картинка загружена в библиотеку", "success");
    load.handleLoad();
  } catch (e) {
    console.log(e);
    alert.handleAlert("Ошибка сохранения картинки", "danger");
    load.handleLoad();
  }
};
</script>
