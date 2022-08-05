import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://za-halyavoi.ru/api",
});

export default api;
