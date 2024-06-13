import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import classNames from "classnames/bind";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import CalendarHeader from "./components/Calendar/CalendarHeader";
import DailyCalendar from "./components/Calendar/DailyCalendar";
import MonthlyCalendar from "./components/Calendar/MonthlyCalendar";
import WeeklyCalendar from "./components/Calendar/WeeklyCalendar";
import CalendarSideBar from "./components/CalendarSideBar";
import Header from "@/components/Header";
import MetaData from "@/components/MetaData";
import { useDateStore } from "@/store/useDateStore";
import { calculateMonthDates } from "@/utils/calculateCalendarDates";

import styles from "./Calendar.module.scss";

export type CalendarType = "월" | "주" | "일";
const cn = classNames.bind(styles);
dayjs.extend(utc);

export default function CalendarPage() {
  const [calendarType, setCalendarType] = useState<CalendarType>("월");
  const router = useRouter();
  const { focusDate } = useDateStore();

  useEffect(() => {
    let startDate = null;
    let endDate = null;
    let query = null;
    if (calendarType === "월") {
      const days = calculateMonthDates(focusDate);
      startDate = days[0].startOf("day").utc().add(9, "hour");
      endDate = days[41].endOf("day").utc().add(9, "hour");

      query = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };

      router.replace({ query });
    } else if (calendarType === "주") {
      startDate = focusDate.startOf("week").utc().add(9, "hour");
      endDate = focusDate.endOf("week").utc().add(9, "hour");

      query = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };

      router.replace({ query });
    } else if (calendarType === "일") {
      startDate = focusDate.startOf("day").utc().add(9, "hour");
      endDate = focusDate.endOf("day").utc().add(9, "hour");
      query = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };

      router.replace({ query });
    }
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
