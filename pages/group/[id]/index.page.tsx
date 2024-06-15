import { ReactElement } from "react";

import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next/types";

import { QueryClient, dehydrate } from "@tanstack/react-query";
import classNames from "classnames/bind";

import GroupForm from "./components/GroupForm";
import InviteForm from "./components/InviteForm";
import MemberList from "./components/MemberList";
import { getGroupInfo, getUserInfo } from "@/apis/apis";
import { setContext } from "@/apis/axios";
import Layout from "@/components/Layout";
import MetaData from "@/components/MetaData";
import { groupKey, userInfoKey } from "@/constants/queryKey";
import { useGetGroupInfo } from "@/hooks/useGetGroupInfo";

import styles from "./Group.module.scss";

const cn = classNames.bind(styles);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  setContext(context);
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({ queryKey: userInfoKey.info(), queryFn: getUserInfo });
    await queryClient.prefetchQuery({
      queryKey: groupKey.detail(Number(context.query.id)),
      queryFn: () => getGroupInfo(Number(context.query.id)),
    });

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
  const { query } = useRouter();
  const { data: groupInfo } = useGetGroupInfo(Number(query.id));

  if (!groupInfo) {
    return null;
  }

  return (
    <>
      <MetaData title="그룹 상세 페이지 | 티키타" />
      <section className={cn("content")}>
        <MemberList />
        <InviteForm />
        <GroupForm groupInfo={groupInfo} />
      </section>
    </>
  );
}

Group.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
