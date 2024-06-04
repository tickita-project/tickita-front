import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useEffect } from "react";

import { useRouter } from "next/router";

import { instance } from "@/apis/axios";
import { PAGE_PATH } from "@/constants/pagePath";

interface KakaoProps {
  addInfoCompleted: boolean;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<KakaoProps>> {
  const code = context.query["code"];

  const res = await instance.get(`/login/oauth/kakao?code=${code}`);
  const { addInfoCompleted } = res.data;

  return {
    props: { addInfoCompleted: Boolean(addInfoCompleted) },
  };
}

export default function Kakao({ addInfoCompleted }: KakaoProps) {
  const router = useRouter();

  useEffect(() => {
    if (addInfoCompleted === false) {
      router.push(PAGE_PATH.PROFILE_SETUP);
      return; // TODO: 우혁님 PR merge 된 후에, 상수로 수정 예정
    }

    router.push(PAGE_PATH.MAIN);
  }, [addInfoCompleted]);

  return <div>로그인 요청중입니다.</div>;
}
