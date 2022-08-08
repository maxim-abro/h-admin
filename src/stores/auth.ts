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
    token: $cookies.get("jwt_token") as any,
    // @ts-ignore
    name: $cookies.get("name") as any,
    // @ts-ignore
    email: $cookies.get("email") as any,
  }),
  getters: {
    isAuth: (state) => !!state.token,
  },
  actions: {
    setToken(token: string) {
      // @ts-ignore
      $cookies.set("jwt_token", token);
      this.token = token;
    },
    setEmail(email: string) {
      // @ts-ignore
      $cookies.set("email", email);
      this.email = email;
    },
    setName(name: string) {
      // @ts-ignore
      $cookies.set("name", name);
      this.name = name;
    },
    logout() {
      this.token = "";
      this.email = "";
      this.name = "";
      // @ts-ignore
      $cookies.remove("jwt_token");
      // @ts-ignore
      $cookies.remove("email");
      // @ts-ignore
      $cookies.remove("name");
    },
    addCookie() {
      // @ts-ignore
      this.token = $cookies.get("jwt_token");
      // @ts-ignore
      this.email = $cookies.get("email");
      // @ts-ignore
      this.name = $cookies.get("name");
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
