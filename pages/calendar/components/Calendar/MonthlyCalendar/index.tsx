import { useRef, useState } from "react";

import classNames from "classnames/bind";
import dayjs, { Dayjs } from "dayjs";
import { useShallow } from "zustand/react/shallow";

import { DAYS } from "@/constants/calendarConstants";
import { MODAL_TYPE } from "@/constants/modalType";
import useDebounce from "@/hooks/useDebounce";
import useDragSelect from "@/hooks/useDragSelect";
import useScroll from "@/hooks/useScroll";
import { useDateStore } from "@/store/useDateStore";
import { useModalStore } from "@/store/useModalStore";
import { calculateMonthDates } from "@/utils/calculateCalendarDates";

import styles from "./MonthlyCalendar.module.scss";

const cn = classNames.bind(styles);

export default function MonthlyCalendar() {
  const [selectedDates, setSelectedDates] = useState<number[]>([]);
  const dragContainerRef = useRef<HTMLDivElement>(null);
  const { focusDate, setFocusDate, setViewDate } = useDateStore();
  const { openModal } = useModalStore();
  const { setScheduleStart, setScheduleEnd } = useDateStore(
    useShallow((state) => ({
      setScheduleStart: state.setScheduleStart,
      setScheduleEnd: state.setScheduleEnd,
    })),
  );

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
  const { draggedIndex } = useDragSelect(dragContainerRef, setSelectedDates);

  const handleOpenModalClick = (date: Dayjs) => {
    setScheduleStart(date.add(0, "hour"));
    setScheduleEnd(date.add(24, "hour"));
    openModal(MODAL_TYPE.SCHEDULE_CREATE);
  };

  return (
    <div className={cn("container")} ref={scrollRef}>
      <div className={cn("month-header")}>
        {DAYS.map((day, i) => (
          <div key={i} className={cn("day")}>
            {day}
          </div>
        ))}
      </div>
      <div className={cn("month-content")} ref={dragContainerRef}>
        {dates.map((date, i) => {
          const isThisMonthDay = date.isSame(focusDate, "month");
          const isToday = date.isSame(dayjs(), "date");
          const isSelected = draggedIndex.includes(i);
          return (
            <div
              key={i}
              className={cn("date-container", { selected: isSelected })}
              onClick={() => handleOpenModalClick(date)}
              data-index={i}
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
