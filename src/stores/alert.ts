import { defineStore } from "pinia";

export const useAlertStore = defineStore({
  id: "alert",
  state: () => ({
    text: "" as string,
    type: "primary" as string,
    open: false as boolean,
  }),
  getters: {},
  actions: {
    handleAlert(text: string, type = "primary") {
      this.text = text;
      this.type = type;
      this.open = true;
      setTimeout(() => {
        this.open = false;
      }, 3000);
    },
  },
});
