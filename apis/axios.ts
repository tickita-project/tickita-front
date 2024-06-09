import axios from "axios";

import getCookie from "@/utils/getCookie";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

export const postRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

postRequest.interceptors.request.use((config) => {
  const token = getCookie("accessToken");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 인터셉터 res 설정(에러 처리 등)
instance.interceptors.response.use();
