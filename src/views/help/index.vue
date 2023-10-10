<template>
  <div
    class="relative h-full flex flex-auto flex-col px-4 sm:px-6 py-4 sm:py-6 md:px-8"
  >
    <h1 class="mb-8 text-3xl font-bold">
      Инструкции по панели управления сайтом.
    </h1>

    <div class="grid grid-cols-3 gap-3" v-for="help of helps" :key="help.id">
      <m-card class="p-3 hover:drop-shadow-xl">
        <router-link :to="`/help/${help.id}`">
          <h2 class="font-bold mb-4 text-lg">{{ help.title }}</h2>
          <p><span class="font-bold">Автор:</span> {{ help.account.login }}</p>
          <p>
            <span class="font-bold">Дата обновления гайда: </span
            >{{ getRussianDate(help.date) }}
          </p>
        </router-link>
      </m-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ref, UnwrapRef } from "vue";
import api from "@/modules/api";
import type { AxiosResponse } from "axios";
import MCard from "@/components/_core/MCard.vue";

interface HelpType {
  id: number;
  title: string;
  date: Date;
  account: {
    login: string;
  };
}

const helps: Ref<UnwrapRef<HelpType[]>> = ref([]);

onMounted(async () => {
  const helpsResponse: AxiosResponse<HelpType[], null> = await api.get<
    HelpType[]
  >("/help");
  helps.value = helpsResponse.data;
});

function getRussianDate(date: Date) {
  return new Date(date).toLocaleDateString("ru", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}
</script>
