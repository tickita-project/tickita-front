import { useRef } from "react";

import classNames from "classnames/bind";
import dayjs from "dayjs";

import { DAYS } from "@/constants/calendarConstants";
import useDebounce from "@/hooks/useDebounce";
import useScroll from "@/hooks/useScroll";
import { useDateStore } from "@/store/useDateStore";
import { calculateMonthDates } from "@/utils/calculateCalendarDates";

import styles from "./MonthlyCalendar.module.scss";

const cn = classNames.bind(styles);

export default function MonthlyCalendar() {
  const { viewDate, setViewDate } = useDateStore();
  const dateRefs = useRef<(HTMLDivElement | null)[]>([]); // 타입 지정

  const dates = calculateMonthDates(viewDate);

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

  const scrollRef = useScroll<HTMLDivElement>(handleScrollDownDebounced, handleScrollUpDebounced);

  return (
    <div className={cn("container")} ref={scrollRef}>
      <div className={cn("month-header")}>
        {DAYS.map((day, i) => (
          <div key={i} className={cn("day")}>
            {day}
          </div>
        ))}
      </div>
      <div className={cn("month-content")}>
        {dates.map((date, i) => {
          const isThisMonthDay = date.isSame(viewDate, "month");
          const isToday = date.isSame(dayjs(), "date");
          return (
            <div
              key={i}
              className={cn("date-container")}
              ref={(el) => {
                dateRefs.current[i] = el;
              }}
            >
              <p className={cn("date", { today: isToday, "other-month": !isThisMonthDay })}>
                {date.date()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
