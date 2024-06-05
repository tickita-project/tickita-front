import { GetServerSidePropsContext } from "next";

import Image from "next/image";

import ProfileSetupForm from "./components/ProfileSetupForm/ProfileSetupForm";
import { instance } from "@/apis/axios";

import styles from "./index.module.scss";

interface ProfileSetupProps {
  accountId: number;
  email: string;
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const accountId = context.query.id;

  const res = await instance.get(`/account-info/${accountId}`);
  const { email } = res.data;

  return {
    props: { accountId, email },
  };
};

export default function ProfileSetup({ accountId, email }: ProfileSetupProps) {
  return (
    <>
      <header className={styles.header}>
        <Image src="/icons/tickita-logo.svg" alt="logo" width={60} height={22} />
      </header>
      <main>
        <div className={styles.container}>
          <div className={styles["profile-container"]}>
            <p className={styles.description}>
              티키타에 합류하신 걸 환영해요
              <br />
              원활한 사용을 위해 추가 정보를 입력해주세요
            </p>
            <Image
              src="/icons/profile-add-icon.svg"
              alt="default profile image"
              width={120}
              height={120}
            />
          </div>
          <ProfileSetupForm accountId={accountId} email={email} />
        </div>
      </main>
    </>
  );
}
