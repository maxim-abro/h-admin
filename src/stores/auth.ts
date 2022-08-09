import { defineStore } from "pinia";
import http from "@/modules/api";

type ResultAuth = {
  avatar?: string;
  email: string;
  id: number;
  login: string;
  passwordHash: string;
  registerDate: string;
  uin: string;
};

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // @ts-ignore
    token: localStorage.getItem("jwt_token") as any,
    // @ts-ignore
    name: localStorage.getItem("name") as any,
    // @ts-ignore
    email: localStorage.getItem("email") as any,
  }),
  getters: {
    isAuth: (state) => !!state.token,
  },
  actions: {
    setToken(token: string) {
      // @ts-ignore
      localStorage.setItem("jwt_token", token);
      this.token = token;
    },
    setEmail(email: string) {
      // @ts-ignore
      localStorage.setItem("email", email);
      this.email = email;
    },
    setName(name: string) {
      // @ts-ignore
      localStorage.setItem("name", name);
      this.name = name;
    },
    logout() {
      this.token = "";
      this.email = "";
      this.name = "";
      // @ts-ignore
      localStorage.removeItem("jwt_token");
      // @ts-ignore
      localStorage.removeItem("email");
      // @ts-ignore
      localStorage.removeItem("name");
    },
    addCookie() {
      // @ts-ignore
      this.token = localStorage.getItem("jwt_token");
      // @ts-ignore
      this.email = localStorage.getItem("email");
      // @ts-ignore
      this.name = localStorage.getItem("name");
    },
    async login(data: any) {
      try {
        const result = await http.post("/auth/login", {
          email: data.email,
          password: data.password,
        });

        this.setToken(result.data.hash);
        this.setName(result.data.dataValues.email);
        this.setEmail(result.data.dataValues.login);
        return "ok";
      } catch (e) {
        console.log(e);
        // @ts-ignore
        return e.response.status;
      }
    },
  },
});
