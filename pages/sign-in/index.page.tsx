import Image from "next/image";
import styles from "./index.module.scss";

export default function SignIn() {
  return (
    <>
      <header className={styles.header}>
        <Image src="/Icons/tickita-logo.svg" alt="logo" width={60} height={22} />
      </header>
      <main>
        <div className={styles.container}>
          <div className={styles["tickita-logo"]}>
            <p>
              복잡한 일정조율, 고민 없이
              <br /> 바로 약속 잡고 싶을 땐
            </p>
            <Image
              src="/Icons/tickita-fullname-logo.svg"
              alt="fullname logo"
              width={132}
              height={44}
            />
          </div>
          <div className={styles["login-button"]}>
            <button type="button" className={styles["kakao-login-button"]}>
              <Image src="/Icons/kakao-icon.svg" alt="kakao icon" width={20} height={20} />
              카카오로 로그인
            </button>
            <button type="button" className={styles["google-login-button"]}>
              <Image src="/Icons/google-icon.svg" alt="kakao icon" width={20} height={20} />
              구글로 로그인
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
