import classNames from "classnames/bind";
import dayjs from "dayjs";

import { DAYS } from "@/constants/calendarConstants";
import { useDateStore } from "@/store/useDateStore";
import { calculateMonthDates } from "@/utils/calculateCalendarDates";

import styles from "./MonthlyCalendar.module.scss";

const cn = classNames.bind(styles);

export default function MonthlyCalendar() {
  const { viewDate } = useDateStore();

  const dates = calculateMonthDates(viewDate);

  return (
    <div className={cn("container")}>
      <div className={cn("month-header")}>
        {DAYS.map((day, i) => (
          <div key={i} className={cn("day", { sunday: day === "일" }, { saturday: day === "토" })}>
            {day}
          </div>
        ))}
      </div>
      <div className={cn("month-content")}>
        {dates.map((date, i) => {
          const isNotThisMonthDay = !viewDate.isSame(dayjs(), "month");
          const isToday = viewDate.isSame(dayjs(), "date");
          return (
            <div key={i} className={"date-container"}>
              <p className={cn("date", { today: isToday }, { "other-month": isNotThisMonthDay })}>
                {date.date()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
