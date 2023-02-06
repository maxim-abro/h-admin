<template>
  <div
    class="rounded rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full p-5 my-8"
    v-if="data.holiday"
  >
    <h1 class="text-3xl text-center mb-16">
      Праздник <span class="font-bold">"{{ data.holiday.title }}".</span>
    </h1>
    <img
      class="mx-auto"
      :src="`https://za-halyavoi.ru/api/static/holidays/${data.holiday.image}`"
      :alt="data.holiday.title"
    />
    <p>{{ data.holiday.description }}</p>
  </div>

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

  <h2 class="mb-5 text-xl font-bold">Добавить купон</h2>

  <div
    v-if="data.posts"
    class="rounded rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full p-5 my-8"
  >
    <div class="overflow-x-auto">
      <table class="table-auto w-full">
        <thead>
          <tr class="text-primary">
            <th class="text-center uppercase">id</th>
            <th class="text-center uppercase">Название</th>
            <th class="text-center uppercase">Магазин</th>
            <th class="text-center uppercase">Действителен до</th>
            <th class="text-center uppercase">Добавить</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="post of computedPosts"
            :key="post.uin"
            class="my-4 border-b"
          >
            <td class="text-center">{{ post.id }}</td>
            <td class="text-center">{{ post.title }}</td>
            <td class="text-center">{{ post.shop.title }}</td>
            <td class="text-center">{{ post.endDate }}</td>
            <td class="text-center">
              <m-button @click="linkPostToHoliday(post.id)" class="mx-auto">Привязать</m-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import MButton from "@/components/_core/MButton.vue";
import { useAlertStore } from "@/stores/alert";
import { useLoadStore } from "@/stores/load";
import http from "@/modules/api";
import { computed, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

const alert = useAlertStore();
const load = useLoadStore();
const route = useRoute();

const data = reactive({
  holiday: null,
  posts: null,
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

const linkPostToHoliday = async (post_id) => {
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
  const holiday = await http.get(`/holiday/id/${route.params.id}`);
  const posts = await http.get("/post/all");
  data.posts = posts.data;
  data.holiday = holiday.data;
}
</script>
