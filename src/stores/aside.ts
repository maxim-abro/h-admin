import { defineStore } from "pinia";

export const useAsideStore = defineStore({
  id: "aside",
  state: () => ({
    open: false as boolean,
  }),
  actions: {
    toggleAside() {
      this.open = !this.open;
    },
  },
});
