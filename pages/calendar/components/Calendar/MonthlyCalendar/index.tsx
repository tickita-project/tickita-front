import { useState } from "react";

import classNames from "classnames/bind";
import { Dayjs } from "dayjs";

import { DAYS } from "@/constants/calendarConstants";
import { calculateMonthDates, divideWeek } from "@/utils/calculateCalendarDates";

import styles from "./MonthlyCalendar.module.scss";

const cn = classNames.bind(styles);

interface MonthlyCalendarProps {
  viewDate: Dayjs;
}

export default function MonthlyCalendar({ viewDate }: MonthlyCalendarProps) {
  const buildCalendarTag = (calendarDays: Dayjs[]) => {
    return calendarDays.map((day, i: number) => {
      return (
        <td key={i} className={cn()}>
          {day.date()}
        </td>
      );
    });
  };

  const calendarRows = divideWeek(buildCalendarTag(calculateMonthDates(viewDate)));

  return <div className={cn("container")}>월간캘린더</div>;
}
