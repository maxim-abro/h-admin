import { defineStore } from "pinia";
import http from "@/modules/api";
import type { AxiosResponse } from "axios";

type LoginDto = {
  email: string;
  password: string;
};

type UserData = {
  id: number;
  email: string;
  name: string;
};

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
    userData: {} as UserData,
  }),
  getters: {
    isAuth: (state) => !!state.token,
  },
  actions: {
    async login(data: LoginDto): Promise<any> {
      try {
        const result = await http.post("/user/auth", data);

        this.setToken(result.data.token);
        return "ok";
      } catch (e) {
        console.dir(e);
        // @ts-ignore
        return e.response.status;
      }
    },
    setToken(token: string): void {
      localStorage.setItem("jwt_token", token);
      this.token = token;
    },
    setUserData(data: UserData): void {
      this.userData = data;
    },
    async getLoginData(): Promise<void> {
      const result = await http.get("/user/get");
      this.setUserData({
        id: result.data.userId,
        email: result.data.email,
        name: result.data.name,
      });
    },
    logout(): void {
      this.token = "";
      this.userData = {
        id: 0,
        email: "",
        name: "",
      };
      localStorage.removeItem("jwt_token");
    },
  },
});
