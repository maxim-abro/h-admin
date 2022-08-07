import axios, { type AxiosInstance } from "axios";

const url = 'http://localhost:4000/'
// const url = "https://za-halyavoi.ru/api"

const api: AxiosInstance = axios.create({
  baseURL: url,
});

export default api;
