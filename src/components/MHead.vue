<template>
  <header
    class="flex sticky top-0 w-full z-20 border-b border-gray-200 dark:border-gray-700 bg-white"
  >
    <div class="h-16 flex justify-between items-center px-4 relative w-full">
      <button
        @click="aside.toggleAside"
        class="text-zinc-600 rounded-full hover:bg-zinc-300 h-[28px] w-[28px] hover:text-black"
      >
        <font-awesome-icon icon="bars" />
      </button>

      <div class='flex justify-center items-center'>
        <button
          class="text-zinc-600 rounded-full hover:bg-zinc-300 h-[28px] w-[28px] hover:text-black mr-4"
        >
          <font-awesome-icon icon="bell" />
        </button>
        <div class='flex justify-center items-center'>
          <div class='h-[28px] w-[28px] mr-2 rounded-full flex justify-center items-center bg-zinc-400'>
            <font-awesome-icon class='' icon='user' />
          </div>
          <div class='text-xs'>
            <div class='font-medium'>Админ</div>
            <div class='font-bold'>{{ auth.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAsideStore } from "@/stores/aside";
import { useAuthStore } from '@/stores/auth';
const auth = useAuthStore();
const aside = useAsideStore();
</script>
