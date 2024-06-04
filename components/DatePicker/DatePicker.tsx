import { useState } from "react";

import Image from "next/image";

import classNames from "classnames/bind";
import dayjs, { Dayjs } from "dayjs";

import { DAYS } from "@/constants/calendarConstants";
import { calculateMonthDates, divideWeek } from "@/utils/calculateCalendarDates";

import styles from "./datePicker.module.scss";

const cn = classNames.bind(styles);

export interface DatePickerProps {
  selectedDay: Dayjs;
  setSelectedDay: (date: Dayjs) => void;
  hasNavigation: boolean;
}

export default function DatePicker({
  selectedDay,
  setSelectedDay,
  hasNavigation,
}: DatePickerProps) {
  const [viewDate, setViewDate] = useState(selectedDay);

  const handleDateClick = (day: Dayjs) => {
    setSelectedDay(day);
    setViewDate(day);
  };

  const handlePrevButtonClick = () => {
    setViewDate(viewDate.subtract(1, "month"));
  };

  const handleNextButtonClick = () => {
    setViewDate(viewDate.add(1, "month"));
  };

  const buildCalendarTag = (calendarDays: Dayjs[]) => {
    return calendarDays.map((day: Dayjs, i: number) => {
      const isThisMonthDay = !day.isSame(viewDate, "month");
      const isToday = day.isSame(selectedDay, "date");

      return (
        <td
          key={i}
          className={cn(
            { date: !hasNavigation, "date-hover": hasNavigation },
            { today: isToday },
            { "other-month": isThisMonthDay },
          )}
          onClick={() => handleDateClick(day)}
        >
          {day.date()}
        </td>
      );
    });
  };

  const calendarRows = divideWeek(buildCalendarTag(calculateMonthDates(viewDate)));

  return (
    <div className={cn("container")}>
      <div className={cn("header", { "no-buttons": !hasNavigation })}>
        {hasNavigation && (
          <button
            className={cn("today-button")}
            type="button"
            onClick={() => handleDateClick(dayjs())}
          >
            오늘
          </button>
        )}
        <div className={cn("year-month")}>
          <span>{viewDate.year()}</span>
          <Image src="/icons/vertical-divider-logo.svg" alt="" width={1} height={10} />
          <span>{viewDate.month() + 1}</span>
        </div>
        {hasNavigation && (
          <div className={cn("navigation-button")}>
            <button onClick={handlePrevButtonClick} className={cn("arrow-button")} type="button">
              <Image src="/icons/arrow-left-icon.svg" alt="이전달" width={20} height={20} />
            </button>
            <button onClick={handleNextButtonClick} className={cn("arrow-button")} type="button">
              <Image src="/icons/arrow-right-icon.svg" alt="다음달" width={20} height={20} />
            </button>
          </div>
        )}
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
