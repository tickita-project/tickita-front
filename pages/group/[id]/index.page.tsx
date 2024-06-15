import { ReactElement } from "react";

import Link from "next/link";
import { GetServerSidePropsContext } from "next/types";

import { QueryClient, dehydrate } from "@tanstack/react-query";
import classNames from "classnames/bind";

import InviteForm from "./components/InviteForm";
import MemberList from "./components/MemberList";
import { setContext } from "@/apis/axios";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import MetaData from "@/components/MetaData";
import TitleBox from "@/components/TitleBox";
import { PAGE_PATH } from "@/constants/pagePath";
import { groupKey } from "@/constants/queryKey";

import styles from "./Group.module.scss";

const cn = classNames.bind(styles);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  setContext(context);
  const queryClient = new QueryClient();

  try {
    // await queryClient.prefetchQuery({ queryKey: groupKey.lists(), queryFn: getGroupList });
    // await queryClient.prefetchQuery({ queryKey: userInfoKey.info(), queryFn: getUserInfo });

    return {
      props: { dehydrateState: dehydrate(queryClient) },
    };
  } catch (error) {
    return {
      props: { dehydrateState: null },
    };
  }
};

export default function Group() {
  return (
    <>
      <MetaData title="대시보드 | 티키타" />
      <section className={cn("content")}>
        <MemberList />
        <InviteForm />
      </section>
    </>
  );
}

Group.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
