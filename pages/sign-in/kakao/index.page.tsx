import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useEffect } from "react";

import { useRouter } from "next/router";

import { instance } from "@/apis/axios";
import { PAGE_PATH } from "@/constants/pagePath";

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

      const ACCESS_TOKEN = `ACCESS_TOKEN=${accessToken}; Path=/; HttpOnly; SameSite=Strict; Expires=${ACCESS_TOKEN_EXPIRE_AT}`; // Secure;
      const REFRESH_TOKEN = `REFRESH_TOKEN=${refreshToken}; Path=/; HttpOnly; SameSite=Strict; Expires=${REFRESH_TOKEN_EXPIRE_AT}`;

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

  return <div>로그인 요청중입니다.</div>;
}
