<template>
  <input
    v-model="data.inputData"
    @input="updateValue($event.target.value)"
    @blur="$emit('blur')"
    @change="$emit('change', $event)"
    :type="type"
    :placeholder="placeholder"
    :name="name"
    class="focus:outline-0 rounded p-2 box-border w-full focus:outline-0 focus:ring focus:ring-primary"
    :class="
      dark
        ? 'bg-zinc-700 text-zinc-300'
        : 'placeholder-zinc-800 text-zinc-900 border border-zinc-300 bg-white'
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
  inputData: "" as any,
});

const emit = defineEmits(["update:modelValue"]);

function updateValue(value) {
  emit("update:modelValue", value);
}

onMounted(() => {
  data.inputData = props.inputProp;
});
</script>
