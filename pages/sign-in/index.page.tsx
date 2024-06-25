import { GetServerSidePropsContext } from "next";

import Image from "next/image";
import Link from "next/link";

import classNames from "classnames/bind";

import MetaData from "@/components/MetaData";
import { PAGE_PATH } from "@/constants/pagePath";

import styles from "./SignIn.module.scss";

const cn = classNames.bind(styles);

interface SignInProps {
  origin: string;
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { headers } = context.req;

  const protocol = headers["x-forwarded-proto"];
  const host = headers.host;
  const origin = `${protocol}://${host}`;

  return {
    props: { origin },
  };
};

export default function SignIn({ origin }: SignInProps) {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&redirect_uri=${origin}/sign-in/kakao&response_type=code`;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&redirect_uri=${origin}/sign-in/google&response_type=code&scope=email`;

  return (
    <>
      <MetaData title="로그인 | 티키타" />
      <header className={cn("header")}>
        <Link href={PAGE_PATH.MAIN}>
          <Image src="/icons/tickita-logo.svg" alt="로고 이미지" width={60} height={22} />
        </Link>
      </header>
      <main className={cn("container")}>
        <div className={cn("tickita-logo")}>
          <p>
            복잡한 일정조율, 고민 없이
            <br /> 바로 약속 잡고 싶을 땐
          </p>
          <Image
            src="/icons/tickita-fullname-logo.svg"
            alt="풀네임 로고 이미지"
            width={132}
            height={44}
          />
        </div>
        <div className={cn("login-button-container")}>
          <Link href={KAKAO_AUTH_URL} className={cn("login-button", "kakao-login-button")}>
            <Image src="/icons/kakao-icon.svg" alt="카카오톡 아이콘" width={20} height={20} />
            카카오로 로그인
          </Link>
          <Link href={GOOGLE_AUTH_URL} className={cn("login-button", "google-login-button")}>
            <Image src="/icons/google-icon.svg" alt="구글 아이콘" width={20} height={20} />
            구글로 로그인
          </Link>
        </div>
      </main>
    </>
  );
}
