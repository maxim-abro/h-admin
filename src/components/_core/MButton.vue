<template>
  <button
    @click="$emit('click', $event)"
    :type="type"
    :disabled="disabled"
    :class="getColor"
    class="rounded text-second block p-2"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps, onMounted, reactive, computed } from "vue";

const props = defineProps<{
  color?: string;
  type?: string;
  disabled?: boolean;
}>();

const data = reactive({
  primary: "" as string,
});

const getColor = computed((): string => {
  if (props.color === "primary") {
    if (!props.disabled) {
      return "bg-primary hover:bg-primary-300 focus:bg-primary-700";
    } else {
      return "bg-primary-200";
    }
  } else {
    return "bg-primary";
  }
});
</script>
