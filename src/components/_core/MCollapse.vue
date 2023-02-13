<template>
  <div :class="`${className} ${data.showContent ? '' : 'collapsed'}`">
    <component
      :is="triggerTag"
      :class="triggerClass"
      @click="data.showContent = !data.showContent"
    >
      <slot name="trigger" />
    </component>

    <transition
      v-if="animation"
      enter-active-class="duration-500 ease"
      enter-class="overflow-hidden max-h-0"
      enter-to-class="max-h-[500px] overflow-hidden"
      leave-active-class="duration-500 ease-[cubic-bezier(0, 1, 0.5, 1)]"
      leave-class="max-h-[500px] overflow-hidden"
      leave-to-class="overflow-hidden max-h-0"
    >
      <slot name="content" v-if="data.showContent" />
    </transition>
    <template v-else>
      <slot name="content" v-if="data.showContent" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive, watch, defineEmits } from "vue";
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default: "collapse flex flex-col",
  },
  triggerTag: {
    type: String,
    default: "div",
  },
  triggerClass: {
    type: String,
    default: "",
  },
  animation: {
    type: Boolean,
    default: false,
  },
});
const data = reactive({
  showContent: props.isVisible as boolean,
});
const emit = defineEmits(["trigger"]);
watch(
  () => data.showContent,
  () => {
    emit("trigger", data.showContent);
  }
);
const close = () => {
  data.showContent = false;
};
</script>

<style scoped>
.collapsed> .arrow {
  transform: rotate(-180deg);
}
</style>
