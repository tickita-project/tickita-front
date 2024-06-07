import { useState, ReactElement } from "react";

import Link from "next/link";

import classNames from "classnames/bind";

import NotificationCenter from "./components/NotificationCenter";
import UpcomingScheduleList from "./components/UpcomingScheduleList";
import DatePicker from "@/components/DatePicker/DatePicker";
import Layout from "@/components/Layout";
import MetaData from "@/components/MetaData";
import { PAGE_PATH } from "@/constants/pagePath";

import styles from "./Dashboard.module.scss";

const cn = classNames.bind(styles);

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
