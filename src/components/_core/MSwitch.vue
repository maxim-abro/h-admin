<template>
  <label
    class="relative flex justify-between items-center group p-2 cursor-pointer"
  >
    <slot />
    <input
      v-model="data.checked"
      type="checkbox"
      class="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
    />
    <span
      class="w-12 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-primary after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-5 group-hover:after:translate-x-0"
    ></span>
  </label>
</template>

<script setup lang="ts">
import { reactive, defineProps, onMounted } from "vue";

const data = reactive({
  checked: false as boolean,
});

const props = defineProps({
  checkedProps: {
    default: false,
    type: Boolean,
  },
});

onMounted(() => {
  data.checked = props.checkedProps;
});
</script>
