import axios, { AxiosError } from "axios";

import { getIsBrowser } from "@/utils/getIsEnvironment";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.request.use(async (config) => {
  const isBrowser = getIsBrowser();

  if (isBrowser) {
    try {
      const res = await axios.get("http://localhost:3000/api/cookies", { withCredentials: true });
      const { ACCESS_TOKEN } = res.data;

      if (ACCESS_TOKEN) {
        config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("cookies API 가져오는 데 실패함", error);
      }
    }
  }

  return config;
});

// 인터셉터 res 설정(에러 처리 등)
instance.interceptors.response.use();
