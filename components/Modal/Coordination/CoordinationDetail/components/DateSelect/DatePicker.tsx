import { useEffect, useState } from "react";

import Image from "next/image";

import classNames from "classnames/bind";
import dayjs, { Dayjs } from "dayjs";

import { DAYS } from "@/constants/calendarConstants";
import useDebounce from "@/hooks/useDebounce";
import useScroll from "@/hooks/useScroll";
import { useDateStore } from "@/store/useDateStore";
import { calculateMonthDates, divideWeek } from "@/utils/calculateCalendarDates";

import styles from "./datePicker.module.scss";
import MonthNavButton from "./MonthNavButton";

const cn = classNames.bind(styles);

export interface DatePickerProps {
  hasNavigation?: boolean;
  onSelect: (dates: string[]) => void;
}

export default function DatePicker({ hasNavigation = true, onSelect }: DatePickerProps) {
  const { focusDate, viewDate, setFocusDate, setViewDate } = useDateStore();
  const [selectedDates, setSelectedDates] = useState<Dayjs[]>([]);

  const today = dayjs();
  const thirtyDaysLater = today.add(30, "day");

  useEffect(() => {
    setFocusDate(dayjs());
    setViewDate(dayjs());
  }, [setFocusDate, setViewDate]);

  const handleDateClick = (day: Dayjs) => {
    if (!hasNavigation || day.isBefore(today, "date") || day.isAfter(thirtyDaysLater, "date")) {
      return;
    }

    if (selectedDates.some((date) => date.isSame(day, "date"))) {
      setSelectedDates(selectedDates.filter((date) => !date.isSame(day, "date")));
    } else if (selectedDates.length < 3) {
      setSelectedDates([...selectedDates, day]);
    }
  };

  useEffect(() => {
    const formattedDates = selectedDates.map((date) => date.format("YYYY-MM-DD"));
    onSelect(formattedDates);
  }, [selectedDates]);

  const handleCancelDate = (day: Dayjs) => {
    setSelectedDates(selectedDates.filter((date) => !date.isSame(day, "date")));
  };

  const buildCalendarTag = (calendarDays: Dayjs[]) => {
    return calendarDays.map((day: Dayjs, i: number) => {
      const isThisMonthDay = !day.isSame(viewDate, "month");
      const isFocusDay = day.isSame(focusDate, "date");
      const isSelectedDay = selectedDates.some((date) => date.isSame(day, "date"));
      const isDisabled = day.isBefore(today, "date") || day.isAfter(thirtyDaysLater, "date");

      return (
        <td
          key={i}
          className={cn(
            { date: !hasNavigation, "date-hover": hasNavigation },
            { focus: isFocusDay && hasNavigation },
            { "other-month": isThisMonthDay },
            { selected: isSelectedDay },
            { disabled: isDisabled },
          )}
          onClick={() => handleDateClick(day)}
        >
          {day.date()}
        </td>
      );
    });
  };

  const handleScrollUpDebounced = useDebounce(
    () => {
      setViewDate(viewDate.subtract(1, "month"));
    },
    300,
    true,
  );

  const handleScrollDownDebounced = useDebounce(
    () => {
      setViewDate(viewDate.add(1, "month"));
    },
    300,
    true,
  );

  const scrollRef = useScroll<HTMLTableElement>(handleScrollDownDebounced, handleScrollUpDebounced);
  const calendarRows = divideWeek(buildCalendarTag(calculateMonthDates(viewDate)));

  return (
    <div className={cn("extra-container")}>
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
            <Image src="/icons/vertical-divider-icon.svg" alt="" width={2} height={10} />
            <span>{viewDate.month() + 1}</span>
          </div>
          {hasNavigation && <MonthNavButton calendarType={null} />}
        </div>
        <table className={cn("calendar-table")} ref={scrollRef}>
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
      <div className={cn("selected-dates")}>
        {selectedDates
          .sort((a, b) => a.diff(b))
          .map((date, index) => (
            <span
              key={index}
              className={cn("selected-date")}
              onClick={() => handleCancelDate(date)}
            >
              {date.format("YYYY-MM-DD")}
              <Image
                src="/icons/date-cancel-icon.svg"
                width={20}
                height={20}
                alt="취소 표시 버튼"
              />
            </span>
          ))}
      </div>
    </div>
  );
}
