<template>
  <m-global-load />
  <slot />
  <m-alert
    :type="alertStore.type"
    :open-props="alertStore.open"
    @close="alertStore.open = false"
    >{{ alertStore.text }}</m-alert
  >
  <m-global-load />
</template>

<script setup lang="ts">
import { useAlertStore } from "@/stores/alert";
import MGlobalLoad from "@/components/_core/MGlobalLoad.vue";
import MAlert from "@/components/_core/MAlert.vue";

const alertStore = useAlertStore();
</script>
