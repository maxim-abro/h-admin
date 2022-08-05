<template>
  <header class="px-4 drop-shadow w-full h-16 bg-white -mx flex items-center fixed top-0">
    <button class="text-second hover:text-primary h-full hover:duration-75 duration-75 mr-4" @click="data.openMenu = !data.openMenu">
      <font-awesome-icon icon="bars" class="text-3xl"/>
    </button>
    <router-link to="/">
      <img src="@/assets/logo.png" alt="" class="h-16">
    </router-link>
  </header>
  <div class="px-4 pt-4 min-h-screen bg-zinc-100 flex gap-8">
    <aside
      class="pt-16 -ml-4 w-[130px] h-[calc(100vh - 4rem)] overflow-auto bg-white shadow"
      :style="!data.openMenu ? 'margin-left: -145px' : ''"
    >Aside</aside>
    <main class="mt-16 w-full">
      <slot/>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import {reactive} from "vue";

const data = reactive({
  openMenu: false as boolean
})
</script>
