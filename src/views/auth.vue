<template>
  <div class="grid lg:grid-cols-3 h-[100vh]">
    <div
      class="bg-second h-full py-6 px-16 flex-col justify-between hidden lg:flex"
    >
      <img src="@/assets/logo.png" alt="" />

      <p class="text-white">
        Copyright © 2022-2023 <span class="font-bold">Za halyavoi</span>
      </p>
    </div>

    <div
      class="col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800"
    >
      <div class="xl:w-[450px] px-8 text-zinc-700">
        <div class="mb-8"></div>
        <div class="mb-8">
          <h3 class="mb-1 font-bold text-xl text-black">Добро пожаловать</h3>
          <p>Введите данные, что-бы войти в личный кабинет.</p>
        </div>
        <div>
          <form @submit.prevent="fetchForm">
            <label class="font-bold" for="email">Логин</label>
            <m-input
              v-model="data.email"
              placeholder="admin@email.com"
              type="email"
              id="email"
              class="mb-6"
              :disabled="data.ok"
            />
            <label class="font-bold" for="password">Пароль</label>
            <m-input
              v-model="data.password"
              placeholder="123456"
              type="password"
              id="password"
              class="mb-6"
              :disabled="data.ok"
            />
            <m-button
              v-if="!data.ok"
              color="primary"
              class="w-full"
              type="submit"
              >Войти</m-button
            >
            <a
              v-if="data.ok"
              class="bg-primary hover:bg-primary-300 focus:bg-primary-700 rounded text-second block p-2"
              href="/"
              >Перейти в панель администратора</a
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import http from "@/modules/api";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { useLoadStore } from "@/stores/load";
import MInput from "@/components/_core/MInput.vue";
import MButton from "@/components/_core/MButton.vue";
import { useAlertStore } from "@/stores/alert";

const loader = useLoadStore();
const alert = useAlertStore();
const authStore = useAuthStore();
const router = useRouter();

const data = reactive({
  email: "" as string,
  password: "" as string,
  err: "" as string,
  ok: false as boolean,
});

const fetchForm = async () => {
  loader.handleLoad();
  const result = await authStore.login({
    email: data.email,
    password: data.password,
  });

  if (result === "ok") {
    data.ok = true;
    loader.handleLoad();
  } else {
    alert.handleAlert("Неправильная почта или пароль", "danger");
    loader.handleLoad();
  }
};
</script>
