<template>
  <div class="px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:px-">
    Copyright © 2023 za-halyavoi rights reserved. version {{ configStore.version }}
  </div>
</template>

<script setup>
import { useConfigStore } from "@/stores/config";
let configStore = useConfigStore();
</script>
