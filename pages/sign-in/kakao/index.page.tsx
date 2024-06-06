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

  const res = await instance.get(`/login/oauth/kakao?code=${code}`);
  const { id, isComplete } = res.data;

  return {
    props: { id, isComplete },
  };
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
