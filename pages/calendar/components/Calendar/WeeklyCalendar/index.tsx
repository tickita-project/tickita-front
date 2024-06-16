import React from "react";

import classNames from "classnames/bind";
import dayjs, { Dayjs } from "dayjs";
import { useShallow } from "zustand/react/shallow";

import { DAYS, HOURS } from "@/constants/calendarConstants";
import { MODAL_TYPE } from "@/constants/modalType";
import { useDateStore } from "@/store/useDateStore";
import { useModalStore } from "@/store/useModalStore";
import { calculateWeekDates } from "@/utils/calculateCalendarDates";

import styles from "./WeeklyCalendar.module.scss";

const cn = classNames.bind(styles);

export default function WeeklyCalendar() {
  const { focusDate } = useDateStore(useShallow((state) => ({ focusDate: state.focusDate })));
  const { openModal } = useModalStore();
  const { setScheduleStart, setScheduleEnd } = useDateStore(
    useShallow((state) => ({
      setScheduleStart: state.setScheduleStart,
      setScheduleEnd: state.setScheduleEnd,
    })),
  );

  const dates = calculateWeekDates(focusDate);

  const handleOpenModalClick = (date: Dayjs, hour: number) => {
    setScheduleStart(date.add(hour - 1, "hour"));
    setScheduleEnd(date.add(hour, "hour"));
    openModal(MODAL_TYPE.SCHEDULE_CREATE);
  };

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
      <div className={cn("time-scroll-container")}>
        <div className={cn("label-container")}>
          {HOURS.map((hour) => (
            <p key={hour} className={cn("label")}>
              {hour.toString().padStart(2, "0")}
            </p>
          ))}
        </div>
        <div className={cn("time-container")}>
          {dates.map((date, idx) => (
            <div key={idx} className={cn("time-column")}>
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  className={cn("time-block")}
                  onClick={() => handleOpenModalClick(date, hour)}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
