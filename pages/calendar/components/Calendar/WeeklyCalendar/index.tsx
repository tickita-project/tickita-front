import React, { useEffect, useRef, useState } from "react";

import classNames from "classnames/bind";
import dayjs from "dayjs";
import { useShallow } from "zustand/react/shallow";

import { DAYS, HOURS } from "@/constants/calendarConstants";
import { MODAL_TYPE } from "@/constants/modalType";
import { useDateStore } from "@/store/useDateStore";
import { useModalStore } from "@/store/useModalStore";
import { calculateWeekDates } from "@/utils/calculateCalendarDates";

import styles from "./WeeklyCalendar.module.scss";

const cn = classNames.bind(styles);

interface WeeklyCalendarProps {
  selectedCrewIdList: number[] | [];
}

export default function WeeklyCalendar({ selectedCrewIdList }: WeeklyCalendarProps) {
  const [dragStartDayIndex, setDragStartDayIndex] = useState<number | null>(null);
  const [draggedHoursIndex, setDraggedHoursIndex] = useState<number[]>([]);
  const { focusDate, setScheduleStart, setScheduleEnd } = useDateStore(
    useShallow((state) => ({
      focusDate: state.focusDate,
      setScheduleStart: state.setScheduleStart,
      setScheduleEnd: state.setScheduleEnd,
    })),
  );
  const { openModal } = useModalStore();

  const dates = calculateWeekDates(focusDate);

  const handleDragStart = (dayIndex: number, hourIndex: number) => {
    setDragStartDayIndex(dayIndex);
    setDraggedHoursIndex([hourIndex]);
  };

  const handleDragMove = (hourIndex: number) => {
    setDraggedHoursIndex((prev) => {
      const newDraggedIndex = [...prev, hourIndex];
      return Array.from(new Set(newDraggedIndex)).sort((a, b) => a - b);
    });
  };

  const handleDragEnd = () => {
    if (dragStartDayIndex) {
      setScheduleStart(dates[dragStartDayIndex].add(draggedHoursIndex[0], "hour"));
      setScheduleEnd(
        dates[dragStartDayIndex].add(draggedHoursIndex[draggedHoursIndex.length - 1] + 1, "hour"),
      );
      openModal(MODAL_TYPE.SCHEDULE_CREATE);
    }
    setDraggedHoursIndex([]);
    setDragStartDayIndex(null);
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
          {dates.map((date, dayIndex) => (
            <div key={dayIndex} className={cn("time-column")}>
              {HOURS.map((hour, hourIndex) => (
                <div
                  key={hour}
                  className={cn("time-block", {
                    dragged:
                      draggedHoursIndex.includes(hourIndex) && dragStartDayIndex === dayIndex,
                  })}
                  data-index={hourIndex}
                  onPointerDown={() => handleDragStart(dayIndex, hourIndex)}
                  onPointerMove={() => handleDragMove(hourIndex)}
                  onPointerUp={handleDragEnd}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
