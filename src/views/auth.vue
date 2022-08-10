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
        :disabled="data.ok"
        v-model="data.email"
      />

      <label for="password">пароль</label>
      <m-input
        name="password"
        placeholder="Ваш пароль"
        class="mb-4 mt-1"
        type="password"
        :disabled="data.ok"
        v-model="data.password"
      />

      <div class="text-red-500 text-sm" v-if="data.err">{{ data.err }}</div>
      <div class="text-green-500 text-sm" v-if="data.ok">Авторизация прошла успешно</div>

      <m-button color="primary" type="submit" v-if="!data.ok"> Войти </m-button>
      <a v-if="data.ok" class="bg-primary hover:bg-primary-300 focus:bg-primary-700 rounded text-second block p-2" href="/">Перейти в панель администратора</a>
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
  ok: false as boolean,
});

const fetchForm = async () => {
  const result = await authStore.login({
    email: data.email,
    password: data.password,
  });

  if (result === "ok") {
    data.ok = true;
  } else {
    data.err = "Неправильная почта или пароль";
  }
};
</script>
