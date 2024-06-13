import { GetServerSidePropsContext } from "next/types";

import axios, { AxiosError } from "axios";

import { getIsServer } from "@/utils/getIsEnvironment";

let context: GetServerSidePropsContext | null = null;
export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

export const nextInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const imageRequestInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

instance.interceptors.request.use(async (config) => {
  try {
    if (getIsServer()) {
      nextInstance.defaults.headers.cookie = context?.req.headers.cookie!;
    }

    const res = await nextInstance.get("/api/cookies");
    const { ACCESS_TOKEN } = res.data;

    if (ACCESS_TOKEN) {
      config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return Promise.reject(error);
    }
  }

  return config;
});

instance.interceptors.response.use();
