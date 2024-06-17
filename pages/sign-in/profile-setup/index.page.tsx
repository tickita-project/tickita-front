import { GetServerSidePropsContext } from "next";

import Image from "next/image";

import classNames from "classnames/bind";

import ProfileSetupForm from "./components/ProfileSetupForm/ProfileSetupForm";
import { instance } from "@/apis/axios";
import MetaData from "@/components/MetaData";

import styles from "./ProfileSetup.module.scss";

const cn = classNames.bind(styles);

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
      <MetaData title="추가 정보 입력 | 티키타" />
      <header className={cn("header")}>
        <Image src="/icons/tickita-logo.svg" alt="티키타 로고" width={60} height={22} />
      </header>
      <main className={cn("main")}>
        <div className={cn("container")}>
          <p className={cn("description")}>
            티키타에 합류하신 걸 환영해요
            <br />
            원활한 사용을 위해 추가 정보를 입력해주세요
          </p>
          <ProfileSetupForm accountId={accountId} email={email} />
        </div>
      </main>
    </>
  );
}
