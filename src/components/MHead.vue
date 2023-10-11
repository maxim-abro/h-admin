<template>
  <header
    class="flex sticky top-0 w-full z-20 border-b border-gray-200 bg-white"
  >
    <div class="h-16 flex justify-between items-center px-4 relative w-full">
      <button
        @click="popup.toggleMenu"
        class="text-zinc-600 sm:hidden block rounded-full hover:bg-zinc-300 h-[28px] w-[28px] hover:text-black"
      >
        <font-awesome-icon icon="bars" />
      </button>
      <button
        @click="aside.toggleAside"
        class="text-zinc-600 hidden sm:block rounded-full hover:bg-zinc-300 h-[28px] w-[28px] hover:text-black"
      >
        <font-awesome-icon icon="bars" />
      </button>

      <div class="flex justify-center items-center">
        <button
          class="text-zinc-600 rounded-full hover:bg-zinc-300 h-[28px] w-[28px] hover:text-black mr-4"
        >
          <font-awesome-icon icon="bell" />
        </button>
        <div class="relative">
          <div
            class="flex justify-center items-center cursor-pointer relative px-3 py-1 rounded-lg hover:bg-zinc-200 active:bg-zinc-300"
            :class="{ 'bg-zinc-200': isUserMenuOpen }"
            @click="isUserMenuOpen = !isUserMenuOpen"
          >
            <div
              class="h-[28px] w-[28px] mr-2 rounded-full bg-zinc-400 text-xs justify-center items-center flex"
            >
              <div class="">
                {{ auth.userData.name ? auth.userData.name[0].toUpperCase() : ""
                }}{{
                  auth.userData.name
                    ? auth.userData.name[
                        auth.userData.name.length - 1
                      ].toUpperCase()
                    : ""
                }}
              </div>
            </div>
            <div class="text-xs">
              <div class="font-medium">
                {{ auth.userData ? auth.userData.name : "" }}
              </div>
              <div class="font-bold">
                {{ auth.userData ? auth.userData.email : "" }}
              </div>
            </div>
          </div>
          <UserMenu v-if="isUserMenuOpen" @close="isUserMenuOpen = false" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAsideStore } from "@/stores/aside";
import { useAuthStore } from "@/stores/auth";
import { usePopupStore } from "@/stores/popup";
import UserMenu from "@/components/UserMenu.vue";
import { ref } from "vue";
import type { Ref, UnwrapRef } from "vue";

const auth = useAuthStore();
const aside = useAsideStore();
const popup = usePopupStore();

const isUserMenuOpen: Ref<UnwrapRef<boolean>> = ref(false);
</script>
