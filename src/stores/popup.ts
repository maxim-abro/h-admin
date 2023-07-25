import { defineStore } from "pinia";

export const usePopupStore = defineStore({
  id: "popup",
  state: () => ({
    openMobileMenu: false as boolean,
  }),
  getters: {},
  actions: {
    toggleMenu() {
      this.openMobileMenu = !this.openMobileMenu;
    },
  },
});
