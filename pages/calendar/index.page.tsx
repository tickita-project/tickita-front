import { useState } from "react";

import { GetServerSidePropsContext } from "next/types";

import { QueryClient, dehydrate } from "@tanstack/react-query";
import classNames from "classnames/bind";

import CalendarHeader from "./components/Calendar/CalendarHeader";
import DailyCalendar from "./components/Calendar/DailyCalendar";
import MonthlyCalendar from "./components/Calendar/MonthlyCalendar";
import WeeklyCalendar from "./components/Calendar/WeeklyCalendar";
import CalendarSideBar from "./components/CalendarSideBar";
import { getUserInfo } from "@/apis/apis";
import { setContext } from "@/apis/axios";
import Header from "@/components/Header";
import MetaData from "@/components/MetaData";
import { userInfoKey } from "@/constants/queryKey";

import styles from "./Calendar.module.scss";

export type CalendarType = "월" | "주" | "일";
const cn = classNames.bind(styles);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  setContext(context);
  const queryClient = new QueryClient();

  try {
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

export default function CalendarPage() {
  const [calendarType, setCalendarType] = useState<CalendarType>("월");

  return (
    <>
      <MetaData title="내 캘린더 | 티키타" />
      <Header />
      <div className={cn("container")}>
        <CalendarSideBar />

        <main>
          <CalendarHeader setCalendarType={setCalendarType} />
          {calendarType === "월" && <MonthlyCalendar />}
          {calendarType === "주" && <WeeklyCalendar />}
          {calendarType === "일" && <DailyCalendar />}
        </main>
      </div>
    </>
  );
}
