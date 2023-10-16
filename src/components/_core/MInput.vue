<template>
  <input
    v-model="data.inputData"
    @input="updateValue($event.target.value)"
    @blur="$emit('blur')"
    :type="type"
    :placeholder="placeholder"
    :name="name"
    class="focus:outline-0 rounded-lg p-2 box-border w-full focus:border-primary dark:focus:border-primary dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-600"
    :class="
      dark
        ? 'bg-zinc-700 text-zinc-300'
        : 'placeholder-zinc-300 text-zinc-900 border-2 border-zinc-300 bg-white'
    "
  />
</template>

<script setup lang="ts">
import { defineProps, onMounted, reactive, defineEmits } from "vue";
const props = defineProps<{
  type?: string;
  placeholder?: string;
  name?: string;
  inputProp?: string;
  dark?: boolean;
}>();
const data = reactive({
  inputData: props.inputProp,
});
const emit = defineEmits(["update:modelValue", "blur"]);
function updateValue(value: any) {
  emit("update:modelValue", value);
}
</script>
