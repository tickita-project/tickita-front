import classNames from "classnames/bind";
import { Dayjs } from "dayjs";

import { DAYS } from "@/constants/calendarConstants";
import { useDateStore } from "@/store/useDateStore";
import { calculateMonthDates, divideWeek } from "@/utils/calculateCalendarDates";

import styles from "./MonthlyCalendar.module.scss";

const cn = classNames.bind(styles);

export default function MonthlyCalendar() {
  const { viewDate } = useDateStore();
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

  return (
    <div className={cn("container")}>
      <div className={cn("month-header")}>
        {DAYS.map((day, i) => (
          <div key={i} className={cn("day", { sunday: day === "일" }, { saturday: day === "토" })}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
