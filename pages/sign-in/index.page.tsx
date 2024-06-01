import Image from "next/image";
import { useRouter } from "next/router";

import styles from "./index.module.scss";

export default function SignIn() {
  const router = useRouter();

  const handleKakaoButtonClick = () => {
    const KAKAO_REDIRECT_URI = "http://localhost:3000/sign-in/kakao";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    router.push(KAKAO_AUTH_URL);
  };

  return (
    <>
      <header className={styles.header}>
        <Image src="/icons/tickita-logo.svg" alt="logo" width={60} height={22} />
      </header>
      <main>
        <div className={styles.container}>
          <div className={styles["tickita-logo"]}>
            <p>
              복잡한 일정조율, 고민 없이
              <br /> 바로 약속 잡고 싶을 땐
            </p>
            <Image
              src="/icons/tickita-fullname-logo.svg"
              alt="fullname logo"
              width={132}
              height={44}
            />
          </div>
          <div className={styles["login-button"]}>
            <button
              type="button"
              onClick={handleKakaoButtonClick}
              className={styles["kakao-login-button"]}
            >
              <Image src="/icons/kakao-icon.svg" alt="kakao icon" width={20} height={20} />
              카카오로 로그인
            </button>
            <button type="button" className={styles["google-login-button"]}>
              <Image src="/icons/google-icon.svg" alt="kakao icon" width={20} height={20} />
              구글로 로그인
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
