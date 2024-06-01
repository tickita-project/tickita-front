import { useState } from "react";

import Image from "next/image";

import classNames from "classnames/bind";
import dayjs from "dayjs";

import { DAYS } from "@/constants/calendarConstants";

import styles from "./datePicker.module.scss";

const cn = classNames.bind(styles);

interface DatePickerProps {
  selectedDay: Date;
  setSelectedDay: (date: Date) => void;
  hasButtons: boolean;
}

export default function DatePicker({ selectedDay, setSelectedDay, hasButtons }: DatePickerProps) {
  const [viewDate, setViewDate] = useState(selectedDay);

  const handleDateClick = (day: Date) => {
    setSelectedDay(day);
    setViewDate(day);
  };

  const handlePrevButtonClick = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextButtonClick = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const buildCalendarDays = () => {
    const startOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    const endOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);

    const startDay = startOfMonth.getDay();
    const endDay = endOfMonth.getDate();

    const prevMonthEndDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), 0);
    const days: Date[] = [];

    for (let i = startDay - 1; i >= 0; i--) {
      days.push(
        new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, prevMonthEndDate.getDate() - i),
      );
    }

    for (let i = 1; i <= endDay; i++) {
      days.push(new Date(viewDate.getFullYear(), viewDate.getMonth(), i));
    }

    const nextMonthStartDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
    while (days.length < 42) {
      days.push(new Date(nextMonthStartDate));
      nextMonthStartDate.setDate(nextMonthStartDate.getDate() + 1);
    }

    return days;
  };

  const buildCalendarTag = (calendarDays: Date[]) => {
    return calendarDays.map((day: Date, i: number) => {
      const isThisMonthDay = day.getMonth() !== viewDate.getMonth();
      const isToday =
        day.getFullYear() === selectedDay.getFullYear() &&
        day.getMonth() === selectedDay.getMonth() &&
        day.getDate() === selectedDay.getDate();

      return (
        <td
          key={i}
          className={cn("date", { today: isToday }, { "other-month": isThisMonthDay })}
          onClick={() => handleDateClick(day)}
        >
          {day.getDate()}
        </td>
      );
    });
  };

  const divideWeek = (calendarTags: JSX.Element[]) => {
    return calendarTags.reduce((acc: JSX.Element[][], day: JSX.Element, i: number) => {
      if (i % 7 === 0) {
        acc.push([day]);
      } else {
        acc[acc.length - 1].push(day);
      }
      return acc;
    }, []);
  };

  const calendarDays = buildCalendarDays();
  const calendarTags = buildCalendarTag(calendarDays);
  const calendarRows = divideWeek(calendarTags);

  return (
    <div className={cn("container")}>
      <div className={cn("header", { "no-buttons": !hasButtons })}>
        {hasButtons && (
          <button
            className={cn("today-button")}
            type="button"
            onClick={() => setViewDate(new Date())}
          >
            오늘
          </button>
        )}
        <div className={cn("year-month")}>
          <span>{viewDate.getFullYear()}</span>
          <Image src="/Icons/vertical-divider-logo.svg" alt="divider" width={1} height={10} />
          <span>{viewDate.getMonth() + 1}</span>
        </div>
        {hasButtons && (
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
