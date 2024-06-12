import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useEffect } from "react";

import { useRouter } from "next/router";

import { instance } from "@/apis/axios";
import { PAGE_PATH } from "@/constants/pagePath";

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
    const { id, isComplete, accessToken, refreshToken } = res.data;

    if (accessToken && refreshToken) {
      const ACCESS_TOKEN = `ACCESS_TOKEN=${accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict`;
      const REFRESH_TOKEN = `REFRESH_TOKEN=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=Strict`;

      context.res.setHeader("Set-Cookie", [ACCESS_TOKEN, REFRESH_TOKEN]);
    }

    return {
      props: { id, isComplete },
    };
  } catch (error) {
    return {
      notFound: true, // 404 페이지로 이동
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
