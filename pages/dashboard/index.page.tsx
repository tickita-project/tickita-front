import { ReactElement } from "react";

import Link from "next/link";
import { GetServerSidePropsContext } from "next/types";

import { QueryClient, dehydrate } from "@tanstack/react-query";
import classNames from "classnames/bind";

import NotificationCenter from "./components/NotificationCenter";
import UpcomingScheduleList from "./components/UpcomingScheduleList";
import { getGroupList, getUserInfo } from "@/apis/apis";
import { setContext } from "@/apis/axios";
import DatePicker from "@/components/DatePicker/DatePicker";
import Layout from "@/components/Layout";
import MetaData from "@/components/MetaData";
import { PAGE_PATH } from "@/constants/pagePath";
import { groupKey, userInfoKey } from "@/constants/queryKey";

import styles from "./Dashboard.module.scss";

const cn = classNames.bind(styles);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  setContext(context);
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({ queryKey: groupKey.lists(), queryFn: getGroupList });
    await queryClient.prefetchQuery({ queryKey: userInfoKey.info(), queryFn: getUserInfo });

    return {
      props: { dehydrateState: dehydrate(queryClient) },
    };
  } catch (error) {
    return {
      props: { dehydrateState: null },
    };
  }
};

export default function Dashboard() {
  return (
    <>
      <MetaData title="대시보드 | 티키타" />
      <section className={cn("content")}>
        <Link href={PAGE_PATH.CALENDAR} className={cn("calendar")}>
          <DatePicker hasNavigation={false} />
        </Link>
        <div className={cn("box")}>
          <UpcomingScheduleList />
          <NotificationCenter />
        </div>
      </section>
    </>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
