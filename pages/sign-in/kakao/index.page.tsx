import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useEffect } from "react";

import { useRouter } from "next/router";

import { instance } from "@/apis/axios";

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
      router.push("/profile-setup"); // TODO: 우혁님 PR merge 된 후에, 상수로 수정 예정
    }

    if (!isFirst) {
      router.push("/");
    }
  }, [isFirst]);

  return <div>로그인 요청중입니다.</div>;
}
