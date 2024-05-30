import Image from "next/image";

import styles from "./index.module.scss";

export default function SignUp() {
  return (
    <>
      <header className={styles.header}>
        <Image src="/Icons/tickita-logo.svg" alt="logo" width={60} height={22} />
      </header>
      <main>
        <div>
          <p className={styles.description}>
            티키타에 합류하신 걸 환영해요
            <br />
            원활한 사용을 위해 추가 정보를 입력해주세요
          </p>
          <Image
            src="/Icons/default-profile.svg"
            alt="default profile image"
            width={120}
            height={120}
          />
        </div>
      </main>
    </>
  );
}
