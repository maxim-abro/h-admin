<template>
  <div class="rounded bg-white shadow p-8">
    <form @submit.prevent="fetchForm">
      <label for="email" class="">Email</label>
      <m-input
        name="email"
        placeholder="Ваша почта"
        color="primary"
        class="mb-4 mt-1"
        type="email"
        v-model="data.email"
      />

      <label for="password">пароль</label>
      <m-input
        name="password"
        placeholder="Ваш пароль"
        class="mb-4 mt-1"
        type="password"
        v-model="data.password"
      />

      <div class="text-red-500 text-sm" v-if="data.err">{{ data.err }}</div>

      <m-button color="primary" type="submit"> Войти </m-button>
    </form>
  </div>
</template>

<script setup lang="ts">
import MInput from "@/components/_core/MInput.vue";
import MButton from "@/components/_core/MButton.vue";
import { computed, reactive } from "vue";
import http from "@/modules/api";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const data = reactive({
  email: "" as string,
  password: "" as string,
  err: "" as string,
});

const fetchForm = async () => {
  const result = await authStore.login({
    email: data.email,
    password: data.password,
  });

  if (result === "ok") {
    router.push("/");
  } else {
    data.err = "Неправильная почта или пароль";
  }
};
</script>
