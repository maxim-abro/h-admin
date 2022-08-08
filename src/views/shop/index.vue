<template>
  <div class="flex justify-between mb-5">
    <h1 class="text-3xl font-bold">Посты</h1>

    <div class="flex w-max gap-5">
      <m-input placeholder="поиск" type="search" />
      <m-button color="primary" class="w-64">Добавить пост</m-button>
    </div>
  </div>

  <div
    class="rounded rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full p-5 mb-5"
  >
    <div class="overflow-x-auto">
      <table class="table table-auto w-full">
        <thead>
          <tr class="text-primary">
            <th class="w-px"></th>
            <th class="ltr:text-left rtl:text-right uppercase">Название</th>
            <th class="text-center uppercase">Просмотры</th>
            <th class="text-center uppercase">Дата</th>
            <th class="uppercase"></th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="shop of data.shops"
            :key="shop.uin"
            class="hover:bg-primary-100 cursor-pointer my-4 border-b"
          >
            <td class="pr-3">
              <input type="checkbox" />
            </td>
            <td class="">{{ shop.title }}</td>
            <td class="text-center">{{ shop.counter }}</td>
            <td class="text-center">{{ shop.endDate }}</td>
            <td class="">
              <button
                class="rounded rounded-full border border-2 border-black w-10 h-10 mr-3"
                @click="$router.push(`/post/${shop.uin}`)"
              >
                <font-awesome-icon icon="pen" />
              </button>

              <button
                class="rounded text-red-500 rounded-full border border-2 border-red-500 w-10 h-10"
              >
                <font-awesome-icon icon="trash-can" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!--  <div class="rounded rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full p-5">-->
  <!--    <m-pagination-->
  <!--      v-model="data.pagination.current_page"-->
  <!--      :page-count="data.pagination.total_page"-->
  <!--    />-->
  <!--  </div>-->
</template>

<script setup lang="ts">
import MButton from "@/components/_core/MButton.vue";
import MInput from "@/components/_core/MInput.vue";
import { onMounted, reactive, watch } from "vue";
import MPagination from "@/components/_core/MPagination.vue";
import type { ShopModel } from "@/models/shop.model";
import http from "@/modules/api";

const data = reactive({
  shops: [] as ShopModel[],
});

onMounted(async () => {
  const resData = await http.get("/admin/shop");

  data.shops = resData.data;
});
</script>
