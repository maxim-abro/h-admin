<template>
  <div class='h-full flex flex-auto flex-col px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:px-8'>

    <h1 class='mb-4 text-2xl font-bold'>Добавить новый промокод</h1>

    <form>
      <div class='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <div class='lg:col-span-2'>
          <div class="flex flex-col mb-8">
            <label class="mb-2">Название промокод</label>
            <m-input placeholder="название" />
          </div>

          <div class="flex flex-col mb-8">
            <label class="mb-2">Описание промокоды</label>
            <textarea
              placeholder="описание"
              class="focus:outline-0 rounded-lg p-2 box-border placeholder-zinc-300 h-40 text-zinc-900 border border-2 border-zinc-300 bg-white w-full focus:outline-0 focus:border-primary"
            />
          </div>

          <div class="flex flex-col mb-8">
            <label class="mb-2">Ссылка на скидку</label>
            <m-input placeholder="ссылка" type='url' />
          </div>

        </div>
      </div>
      <div
        class="sticky z-10 border-t-2 -bottom-1 -mx-8 px-8 flex items-center justify-end py-4 bg-white"
      >
        <m-button type="submit">добавить</m-button>
      </div>
    </form>
  </div>
</template>

<script setup lang='ts'>
import MInput from "@/components/_core/MInput.vue";
import { onMounted, ref } from "vue";
import http from "@/modules/api";
import { useLoadStore } from "@/stores/load";
import { useAlertStore } from "@/stores/alert";
import MButton from "@/components/_core/MButton.vue";

const load = useLoadStore();
const alert = useAlertStore();

</script>
