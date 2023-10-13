<template>
  <m-card
    class="p-8 max-w-[1000px] mx-auto prose lg:prose-xl prose-stone mb-10 prose-a:bg-[#fdb13c60] prose-xl-hr:py-0 prose-xl-hr:my-0"
  >
    <h1>{{ help.title }}</h1>
    <small class="block"
      >Автор: <span class="font-bold">{{ help.user_v2.login }}</span></small
    >
    <small class="block"
      >Последнее обновление:
      <span class="font-bold">{{ getRussianDate(help.date) }}</span></small
    >
    <hr class="py-0 my-0" />
    <div v-html="help.body"></div>
  </m-card>
</template>

<script setup lang="ts">
import MCard from "@/components/_core/MCard.vue";
import { onMounted, ref } from "vue";
import type { Ref, UnwrapRef } from "vue";
import { useRoute } from "vue-router";
import api from "@/modules/api";
import type { AxiosResponse } from "axios";

const route = useRoute();

interface HelpType {
  id: number;
  title: string;
  date: Date;
  body: string;
  user_v2: {
    login: string;
  };
}

const help: Ref<UnwrapRef<HelpType>> = ref({
  id: 0,
  title: "",
  date: new Date(),
  body: "",
  user_v2: {
    login: "",
  },
});

onMounted(async () => {
  const helpResponse: AxiosResponse<HelpType, null> = await api.get<HelpType>(
    `/help/${route.params.id}`
  );
  help.value = helpResponse.data;
});

function getRussianDate(date: Date) {
  return new Date(date).toLocaleDateString("ru", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}
</script>
