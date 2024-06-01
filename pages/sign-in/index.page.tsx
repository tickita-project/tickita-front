import Image from "next/image";
import Link from "next/link";

import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

const KAKAO_REDIRECT_URI = "http://localhost:3000/sign-in/kakao";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

export default function SignIn() {
  return (
    <>
      <header className={cn("header")}>
        <Image src="/icons/tickita-logo.svg" alt="로고 이미지" width={60} height={22} />
      </header>
      <main>
        <div className={cn("container")}>
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
            <Link href="/" className={cn("login-button", "google-login-button")}>
              <Image src="/icons/google-icon.svg" alt="구글 아이콘" width={20} height={20} />
              구글로 로그인
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
