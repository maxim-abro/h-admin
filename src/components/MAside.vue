<template>
  <div
    class="slide-nav bg-zinc-200"
    :class="aside.open ? 'slide-nav-expand' : ''"
    :style="`width:${aside.open ? '290px' : '80px'}`"
  >
    <div class='h-16 flex items-center'>
      <img src="@/assets/logo.png" alt="" class="" />
    </div>
    <!--    <div v-for='item of props.menu' class='flex' :class='aside.open ? "justify-between" : "justify-center"'>-->
    <!--      <div class=''><font-awesome-icon :icon='item.icon'/> <span v-if='aside.open'>{{ item.title }}</span></div>-->
    <!--    </div>-->
    <template v-for="(item, _idx) of props.menu">
      <m-collapse>
        <template #trigger>
          <div
            class="flex cursor-pointer px-2 mb-2"
            :class="aside.open ? 'justify-between' : 'justify-center'"
          >
            <div class="">
              <font-awesome-icon class='mr-2' :icon="item.icon" />
              <span v-if="aside.open">{{ item.title }}</span>
            </div>

            <font-awesome-icon v-if='aside.open' class='arrow' icon='chevron-up'/>
          </div>
        </template>

        <template #content>
          123
        </template>
      </m-collapse>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useAsideStore } from "@/stores/aside";
import MCollapse from "@/components/_core/MCollapse.vue";

interface Menu {
  title: string;
  url: string;
  icon: string;
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
