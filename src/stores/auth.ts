import { defineStore } from "pinia";
import http from "@/modules/api";
import type { AxiosResponse } from 'axios';

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
    token: localStorage.getItem("jwt_token") as string,
    name: localStorage.getItem("name") as string,
    email: localStorage.getItem("email") as string,
    userData: null,
  }),
  getters: {
    isAuth: (state) => !!state.token,
  },
  actions: {
    setToken(token: string) {
      localStorage.setItem("jwt_token", token);
      this.token = token;
    },
    setEmail(email: string) {
      localStorage.setItem("email", email);
      this.email = email;
    },
    setName(name: string) {
      localStorage.setItem("name", name);
      this.name = name;
    },
    setUserData(data: object) {
      this.userData = data;
    },
    logout() {
      this.token = "";
      this.email = "";
      this.name = "";
      localStorage.removeItem("jwt_token");
      localStorage.removeItem("email");
      localStorage.removeItem("name");
    },
    addCookie() {
      this.token = localStorage.getItem("jwt_token");
      this.email = localStorage.getItem("email");
      this.name = localStorage.getItem("name");
    },
    async login(data: object) {
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
    async getLoginData() {
      const result = await http.get("/auth/get");
      this.setUserData(result.data);
    }
  },
});
