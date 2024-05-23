import axios from "axios";

const instance = axios.create({
  baseURL: "", // 추후 base url 설정
});

// 인터셉터 req 설정(헤더 Authorization 추가 등)
instance.interceptors.request.use();

// 인터셉터 res 설정(에러 처리 등)
instance.interceptors.response.use();
