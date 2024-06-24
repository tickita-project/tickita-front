import classNames from "classnames/bind";
import dayjs from "dayjs";

import { GroupColorType } from "@/types/type";

import styles from "./WeeklyScheduleBar.module.scss";

interface ScheduleBarType {
  scheduleId: number;
  title: string;
  startDate: string;
  endDate: string;
  crewColor: GroupColorType;
}

const cn = classNames.bind(styles);

export default function WeeklyOneDayScheduleBar({
  scheduleId,
  title,
  startDate,
  endDate,
  crewColor,
}: ScheduleBarType) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const startHour = start.get("hour");
  const timeDiff = end.diff(start, "hours");
  const zIndex = startHour + 2;
  return (
    <div
      className={cn("container")}
      style={{
        backgroundColor: crewColor,
        left: "15px",
        zIndex: zIndex,
        top: `${startHour * 80 + 1}px`,
        height: `${80 * timeDiff - 5}px`,
      }}
    >
      <p className={cn("time")}>
        {start.format("HH : mm")} ~ {end.format("HH : mm")}
      </p>
      <p className={cn("title")}>{title}</p>
    </div>
  );
}

export function WeeklyScheduleBar({
  scheduleId,
  title,
  startDate,
  endDate,
  crewColor,
}: ScheduleBarType) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const zIndex = 2 + start.day();

  return (
    <div className={cn("all-continaer")} style={{ backgroundColor: crewColor, zIndex: zIndex }}>
      <div className={cn("time")}>
        <p className={cn("start")}>{start.format("MM.DD HH:mm")}</p>
        <p className={cn("end")}>~ {end.format("MM.DD HH:mm")}</p>
      </div>
      <p className={cn("title")}>{title}</p>
    </div>
  );
}
