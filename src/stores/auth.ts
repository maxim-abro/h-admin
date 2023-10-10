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
  login: string;
  avatar: string;
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
        const result = await http.post("/user/login", data);

        this.setToken(result.data.token);
        return "ok";
      } catch (e) {
        console.log(e);
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
        login: result.data.login,
        avatar: result.data.avatar,
      });
    },
    logout(): void {
      this.token = "";
      this.userData = {
        id: 0,
        email: "",
        login: "",
        avatar: "",
      };
      localStorage.removeItem("jwt_token");
    },
  },
});
