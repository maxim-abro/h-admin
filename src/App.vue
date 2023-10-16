<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import { computed } from "vue";
import { useDark, useToggle } from "@vueuse/core";

const route = useRoute();
const isDark = useDark();
const toggleDark = useToggle(isDark);

const layout = computed(() => {
  return route.meta.layout ? `${route.meta.layout}-layout` : "default-layout";
});
</script>
