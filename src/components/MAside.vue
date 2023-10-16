<template>
  <div
    class="slide-nav px-3 bg-zinc-200 dark:bg-slate-700 dark:text-slate-300"
    :class="aside.open ? 'slide-nav-expand' : ''"
    :style="`width:${aside.open ? '290px' : '80px'}`"
  >
    <div
      class="h-16 flex items-center justify-center uppercase text-light text-primary-900 text-center"
    >
      {{ aside.open ? "za-halyavoi" : "zh" }}
    </div>
    <template v-for="(item, _idx) of props.menu" :key="item.title">
      <div
        @click="$emit('toggleMenu', _idx)"
        class="flex cursor-pointer items-center px-2 mb-0.5 rounded-lg py-1 hover:bg-zinc-300 hover:dark:bg-slate-600 hover:text-black dark:hover:text-slate-100"
        :class="aside.open ? 'justify-between' : 'justify-center'"
      >
        <div class="">
          <font-awesome-icon class="mr-2" :icon="item.icon" />
          <span v-if="aside.open">{{ item.title }}</span>
        </div>
        <font-awesome-icon
          v-if="aside.open"
          :class="item.open ? '' : 'rotate-180'"
          icon="chevron-up"
        />
      </div>
      <template v-if="item.open && aside.open">
        <router-link
          :to="child.url"
          v-for="child of item.children"
          :key="child.title"
          class="cursor-pointer rounded-lg flex items-center py-1 hover:bg-zinc-300 hover:dark:bg-slate-600 hover:text-black dark:hover:text-slate-100"
        >
          <div class="px-4">{{ child.title }}</div>
        </router-link>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useAsideStore } from "@/stores/aside";
import { defineProps } from "vue";

interface Menu {
  title: string;
  url: string;
  icon: string;
  open: boolean;
  children?: Menu[];
}
interface Props {
  menu: Menu[];
}

const aside = useAsideStore();
const props = defineProps<Props>();
</script>

<style scoped>
.side-nav {
  flex: 1 1 auto;
  flex-direction: column;
  flex-shrink: 0;
  transition-duration: 200ms;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 20;
}
.slide-nav-expand {
  height: 100vh;
  position: sticky;
  top: 0;
}
</style>
