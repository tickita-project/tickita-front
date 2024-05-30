import { useState } from "react";
import styles from "./datePicker.module.scss";
import classNames from "classnames";

interface DatePickerProps {
  selectedDay: Date;
  setSelectedDay: (date: Date) => void;
  hasArrowButton: boolean;
}

const cn = classNames.bind(styles);

export default function DatePicker({
  selectedDay,
  setSelectedDay,
  hasArrowButton = true,
}: DatePickerProps) {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const [currentMonth, setCurrentMonth] = useState<Date>(selectedDay);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isSameDay = (toDay: Date, compareDay?: Date | null) => {
    if (
      toDay.getFullYear() === compareDay?.getFullYear() &&
      toDay.getMonth() === compareDay?.getMonth() &&
      toDay.getDate() === compareDay?.getDate()
    ) {
      return true;
    }
    return false;
  };

  const onClickDay = (day: Date) => {
    setSelectedDay(day);
  };

  const prevCalendar = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, currentMonth.getDate()),
    );
  };

  const nextCalendar = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, currentMonth.getDate()),
    );
  };

  const buildCalendarDays = () => {
    const curMonthStartDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1,
    ).getDay();
    const curMonthEndDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const prevMonthEndDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);
    const nextMonthStartDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    const days: Date[] = Array.from({ length: curMonthStartDate }, (_, i) => {
      return new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        prevMonthEndDate.getDate() - i,
      );
    }).reverse();

    days.push(
      ...Array.from(
        { length: curMonthEndDate.getDate() },
        (_, i) => new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1),
      ),
    );

    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      days.push(
        ...Array.from(
          { length: remainingDays },
          (_, i) =>
            new Date(nextMonthStartDate.getFullYear(), nextMonthStartDate.getMonth(), i + 1),
        ),
      );
    }
    return days;
  };

  const buildCalendarTag = (calendarDays: Date[]) => {
    return calendarDays.map((day: Date, i: number) => {
      const isToday = day === currentMonth;
      return (
        <td
          key={i}
          className={`futureDay ${isSameDay(day, selectedDay) && "choiceDay"}`}
          onClick={() => onClickDay(day)}
        >
          {day.getDate()}
        </td>
      );
    });
  };

  const divideWeek = (calendarTags: JSX.Element[]) => {
    return calendarTags.reduce((acc: JSX.Element[][], day: JSX.Element, i: number) => {
      if (i % 7 === 0) acc.push([day]);
      else acc[acc.length - 1].push(day);
      return acc;
    }, []);
  };

  const calendarDays = buildCalendarDays();
  const calendarTags = buildCalendarTag(calendarDays);
  const calendarRows = divideWeek(calendarTags);

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <span className={styles.calendarMonth}>
          {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
        </span>
        {hasArrowButton && (
          <div className={styles.calendarNavigation}>
            <button onClick={prevCalendar} className={styles.calendarButton}>
              &lt;
            </button>
            <button onClick={nextCalendar} className={styles.calendarButton}>
              &gt;
            </button>
          </div>
        )}
      </div>
      <table className={styles.calendarTable}>
        <thead>
          <tr>
            {daysOfWeek.map((day, i) => (
              <th
                key={i}
                className={`${styles.calendarDay} ${day === "토" ? styles.saturday : day === "일" ? styles.sunday : ""}`}
              >
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
