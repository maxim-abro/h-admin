<template>
  <div
    class="relative h-full flex flex-auto flex-col px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:px-8"
  >
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">Магазины</h1>

      <div class="flex items-center">
        <m-input type='search'/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAlertStore } from "@/stores/alert";
import { useLoadStore } from "@/stores/load";
import MCard from "@/components/_core/MCard.vue";
import MInput from '@/components/_core/MInput.vue';

const alert = useAlertStore();
const load = useLoadStore();

onMounted(async () => {
  try {
    console.log(123);
    load.handleLoad();
  } catch (e) {
    console.log(e);
    alert.handleAlert("Ошибка загрузки!!", "danger");
  }
});
</script>
