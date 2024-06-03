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
    return calendarDays.map((day: Dayjs, i: number) => {
      return (
        <td key={i} className={cn()}>
          {day.date()}
        </td>
      );
    });
  };

  const calendarRows = divideWeek(buildCalendarTag(calculateMonthDates(viewDate)));

  return (
    <div className={cn("container")}>
      <div className={cn("header")}>
        <div className={cn("year-month")}>
          <span>{viewDate.year()}</span>

          <span>{viewDate.month() + 1}</span>
        </div>
      </div>
      <table className={cn("calendar-table")}>
        <thead className={cn("table-header")}>
          <tr>
            {DAYS.map((day, i) => (
              <th key={i} className={cn("day")}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarRows.map((row, i) => (
            <tr key={i}>{row}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
