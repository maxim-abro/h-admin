<template>
  <div
    class="relative h-full flex flex-auto flex-col px-4 sm:px-6 py-4 sm:py-6 md:px-8"
  >
    <h1 class="mb-4 text-2xl font-bold">Дашборд CPA perfluence</h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 my-4">
      <m-card>
        <div class="p-3">
          <div class="flex items-center gap-4">
            <div
              class="rounded-lg bg-indigo-100 text-indigo-600"
              style="
                width: 55px;
                height: 55px;
                min-width: 55px;
                line-height: 55px;
                font-size: 27px;
              "
            >
              <span class="flex h-full items-center justify-center">
                <font-awesome-icon icon="shop" />
              </span>
            </div>
            <div>
              <div class="flex gap-1.5 items-end mb-2">
                <h3
                  class="font-bold text-black text-2xl leading-none dark:text-white"
                >
                  {{ perfShop.length }}
                </h3>
                <p class="font-semibold">Доступные магазины</p>
              </div>
            </div>
          </div>
        </div>
      </m-card>
      <m-card>
        <div class="p-3">
          <div class="flex items-center gap-4">
            <div
              class="rounded-lg bg-cyan-100 text-cyan-600"
              style="
                width: 55px;
                height: 55px;
                min-width: 55px;
                line-height: 55px;
                font-size: 27px;
              "
            >
              <span class="flex h-full items-center justify-center">
                <font-awesome-icon icon="link" />
              </span>
            </div>
            <div>
              <div class="flex gap-1.5 items-end mb-2">
                <h3
                  class="font-bold text-black text-2xl leading-none dark:text-white"
                >
                  {{ perfLink.length }}
                </h3>
                <p class="font-semibold">Линки</p>
              </div>
            </div>
          </div>
        </div>
      </m-card>
      <!--      <m-card>-->
      <!--        <div class="p-3">-->
      <!--          <div class="flex items-center gap-4">-->
      <!--            <button-->
      <!--              @click="updateSlonShops"-->
      <!--              class="rounded-lg bg-green-100 text-green-600 transition-all duration-300 hover:bg-green-600 hover:text-green-200"-->
      <!--              style="-->
      <!--                width: 55px;-->
      <!--                height: 55px;-->
      <!--                min-width: 55px;-->
      <!--                line-height: 55px;-->
      <!--                font-size: 27px;-->
      <!--              "-->
      <!--            >-->
      <!--              <span class="flex h-full items-center justify-center">-->
      <!--                <font-awesome-icon icon="radiation" />-->
      <!--              </span>-->
      <!--            </button>-->
      <!--            <div>-->
      <!--              <div class="flex gap-1.5 items-end mb-2">-->
      <!--                <h3 class="font-bold text-black text-2xl leading-none dark:text-white">-->
      <!--                  Обновить магазины-->
      <!--                </h3>-->
      <!--                <p class="font-semibold"></p>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </m-card>-->
      <!--      <m-card>-->
      <!--        <div class="p-3">-->
      <!--          <div class="flex items-center gap-4">-->
      <!--            <button-->
      <!--              @click="deleteLinksSlon"-->
      <!--              class="rounded-lg bg-red-100 text-red-600 transition-all duration-300 hover:bg-red-600 hover:text-red-200"-->
      <!--              style="-->
      <!--                width: 55px;-->
      <!--                height: 55px;-->
      <!--                min-width: 55px;-->
      <!--                line-height: 55px;-->
      <!--                font-size: 27px;-->
      <!--              "-->
      <!--            >-->
      <!--              <span class="flex h-full items-center justify-center">-->
      <!--                <font-awesome-icon icon="radiation" />-->
      <!--              </span>-->
      <!--            </button>-->
      <!--            <div>-->
      <!--              <div class="flex gap-1.5 items-end mb-2">-->
      <!--                <h3 class="font-bold text-black text-2xl leading-none dark:text-white">-->
      <!--                  Удалить старые линки-->
      <!--                </h3>-->
      <!--                <p class="font-semibold"></p>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </m-card>-->
    </div>

    <m-card>
      <div class="p-3">
        <div
          class="flex justify-between items-center flex-col sm:flex-row mb-4"
        >
          <h3 class="text-xl font-bold">Магазины adv cake</h3>

          <div class="flex items-center flex-col-reverse sm:flex-row">
            <div class="">
              <input
                type="checkbox"
                class="mr-1"
                id="not_added"
                v-model="isNotAddedShops"
              />
              <label class="mr-4" for="not_added">Только не добавленные</label>
            </div>
            <m-input
              v-model="filterData"
              type="search"
              placeholder="поиск..."
              class="w-max"
            />
          </div>
        </div>

        <div class="max-w-full overflow-x-scroll">
          <table class="w-full">
            <thead>
              <tr class="bg-zinc-50 dark:bg-gray-800 font-[100]">
                <th class="text-left">id</th>
                <th class="">Название</th>
                <th class="">url</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="i of filteredPerfShop"
                :key="i.id"
                class="text-center hover:bg-zinc-50 dark:hover:bg-gray-700 border-b border-b-collapse dark:border-gray-700"
              >
                <td class="text-left py-3">{{ i.id }}</td>
                <td>
                  {{ i.name }}
                </td>
                <td>
                  {{ i.category_name }}
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
import { onMounted, ref, watch } from "vue";
import type { Ref, UnwrapRef } from "vue";
import MCard from "@/components/_core/MCard.vue";
import http from "@/modules/api";
import MInput from "@/components/_core/MInput.vue";
import { useAlertStore } from "@/stores/alert";
import { useLoadStore } from "@/stores/load";

interface PerfShopModel {
  id: number;
  logo: string;
  name: string;
  category_id: number;
  category_name: string;
  activeBloggers: number;
  product_info: string;
}
interface PerfLinks {
  id: number;
  id_perf: number;
  id_shop: number;
  shop: {
    title: string;
  };
  perfluence_shop: {
    name: string;
  };
}

const alert = useAlertStore();
const load = useLoadStore();

const perfShop: Ref<UnwrapRef<PerfShopModel[]>> = ref([]);
const filteredPerfShop: Ref<UnwrapRef<PerfShopModel[]>> = ref([]);
const filterInput: Ref<UnwrapRef<string>> = ref("");
const perfLink: Ref<UnwrapRef<PerfLinks[]>> = ref([]);
const isNotAddedShops: Ref<UnwrapRef<boolean>> = ref(false);

onMounted(async () => {
  await loadData();
});

watch(() => filterInput.value, filterData);
watch(() => isNotAddedShops.value, filterData);

function filterData() {
  if (filterInput.value) {
    const result = perfShop.value.filter((i) =>
      i.name.toLowerCase().includes(filterInput.value.toLowerCase())
    );
    filteredPerfShop.value = isNotAddedShops.value
      ? filterAddedShops(result)
      : result;
  } else {
    filteredPerfShop.value = isNotAddedShops.value
      ? filterAddedShops(perfShop.value)
      : perfShop.value;
  }
}

function filterAddedShops(shops: PerfShopModel[]): PerfShopModel[] {
  return shops.filter((c) => {
    const find = perfLink.value.find((l) => {
      return l.perfluence_shop.name === c.name;
    });
    return !find;
  });
}

async function loadData() {
  load.handleLoad();
  const perfShopData = await http.get("/perfluence/all_shops");
  const perfLinkData = await http.get("/perfluence/all_links");
  perfShop.value = perfShopData.data;
  filteredPerfShop.value = perfShopData.data;
  perfLink.value = perfLinkData.data;
  load.handleLoad();
}
</script>
