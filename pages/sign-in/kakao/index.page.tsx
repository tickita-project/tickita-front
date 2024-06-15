import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useEffect } from "react";

import { useRouter } from "next/router";

import classNames from "classnames/bind";
import Lottie from "react-lottie-player";

import { instance } from "@/apis/axios";
import { PAGE_PATH } from "@/constants/pagePath";
import loadingLottie from "@/public/images/login-loading.json";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface ResponseType {
  id: number;
  isComplete: boolean;
  accessToken: string;
  accessTokenExpireAt: string;
  refreshToken: string;
  refreshTokenExpireAt: string;
}

interface KakaoProps {
  id: number;
  isComplete: boolean;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<KakaoProps>> {
  const { code } = context.query;

  try {
    const res = await instance.get("/login/oauth/kakao", {
      params: {
        code,
      },
    });
    const {
      id,
      isComplete,
      accessToken,
      accessTokenExpireAt,
      refreshToken,
      refreshTokenExpireAt,
    }: ResponseType = res.data;

    if (accessToken && refreshToken) {
      const ACCESS_TOKEN_EXPIRE_AT = new Date(accessTokenExpireAt).toUTCString();
      const REFRESH_TOKEN_EXPIRE_AT = new Date(refreshTokenExpireAt).toUTCString();

      const ACCESS_TOKEN = `ACCESS_TOKEN=${accessToken}; Path=/; HttpOnly; SameSite=Strict; Secure; Expires=${ACCESS_TOKEN_EXPIRE_AT}`;
      const REFRESH_TOKEN = `REFRESH_TOKEN=${refreshToken}; Path=/; HttpOnly; SameSite=Strict; Secure; Expires=${REFRESH_TOKEN_EXPIRE_AT}`;

      context.res.setHeader("Set-Cookie", [ACCESS_TOKEN, REFRESH_TOKEN]);
    }

    return {
      props: { id, isComplete },
    };
  } catch (error) {
    return {
      redirect: {
        destination: PAGE_PATH.SIGN_IN,
        permanent: false,
      },
    };
  }
}

export default function Kakao({ id, isComplete }: KakaoProps) {
  const router = useRouter();

  useEffect(() => {
    if (!isComplete) {
      router.push({ pathname: PAGE_PATH.PROFILE_SETUP, query: { id } }, PAGE_PATH.PROFILE_SETUP);
      return;
    }

    router.push(PAGE_PATH.DASHBOARD);
  }, [isComplete]);

  return (
    <div className={cn("container")}>
      <Lottie animationData={loadingLottie} loop play className={cn("loading-lottie")} />
    </div>
  );
}
