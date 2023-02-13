<template>
  <header class='flex sticky top-0 w-full z-20 border-b border-gray-200 dark:border-gray-700'>
    <div class='h-16 flex justify-between px-4 relative w-full'>
      <button @click='aside.toggleAside' class='text-zinc-600 hover:text-black'><font-awesome-icon icon='bars'/></button>
    </div>
  </header>
</template>

<script setup lang='ts'>
import { useAsideStore } from '@/stores/aside';
const aside = useAsideStore();
</script>
