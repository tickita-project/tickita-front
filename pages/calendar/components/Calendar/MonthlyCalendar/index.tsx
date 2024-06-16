import classNames from "classnames/bind";
import dayjs from "dayjs";

import { DAYS } from "@/constants/calendarConstants";
import useDebounce from "@/hooks/useDebounce";
import useScroll from "@/hooks/useScroll";
import { useDateStore } from "@/store/useDateStore";
import { useModalStore } from "@/store/useModalStore";
import { calculateMonthDates } from "@/utils/calculateCalendarDates";

import styles from "./MonthlyCalendar.module.scss";

const cn = classNames.bind(styles);

export default function MonthlyCalendar() {
  const { focusDate, setFocusDate, setViewDate } = useDateStore();
  const { openModal } = useModalStore();

  const dates = calculateMonthDates(focusDate);

  const handleScrollUpDebounced = useDebounce(
    () => {
      setFocusDate(focusDate.subtract(1, "month").date(1));
      setViewDate(focusDate.subtract(1, "month"));
    },
    300,
    true,
  );
  const handleScrollDownDebounced = useDebounce(
    () => {
      setFocusDate(focusDate.add(1, "month").date(1));
      setViewDate(focusDate.add(1, "month"));
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
          const isThisMonthDay = date.isSame(focusDate, "month");
          const isToday = date.isSame(dayjs(), "date");
          return (
            <div key={i} className={cn("date-container")}>
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
