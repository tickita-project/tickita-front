import { useRef } from "react";

import classNames from "classnames/bind";
import { useShallow } from "zustand/react/shallow";

import { DAYS, HOURS } from "@/constants/calendarConstants";
import { MODAL_TYPE } from "@/constants/modalType";
import useDragSelect from "@/hooks/useDragSelect";
import { useDateStore } from "@/store/useDateStore";
import { useModalStore } from "@/store/useModalStore";

import styles from "./DailyCalendar.module.scss";

const cn = classNames.bind(styles);

interface DailyCalendarProps {
  scheduleData: any;
}

export default function DailyCalendar({ scheduleData }: DailyCalendarProps) {
  const dragContainerRef = useRef<HTMLDivElement>(null);
  const { focusDate, setScheduleStart, setScheduleEnd } = useDateStore(
    useShallow((state) => ({
      focusDate: state.focusDate,
      setScheduleStart: state.setScheduleStart,
      setScheduleEnd: state.setScheduleEnd,
    })),
  );
  const { openModal } = useModalStore();

  const handleDragEnd = (draggedIndex: number[]) => {
    const startHour = draggedIndex[0];
    const endHour = draggedIndex[draggedIndex.length - 1] + 1;
    setScheduleStart(focusDate.hour(startHour).minute(0).second(0));
    setScheduleEnd(focusDate.hour(endHour).minute(0).second(0));
    openModal(MODAL_TYPE.SCHEDULE_CREATE);
  };

  const { draggedIndex } = useDragSelect(dragContainerRef, handleDragEnd);

  return (
    <div className={cn("container")}>
      <p className={cn("date")}>
        {focusDate.date()} <span>{DAYS[focusDate.day()]}</span>
      </p>
      <div className={cn("all-day-schedules")}></div>
      <div className={cn("time-scroll-container")} ref={dragContainerRef}>
        {HOURS.map((hour, i) => (
          <div className={cn("time-block")} key={hour}>
            <p className={cn("label")}>{hour.toString().padStart(2, "0")}</p>
            <div
              key={hour}
              className={cn("schedule-block", { dragged: draggedIndex.includes(i) })}
              data-index={i}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
