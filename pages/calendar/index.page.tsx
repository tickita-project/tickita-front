import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next/types";

import { QueryClient, dehydrate } from "@tanstack/react-query";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

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
import { useDateStore } from "@/store/useDateStore";
import { calculateMonthDates } from "@/utils/calculateCalendarDates";

import { CalendarType } from "@/types/type";

import styles from "./Calendar.module.scss";

const cn = classNames.bind(styles);

dayjs.extend(utc);

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
  const router = useRouter();
  const { focusDate } = useDateStore();

  useEffect(() => {
    let startDate = null;
    let endDate = null;
    let query = null;
    switch (calendarType) {
      case "월":
        const days = calculateMonthDates(focusDate);
        startDate = days[0].startOf("day").utc().add(9, "hour");
        endDate = days[41].endOf("day").utc().add(9, "hour");
        break;
      case "주":
        startDate = focusDate.startOf("week").utc().add(9, "hour");
        endDate = focusDate.endOf("week").utc().add(9, "hour");
        break;
      case "일":
        startDate = focusDate.startOf("day").utc().add(9, "hour");
        endDate = focusDate.endOf("day").utc().add(9, "hour");
        break;
    }

    query = {
      startDate: startDate?.format("YYYY-MM-DDTHH:mm:ss.SSS"),
      endDate: endDate?.format("YYYY-MM-DDTHH:mm:ss.SSS"),
    };

    router.replace({ query });
  }, [calendarType, focusDate]);

  return (
    <>
      <MetaData title="내 캘린더 | 티키타" />
      <Header />
      <div className={cn("container")}>
        <CalendarSideBar />

        <main>
          <CalendarHeader calendarType={calendarType} setCalendarType={setCalendarType} />
          {calendarType === "월" && <MonthlyCalendar />}
          {calendarType === "주" && <WeeklyCalendar />}
          {calendarType === "일" && <DailyCalendar />}
        </main>
      </div>
    </>
  );
}
