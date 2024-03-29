import { defineStore } from "pinia";

export const useLoadStore = defineStore({
  id: "load",
  state: () => ({
    isLoad: false as boolean,
  }),
  getters: {},
  actions: {
    handleLoad() {
      this.isLoad = !this.isLoad;
    },
  },
});
