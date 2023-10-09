<template>
  <div
    class="relative h-full flex flex-auto flex-col px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:px-8"
  >
    <div class="flex justify-between items-center flex-col sm:flex-row mb-4">
      <h1 class="text-xl font-bold mb-2 sm: mb-0">Промокоды</h1>

      <div class="flex items-center">
        <VueMultiselect
          class="mr-4"
          style="transition: none"
          v-if="data.shops.length"
          v-model="data.activeShop"
          :options="[{ uin: '%', title: 'Выберите магазин' }, ...data.shops]"
          track-by="uin"
          label="title"
          placeholder="Выберите магазин"
        ></VueMultiselect>
        <m-button
          class="text-xs sm:text-base"
          @click="$router.push('/coupons/add/')"
          >добавить&nbsp;промокод</m-button
        >
      </div>
    </div>

    <m-card class="min-w-full overflow-x-scroll p-3">
      <table class="w-full">
        <thead>
          <tr class="bg-zinc-100">
            <th>Название</th>
            <th>Магазин</th>
            <th>Просмотры</th>
            <th>Лайки</th>
            <th>Тип</th>
            <th>Действие</th>
            <th>Топ</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="post of data.coupons" :key="post.uin" class="border-y">
            <th class="py-2 px-2 min-w-[150px]">{{ post.title }}</th>
            <th class="py-2 px-2">{{ post.shop.title }}</th>
            <th class="py-2 px-2">{{ post.counter }}</th>
            <th class="py-2 px-2">{{ post.rating }}</th>
            <th class="py-2 px-2">
              {{ post.type === "promoCode" ? "Промокод" : "Скидка" }}
            </th>
            <th class="flex min-w-[100px] items-center justify-center">
              <button
                class="hover:bg-zinc-200 rounded-full w-8 h-8"
                @click="router.push(`/coupons/edit/${post.uin}`)"
              >
                <font-awesome-icon icon="pen" />
              </button>
              <button
                class="hover:bg-zinc-200 rounded-full w-8 h-8 text-red-500"
                @click="deleteCoupon(post.uin)"
              >
                <font-awesome-icon icon="ban" />
              </button>
            </th>
            <th>
              <input
                type="checkbox"
                v-model="post.recomended"
                @change="toggleChecked(post.uin, $event.target.checked)"
              />
            </th>
          </tr>
        </tbody>
      </table>
    </m-card>

    <m-pagination
      v-model="data.pagination.current_page"
      :pages="data.pagination.total_pages"
      @update:model-value="changePage"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from "vue";
import { useAlertStore } from "@/stores/alert";
import { useLoadStore } from "@/stores/load";
import MButton from "@/components/_core/MButton.vue";
import http from "@/modules/api";
import MPagination from "@/components/_core/MPagination.vue";
import { useRouter } from "vue-router";
import MCard from "@/components/_core/MCard.vue";
import VueMultiselect from "vue-multiselect";

const alert = useAlertStore();
const load = useLoadStore();
const router = useRouter();

const data = reactive({
  shops: [] as object[],
  coupons: [] as object[],
  activeShop: {
    uin: "%",
    title: "Выберите магазин",
  } as object,
  orderData: {
    col: "" as string,
    type: "" as string,
  },
  pagination: {
    current_page: 1,
    total_pages: 1,
    total_elements: 1,
  },
});

onMounted(async () => {
  try {
    load.handleLoad();
    const shops = await http.get("/admin/v2/shop/all");
    const coupons = await http.get("/admin/post?page=1");
    data.shops = shops.data;
    data.coupons = coupons.data.rows;
    data.pagination.total_elements = coupons.data.count;
    data.pagination.total_pages = Math.ceil(coupons.data.count / 100);
    load.handleLoad();
  } catch (e) {
    console.log(e);
    load.handleLoad();
    alert.handleAlert("Ошибка загрузки!!", "danger");
  }
});

watch(
  () => data.activeShop,
  async () => await changeShop()
);

async function changePage() {
  load.handleLoad();
  const result = await http.get(
    `/admin/post?page=${data.pagination.current_page}&${
      data.activeShop.uin !== "%" ? "shop=" + data.activeShop.uin : ""
    }`
  );

  data.coupons = result.data.rows;
  load.handleLoad();
}

async function changeShop() {
  load.handleLoad();
  data.pagination.current_page = 1;
  const result = await http.get(
    `/admin/post?page=${data.pagination.current_page}&${
      data.activeShop.uin !== "%" ? "shop=" + data.activeShop.uin : ""
    }`
  );
  data.pagination.total_elements = result.data.count;
  data.pagination.total_pages = Math.ceil(result.data.count / 100);
  data.coupons = result.data.rows;
  load.handleLoad();
}

async function toggleChecked(uin: string, val: boolean): Promise<void> {
  load.handleLoad();
  await http.patch(`/admin/post/${uin}`, {
    recomended: val,
  });
  load.handleLoad();
}

async function deleteCoupon(uin: string) {
  load.handleLoad();
  await http.delete(`/admin/post/${uin}`);
  load.handleLoad();
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
