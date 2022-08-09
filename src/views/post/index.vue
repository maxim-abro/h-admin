<template>
  <div class="flex md:flex-row flex-col justify-between mb-5">
    <h1 class="text-3xl font-bold mb-5 lg:mb-0">Посты</h1>

    <div class="flex w-full lg:w-max gap-5">
      <m-input placeholder="поиск" type="search" />
    </div>
  </div>

  <m-load v-if="data.load"/>

  <div
    class="rounded rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full p-5 mb-5"
    v-if="!data.load"
  >
    <div class="overflow-x-auto">
      <table class="table table-auto w-full">
        <thead>
          <tr class="text-primary">
            <th class="w-px"></th>
            <th class="ltr:text-left rtl:text-right uppercase">Название</th>
            <th class="text-center uppercase">Просмотры</th>
            <th class="text-center uppercase">Дата</th>
            <th class="uppercase">Действия</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="post of data.posts"
            :key="post.uin"
            class="hover:bg-primary-100 cursor-pointer my-4 border-b"
          >
            <td class="pr-3">
              <input type="checkbox" />
            </td>
            <td class="">{{ post.title }}</td>
            <td class="text-center">{{ post.counter }}</td>
            <td class="text-center">{{ post.endDate }}</td>
            <td class="">
              <button
                class="rounded rounded-full border border-2 border-black w-10 h-10 mr-3"
                @click="$router.push(`/post/${post.uin}`)"
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

  <div
    class="rounded rounded-lg shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] bg-white w-full p-5"
  >
    <m-pagination
      v-model="data.pagination.current_page"
      :page-count="data.pagination.total_page"
    />
  </div>
</template>

<script setup lang="ts">
import MButton from "@/components/_core/MButton.vue";
import MInput from "@/components/_core/MInput.vue";
import MLoad from "@/components/_core/MLoad.vue";
import { onMounted, reactive, watch } from "vue";
import MPagination from "@/components/_core/MPagination.vue";
import type { PostModel } from "@/models/post.model";
import http from "@/modules/api";

const data = reactive({
  posts: [] as PostModel[],
  page: 1 as number,
  counter: 0 as number,
  pagination: {} as object,
  load: true as boolean,
});

onMounted(async () => {
  const postRes = await http.get("/post?page=1");

  data.pagination = {
    current_page: 1,
    total_elements: postRes.data.count,
    total_page: Math.ceil(postRes.data.count / 15),
  };

  data.posts = postRes.data.rows;
  data.counter = postRes.data.count;

  data.load = false;
});

const updatePosts = async () => {
  const postRes = await http.get(`/post?page=${data.pagination}`);
};

watch(
    // @ts-ignore
  () => data.pagination.current_page,
  () => {
    console.log("12313");
  }
);
</script>
