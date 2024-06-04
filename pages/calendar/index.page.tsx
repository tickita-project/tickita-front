import { useState } from "react";

import dayjs, { Dayjs } from "dayjs";

import DailyCalendar from "./components/Calendar/DailyCalendar";
import MonthlyCalendar from "./components/Calendar/MonthlyCalendar";
import WeeklyCalendar from "./components/Calendar/WeeklyCalendar";
import CalendarSideBar from "./components/CalendarSideBar";
import CalendarTypeRadioButton from "./components/CalendarTypeRadioButton";
import { DatePickerProps } from "@/components/DatePicker/DatePicker";
import Header from "@/components/Header";

export type CalendarType = "월" | "주" | "일";

export default function CalendarPage() {
  const [focusDate, setFocusDate] = useState<Dayjs>(dayjs());
  const [calendarType, setCalendarType] = useState<CalendarType>("월");

  return (
    <>
      <Header />
      <CalendarSideBar selectedDay={focusDate} setSelectedDay={setFocusDate} hasNavigation={true} />

      <main>
        <CalendarTypeRadioButton setType={setCalendarType} />
        {calendarType === "월" && <MonthlyCalendar viewDate={focusDate} />}
        {calendarType === "주" && <WeeklyCalendar viewDate={focusDate} />}
        {calendarType === "일" && <DailyCalendar viewDate={focusDate} />}
      </main>
    </>
  );
}
