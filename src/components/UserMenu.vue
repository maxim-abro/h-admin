<template>
  <div
    class="absolute bottom-0 right-0 bg-white z-40 translate-y-full min-w-[300px] rounded-lg shadow-lg border"
  >
    <ul>
      <li class="m-2 py-1 rounded-lg font-bold hover:bg-zinc-200 relative">
        <router-link
          @click.prevent="goLink('/user')"
          to="/user"
          class="w-full h-full text-start block"
        >
          <font-awesome-icon
            icon="user"
            class="w-10 absolute left-0 top-1/2 -translate-y-1/2"
          />
          <span class="ml-10">Профиль</span>
        </router-link>
      </li>
      <li class="m-2 py-1 rounded-lg font-bold hover:bg-zinc-200 relative">
        <router-link
          @click.prevent="goLink('/users_stat')"
          to="/users_stat"
          class="w-full h-full text-start block"
        >
          <font-awesome-icon
            icon="chart-line"
            class="w-10 absolute left-0 top-1/2 -translate-y-1/2"
          />
          <span class="ml-10">Действия</span>
        </router-link>
      </li>

      <hr />

      <li class="m-2 py-1 rounded-lg font-bold hover:bg-zinc-200 relative">
        <button @click="logout" class="w-full h-full text-start">
          <font-awesome-icon
            icon="right-from-bracket"
            class="w-10 absolute left-0 top-1/2 -translate-y-1/2"
          />
          <span class="ml-10">Выйти</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const emit = defineEmits(["close"]);

function logout(): void {
  auth.logout();
  router.push("/auth");
}

function goLink(link: string): void {
  emit("close");
  router.push(link);
}
</script>
