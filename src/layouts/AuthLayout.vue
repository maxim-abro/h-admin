<template>
  <m-global-load/>
  <div class="flex justify-center items-center bg-zinc-50 h-[100vh]">
    <header class="fixed top-0 left-0 w-full bg-white drop-shadow py-3 px-8">
      <div class="uppercase font-light">za-halyavoi</div>
    </header>
    <slot />
  </div>
</template>

<script setup lang="ts">
import MGlobalLoad from "@/components/_core/MGlobalLoad.vue";
</script>
