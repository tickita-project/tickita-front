import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

// 인터셉터 req 설정(헤더 Authorization 추가 등)
instance.interceptors.request.use();

// 인터셉터 res 설정(에러 처리 등)
instance.interceptors.response.use();
