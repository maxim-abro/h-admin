<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
<script setup>
import { RouterView, useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const layout = computed(() => {
  // return `${route.meta.layout}-layout` || "default-layout";
  return route.meta.layout ? `${route.meta.layout}-layout` : "default-layout";
});
</script>
