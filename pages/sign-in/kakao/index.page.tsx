import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useEffect } from "react";

import { useRouter } from "next/router";

import { instance } from "@/apis/axios";
import { PAGE_PATH } from "@/constants/pagePath";

interface KakaoProps {
  isFirst: boolean;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<KakaoProps>> {
  const code = context.query["code"];

  const res = await instance.get(`/login/oauth/kakao?code=${code}`);
  const { isFirst } = res.data;

  return {
    props: { isFirst: Boolean(isFirst) },
  };
}

export default function Kakao({ isFirst }: KakaoProps) {
  const router = useRouter();

  useEffect(() => {
    if (isFirst) {
      router.push(PAGE_PATH.PROFILE_SETUP);
      return; // TODO: 우혁님 PR merge 된 후에, 상수로 수정 예정
    }

    router.push(PAGE_PATH.MAIN);
  }, [isFirst]);

  return <div>로그인 요청중입니다.</div>;
}
