import classNames from "classnames/bind";
import dayjs from "dayjs";

import { DAYS } from "@/constants/calendarConstants";
import { useDateStore } from "@/store/useDateStore";
import { calculateWeekDates } from "@/utils/calculateCalendarDates";

import styles from "./WeeklyCalendar.module.scss";

const cn = classNames.bind(styles);

export default function WeeklyCalendar() {
  const { focusDate } = useDateStore();

  const dates = calculateWeekDates(focusDate);

  return (
    <div className={cn("container")}>
      <div className={cn("week-dates")}>
        {dates.map((date, idx) => (
          <div key={idx} className={cn("date-container")}>
            <p className={cn("day")}>{DAYS[date.day()]}</p>
            <p className={cn("date", { today: date.isSame(dayjs(), "date") })}>{date.date()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
