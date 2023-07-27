<template>
  <div
    class="relative h-full flex flex-auto flex-col px-4 sm:px-6 md:px-8 py-4 sm:py-6"
  >
    <h1 class="mb-4 text-2xl font-bold">Событие "{{ data.holiday.title }}"</h1>
    <img
      class="mx-auto mb-5"
      :src="`https://za-halyavoi.ru/api/static/holidays/${data.holiday.image}`"
      :alt="data.holiday.title"
    />
    <p v-html="data.holiday.description"></p>

    <m-card>
      <div class="p-3">
        <h2 class="mb-5 text-xl font-bold">Активные купоны</h2>
        <div
          class="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 gap-8 mb-8"
          v-if="data.holiday"
        >
          <div
            v-for="post of data.holiday.posts"
            :key="post.uin"
            class="rounded rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full p-5 mb-5"
          >
            <img
              :src="`https://za-halyavoi.ru/api/static/${post.shop.image}`"
              alt=""
              class="mx-auto h-[59px]"
            />
            <div class="text-xl font-medium text-center">{{ post.title }}</div>

            <div class="text-sm text-zinc-400 mb-3">
              <span class="text-black">Магазин </span>{{ post.shop.title }}
            </div>
            <div class="">Действителен до {{ post.endDate }}</div>
          </div>
        </div>
      </div>
    </m-card>

    <m-card>
      <div class="p-3">
        <h2 class="mb-5 text-xl font-bold">Добавить купон</h2>

        <div class="overflow-x-auto">
          <table class="table-auto w-full" v-if='data.posts.length'>
            <thead>
              <tr class="bg-zinc-50 font-[100]">
                <th>id</th>
                <th>Название</th>
                <th>Магазин</th>
                <th>Действителен до</th>
                <th>Добавить</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="post of computedPosts"
                :key="post.id"
                class="text-center hover:bg-zinc-50 border-b border-b-collapse cursor-pointer"
              >
                <td class="py-3">{{ post.id }}</td>
                <td class="">{{ post.title }}</td>
                <td class="">{{ post.shop.title }}</td>
                <td class="">{{ post.endDate }}</td>
                <td class="">
                  <m-button @click="linkPostToHoliday(post.id)"
                    >Привязать</m-button
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </m-card>
  </div>
</template>

<script setup lang="ts">
import MButton from "@/components/_core/MButton.vue";
import { useAlertStore } from "@/stores/alert";
import { useLoadStore } from "@/stores/load";
import http from "@/modules/api";
import { computed, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import type { PostModel } from "@/models/post.model";

interface HolidayModel {
  id_holiday: number;
  title: string;
  description: string;
  image: string;
  lat_title: string;
  posts: PostModel[];
}

const alert = useAlertStore();
const load = useLoadStore();
const route = useRoute();

const data = reactive({
  holiday: {} as HolidayModel,
  posts: [] as PostModel[],
});

onMounted(async () => {
  await loadData();
});

const computedPosts = computed(() => {
  let result = data.posts;

  data.holiday.posts.forEach((ph) => {
    result = result.filter((i) => i.uin !== ph.uin);
  });

  return result;
});

const linkPostToHoliday = async (post_id: string) => {
  try {
    load.handleLoad();
    await http.post("/holiday/link", {
      post_id,
      holiday_id: data.holiday.id_holiday,
    });

    await loadData();

    alert.handleAlert("Купон привязан к празднику", "success");
    load.handleLoad();
  } catch (e) {
    console.log(e);
    alert.handleAlert("Ошибка привязки купона к празднику", "danger");
    load.handleLoad();
  }
};

const loadData = async () => {
  load.handleLoad();
  const holiday = await http.get(`/holiday/id/${route.params.id}`);
  const posts = await http.get("/post/all");
  data.posts = posts.data;
  data.holiday = holiday.data;
  load.handleLoad();
};
</script>
