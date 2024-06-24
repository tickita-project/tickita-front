import { useEffect, useRef } from "react";

import classNames from "classnames/bind";
import dayjs from "dayjs";
import { useShallow } from "zustand/react/shallow";

import { DAYS, HOURS } from "@/constants/calendarConstants";
import { MODAL_TYPE } from "@/constants/modalType";
import useDragSelect from "@/hooks/useDragSelect";
import { useDateStore } from "@/store/useDateStore";
import { useModalStore } from "@/store/useModalStore";

import styles from "./DailyCalendar.module.scss";
import DailyScheduleBar, { DailyAllDayScheduleBar } from "../../ScheduleBar/DailyScheduleBar";

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

  useEffect(() => {
    console.log(scheduleData);
  }, []);

  return (
    <div className={cn("container")}>
      <p className={cn("date")}>
        {focusDate.date()} <span>{DAYS[focusDate.day()]}</span>
      </p>
      <div className={cn("all-day-schedules")}>
        {scheduleData.map(
          (queryResult: any) =>
            Array.isArray(queryResult.data) &&
            queryResult.data.map((schedule: any, index: number) => {
              const start = dayjs(schedule.startDateTime);
              const end = dayjs(schedule.endDateTime);
              return end.diff(start, "days") >= 1 ? (
                <DailyAllDayScheduleBar
                  index={index}
                  key={schedule.scheduleId}
                  scheduleId={schedule.scheduleId}
                  startDate={schedule.startDateTime}
                  endDate={schedule.endDateTime}
                  title={schedule.title}
                  crewColor={schedule.crewInfo.labelColor}
                />
              ) : null;
            }),
        )}
      </div>
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
        {scheduleData.map(
          (queryResult: any) =>
            Array.isArray(queryResult.data) &&
            queryResult.data.map((schedule: any, index: number) => {
              const start = dayjs(schedule.startDateTime);
              const end = dayjs(schedule.endDateTime);
              return end.diff(start, "days") === 0 ? (
                <DailyScheduleBar
                  index={index}
                  key={schedule.scheduleId}
                  scheduleId={schedule.scheduleId}
                  startDate={schedule.startDateTime}
                  endDate={schedule.endDateTime}
                  title={schedule.title}
                  crewColor={schedule.crewInfo.labelColor}
                />
              ) : null;
            }),
        )}
      </div>
    </div>
  );
}
