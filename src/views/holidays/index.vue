<template>
  <div class="flex md:flex-row flex-col justify-between mb-5">
    <h1 class="text-3xl font-bold">Праздники</h1>
    <m-button @click="$router.push('/holiday/add')"
      >Добавить праздник</m-button
    >
  </div>
  <m-load v-if="data.load" />

  <div
    class="rounded rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full p-5 mb-5"
    v-if="!data.load"
  >
    <div class="overflow-x-auto">
      <table class="table table-auto w-full">
        <thead>
          <tr class="text-primary">
            <th class="text-center uppercase">id</th>
            <th class="text-center uppercase">Название</th>
            <th class="text-center uppercase">картинка</th>
            <th class="text-center uppercase">Количество купонов</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="holiday of data.holidays"
            :key="holiday.id_holiday"
            @click="router.push(`/holiday/${holiday.id_holiday}`)"
            class="hover:bg-primary-100 cursor-pointer my-4 border-b"
          >
            <td class="text-center">{{ holiday.id_holiday }}</td>
            <td class="text-center">{{ holiday.title }}</td>
            <td class="text-center">
              <img
                :src="`https://za-halyavoi.ru/api/static/holidays/${holiday.image}`"
                alt=""
                class="w-40 mx-auto my-5"
              />
            </td>
            <td class="text-center">{{ holiday.posts.length }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import MButton from "@/components/_core/MButton.vue";
import MLoad from "@/components/_core/MLoad.vue";
import { onMounted, reactive, watch, computed } from "vue";
import http from "@/modules/api";
import { useRouter } from "vue-router";

const router = useRouter();
const data = reactive({
  holidays: [],
  load: true,
});

onMounted(async () => {
  const resData = await http.get("/holiday/all");

  data.holidays = resData.data;

  data.load = false;
});
</script>
