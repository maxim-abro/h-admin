<template>
  <h1 class="text-2xl font-bold mb-5">Библиотека</h1>

  <div class="flex flex-col xl:flex-row gap-5">
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full xl:w-9/12">
      <m-card
        class="flex items-center cursor-pointer"
        v-if="data.folderUri.length > 1"
        @click="backFolder"
      >
        <font-awesome-icon
          icon="reply"
          class="text-6xl text-primary-900 mr-2"
        />
        <div class="font-bold">Назад</div>
      </m-card>
      <m-card
        v-for="item of data.folder"
        :key="item"
        class="flex justify-between items-center cursor-pointer"
        @click="changeActive(item)"
      >
        <div class="flex items-center">
          <font-awesome-icon
            icon="folder"
            v-if="checkType(item) === 'folder'"
            class="text-6xl text-primary mr-2"
          />
          <img
            :src="`https://za-halyavoi.ru/api/static/${data.folderUri.join(
              '/'
            )}/${item}`"
            alt="item"
            class="w-20 my-auto mr-2"
            v-if="checkType(item) === 'image'"
          />

          <div class="text-second text-sm">{{ item }}</div>
        </div>

        <a
          :href="`https://za-halyavoi.ru/api/static/${data.folderUri.join(
            '/'
          )}/${item}`"
          v-if="checkType(item) === 'image'"
          target="_blank"
          download
          ><font-awesome-icon class="text-2xl text-primary-800" icon="download"
        /></a>

        <button v-if="checkType(item) === 'folder'" @click="openFolder(item)">
          <font-awesome-icon icon="folder-open" />
        </button>
      </m-card>
    </div>

    <aside class="w-full xl:w-3/12">
      <m-card>
        <font-awesome-icon
          icon="folder"
          v-if="checkType(data.active) === 'folder' && data.active"
          class="text-6xl text-primary mb-3"
        />
        <img
          :src="`https://za-halyavoi.ru/api/static/${data.folderUri.join(
            '/'
          )}/${data.active}`"
          alt="item"
          class="w-full my-auto mb-3"
          v-if="checkType(data.active) === 'image' && data.active"
        />
        <div class="" v-if="!data.active">Выберите файл</div>

        <div class="">{{ data.active }}</div>
      </m-card>
    </aside>
  </div>
</template>

<script setup lang="ts">
import MButton from "@/components/_core/MButton.vue";
import MInput from "@/components/_core/MInput.vue";
import MCard from "@/components/_core/MCard.vue";
import { reactive, onMounted } from "vue";
import http from "@/modules/api";

const data = reactive({
  folderUri: ["library"] as string[],
  folder: [] as string[],
  active: "",
});

onMounted(async () => {
  const folder = await http.post(`/admin/folder`, {
    uri: data.folderUri,
  });

  data.folder = folder.data;
});

const checkType = (x: string): string => {
  const type = x.split(".").length;
  if (type > 1) {
    return "image";
  } else {
    console.log(type);
    return "folder";
  }
};

const openFolder = async (folder: string) => {
  data.folderUri.push(folder);

  const folderRes = await http.post(`/admin/folder`, {
    uri: data.folderUri,
  });

  data.folder = folderRes.data;
};

const backFolder = async (folder: string) => {
  data.folderUri.pop();

  const folderRes = await http.post(`/admin/folder`, {
    uri: data.folderUri,
  });

  data.folder = folderRes.data;
}

const changeActive = (x: string) => (data.active = x);
</script>
