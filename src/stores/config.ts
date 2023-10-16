import { defineStore } from "pinia";

export const useConfigStore = defineStore({
  id: "config",
  state: () => ({
    version: "v2.3.2",
  }),
});
