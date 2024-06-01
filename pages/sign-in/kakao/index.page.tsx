import { GetServerSidePropsContext } from "next";

import { instance } from "@/apis/axios";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const code = context.query["code"];

  const res = await instance.get(`/login/oauth/kakao?code=${code}`);
  const loginData = res.data;

  return {
    props: {},
  };
}

export default function Kakao() {
  return <div>로그인 요청중입니다.</div>;
}
