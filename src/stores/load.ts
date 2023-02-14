import { defineStore } from "pinia";

export const useLoadStore = defineStore({
  id: "load",
  state: () => ({
    isLoad: true as boolean,
  }),
  getters: {},
  actions: {
    handleLoad() {
      this.isLoad = !this.isLoad;
    },
  },
});
