import classNames from "classnames/bind";
import dayjs, { Dayjs } from "dayjs";

import { MODAL_TYPE } from "@/constants/modalType";
import { useModalStore } from "@/store/useModalStore";

import { ScheduleDetailType } from "@/types/type";

import styles from "./WeeklyScheduleBar.module.scss";

interface WeeklyOneDayScheduleBarProps {
  scheduleDetails: ScheduleDetailType;
}

const cn = classNames.bind(styles);

export default function WeeklyOneDayScheduleBar({ scheduleDetails }: WeeklyOneDayScheduleBarProps) {
  const { openModal } = useModalStore();
  const start = dayjs(scheduleDetails.startDateTime);
  const end = dayjs(scheduleDetails.endDateTime);
  const startHour = start.get("hour");
  const timeDiff = end.diff(start, "hours");
  const zIndex = startHour + 2;
  return (
    <div
      className={cn("container")}
      style={{
        backgroundColor: scheduleDetails.crewInfo.labelColor,
        left: "15px",
        zIndex: zIndex,
        top: `${startHour * 80 + 1}px`,
        height: `${80 * timeDiff - 5}px`,
      }}
      onClick={() => openModal(MODAL_TYPE.SCHEDULE_DETAILS, scheduleDetails)}
    >
      <p className={cn("time")}>
        {start.format("HH : mm")} ~ {end.format("HH : mm")}
      </p>
      <p className={cn("title")}>{scheduleDetails.title}</p>
    </div>
  );
}

interface WeeklyScheduleBarProps extends WeeklyOneDayScheduleBarProps {
  crewIndex: number;
  elementWidth: number;
  weekStartDate: Dayjs;
}

export function WeeklyScheduleBar({
  scheduleDetails,
  crewIndex,
  elementWidth,
  weekStartDate,
}: WeeklyScheduleBarProps) {
  const { openModal } = useModalStore();
  const start = dayjs(scheduleDetails.startDateTime);
  const end = dayjs(scheduleDetails.endDateTime);
  const zIndex = 2 + start.day();
  const weekEnd = weekStartDate.add(6, "day");

  const adjustedStart = start.isBefore(weekStartDate) ? weekStartDate : start;
  const adjustedEnd = end.isAfter(weekEnd) ? weekEnd : end;
  //칸수
  const daysOccupied = adjustedEnd.diff(adjustedStart, "day");
  const width = `${daysOccupied * elementWidth}px`;

  return (
    <div
      className={cn("all-container")}
      style={{
        backgroundColor: scheduleDetails.crewInfo.labelColor,
        zIndex: zIndex,
        top: `${crewIndex * 27 + 1}px`,
        left: `${adjustedStart.day() * elementWidth + 100}px`,
        width: width,
      }}
      onClick={() => openModal(MODAL_TYPE.SCHEDULE_DETAILS, scheduleDetails)}
    >
      <p className={cn("time")}>
        {start.format("MM.DD")} ~ {end.format("MM.DD")}
      </p>
      <p className={cn("title")}>{scheduleDetails.title}</p>
    </div>
  );
}
