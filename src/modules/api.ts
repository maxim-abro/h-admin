import axios, { type AxiosInstance } from "axios";

// const url = "http://localhost:4000/";
const url = "https://za-halyavoi.ru/api";

const api: AxiosInstance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
  },
});

export default api;
