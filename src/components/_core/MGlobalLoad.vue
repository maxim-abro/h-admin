<template>
  <div class="fixed z-50 w-[100vw] h-[100vh] bg-[#00000010] flex justify-center items-center" v-if="load.isLoad">
    <div class="flex justify-center items-center">
      <img src="@/assets/loader.png" alt="" class="w-20 h-20 animate-spin">
    </div>
  </div>
</template>

<script setup lang="ts">
import {useLoadStore} from "@/stores/load";
const load = useLoadStore();
</script>

<style scoped>
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fdb13c;
  border-color: #fdb13c transparent #fdb13c transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
