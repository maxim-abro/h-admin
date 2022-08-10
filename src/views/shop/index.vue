<template>
  <div class="flex md:flex-row flex-col justify-between mb-5">
    <h1 class="text-3xl font-bold">Магазины</h1>

    <div class="flex md:flex-row flex-col w-full lg:w-max gap-5">
      <m-input
        class="w-full"
        placeholder="поиск"
        type="search"
        v-model="data.search"
      />
      <m-button
        @click="$router.push('/shop/add')"
        color="primary"
        class="w-auto lg:w-64"
        >Добавить магазин</m-button
      >
    </div>
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
            <th class="w-px"></th>
            <th class="ltr:text-left rtl:text-right uppercase">Название</th>
            <th class="text-center uppercase">Просмотры</th>
            <th class="text-center uppercase">Дата</th>
            <th class="uppercase"></th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="shop of searchData"
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
                @click="deleteShop(shop.uin)"
              >
                <font-awesome-icon icon="trash-can" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import MButton from "@/components/_core/MButton.vue";
import MInput from "@/components/_core/MInput.vue";
import MLoad from "@/components/_core/MLoad.vue";
import { onMounted, reactive, watch, computed } from "vue";
import type { ShopModel } from "@/models/shop.model";
import http from "@/modules/api";
import { useAlertStore } from "@/stores/alert";
// @ts-ignore
import _ from "lodash";
import {useLoadStore} from "@/stores/load";

const alert = useAlertStore();
const load = useLoadStore();
const data = reactive({
  shops: [] as ShopModel[],
  load: true as boolean,
  search: "" as string,
});

onMounted(async () => {
  const resData = await http.get("/admin/shop");

  data.shops = resData.data;

  data.load = false;
});

const deleteShop = async (uin: string) => {
  try {
    load.handleLoad();
    await http.delete(`/admin/shop/${uin}`);

    data.shops = data.shops.filter((i) => i.uin !== uin);

    alert.handleAlert("Магазин удалён", "success");
    load.handleLoad();
  } catch (e) {
    console.log(e);
    alert.handleAlert("Ошибка удаления магазина", "danger");
    load.handleLoad();
  }
};

const searchData = computed(() => {
  if (!data.search) {
    return data.shops;
  } else {
    return data.shops.filter((i:any) => {
      return i.title.toLowerCase().indexOf(data.search.toLowerCase()) > -1 || i.tags.toLowerCase().indexOf(data.search.toLowerCase()) > -1
    });
  }
});
</script>
