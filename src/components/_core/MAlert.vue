<template>
  <div
    class="rounded text-white p-2 fixed bottom-3 shadow shadow-lg shadow-zinc-500 left-1/2 z-50 w-11/12 -translate-x-1/2"
    :class="computedType"
    v-if="openProps"
  >
    <div class="relative">
      <slot />
      <button @click="$emit('close')">
        <font-awesome-icon
          icon="x"
          class="absolute right-3 top-1/2 -translate-y-1/2"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, defineProps, withDefaults, onMounted } from "vue";
interface Props {
  openProps?: boolean;
  type: string;
}

const props = withDefaults(defineProps<Props>(), {
  openProps: false,
  type: "primary",
});
const colors = [
  {
    type: "primary",
    class: "bg-primary",
  },
  {
    type: "secondary",
    class: "bg-second",
  },
  {
    type: "danger",
    class: "bg-red-500",
  },
  {
    type: "warning",
    class: "bg-orange-500",
  },
  {
    type: "success",
    class: "bg-green-500",
  },
];
onMounted(() => {
  data.open = props.openProps;
});
const data = reactive({
  open: false as boolean,
});
const computedType = computed(() => {
  const comp: { type: string; class: string } | undefined = colors.find(
    (i) => i.type === props.type
  );
  return comp.class || "bg-primary";
});
</script>
