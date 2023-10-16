<template>
  <div class="flex fixed top-0 left-0 w-full h-full z-50">
    <div class="w-9/12 h-full bg-white dark:bg-slate-900 overflow-auto z-50 p-3">
      <div
        class="h-16 flex items-center justify-center uppercase text-light text-primary-900 text-center"
      >
        za-halyavoi
      </div>

      <template v-for="(item, _idx) of props.menu" :key="item.title">
        <div
          @click="$emit('toggleMenu', _idx)"
          class="flex cursor-pointer items-center justify-between px-2 mb-0.5 rounded-lg py-1 hover:bg-zinc-300 dark:hover:bg-slate-800 hover:text-black dark:hover:text-white"
        >
          <div class="">
            <font-awesome-icon class="mr-2" :icon="item.icon" />
            <span>{{ item.title }}</span>
          </div>
          <font-awesome-icon
            :class="item.open ? '' : 'rotate-180'"
            icon="chevron-up"
          />
        </div>
        <template v-if="item.open">
          <router-link
            :to="child.url"
            v-for="child of item.children"
            :key="child.title"
            class="cursor-pointer rounded-lg flex items-center py-1 hover:bg-zinc-300 dark:hover:bg-slate-800 hover:text-black dark:hover:text-white"
          >
            <div class="px-4">{{ child.title }}</div>
          </router-link>
        </template>
      </template>
    </div>
    <div class="w-3/12 h-full bg-[#00000090]" @click="popup.toggleMenu"></div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { usePopupStore } from "@/stores/popup";
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

const popup = usePopupStore();

const props = defineProps<Props>();
</script>
