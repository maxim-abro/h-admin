<template>
  <div
    class="relative h-full flex flex-auto flex-col px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:px-8"
  >
    <div class="flex justify-between items-center mb-8">
      <h1 class="mb-4 text-2xl font-bold">Все события</h1>

      <router-link
        to="/holiday/add"
        class="bg-primary rounded text-second block p-2"
        >Добавить событие</router-link
      >
    </div>

    <m-card>
      <div class="p-3">
        <div class="max-w-full overflow-x-scroll">
          <table class="w-full">
            <thead>
              <tr class="bg-zinc-50 font-[100]">
                <th class="">id</th>
                <th class="">Название</th>
                <th class="">Картинка</th>
                <th class="">Количество купонов</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="i of data.holidays"
                :key="i.id_holiday"
                @click="router.push(`/holiday/${i.lat_title}`)"
                class="text-center hover:bg-zinc-50 border-b border-b-collapse cursor-pointer"
              >
                <td class="py-3">{{ i.id_holiday }}</td>
                <td>{{ i.title }}</td>
                <td>
                  <img
                    :src="`https://za-halyavoi.ru/api/static/holidays/${i.image}`"
                    alt=""
                    class="w-40 mx-auto my-5"
                  />
                </td>
                <td>{{ i.posts.length }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </m-card>
  </div>
</template>

<script setup lang="ts">
import MCard from "@/components/_core/MCard.vue";
import { useLoadStore } from "@/stores/load";
import http from "@/modules/api";
import { onMounted, reactive } from "vue";
import type { PostModel } from "@/models/post.model";
import { useRouter } from "vue-router";

interface Holiday {
  id_holiday: number;
  title: string;
  description: string;
  image: string;
  lat_title: string;
  posts: PostModel[];
}

const router = useRouter();
const load = useLoadStore();

const data = reactive({
  holidays: [] as Holiday[],
});

onMounted(async () => {
  load.handleLoad();
  const resData = await http.get("/holiday/all");
  data.holidays = resData.data;

  load.handleLoad();
});
</script>
