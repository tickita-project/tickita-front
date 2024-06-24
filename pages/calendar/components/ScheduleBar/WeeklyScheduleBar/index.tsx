import classNames from "classnames";
import dayjs from "dayjs";

import { GroupColorType } from "@/types/type";

import styles from "./WeeklyScheduleBar.module.scss";

interface ScheduleBarType {
  index: number;
  scheduleId: number;
  title: string;
  startDate: string;
  endDate: string;
  crewColor: GroupColorType;
}

const cn = classNames.bind(styles);

export default function WeeklyOneDayScheduleBar({
  index,
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

  return (
    <div
      className={cn("container")}
      style={{
        backgroundColor: crewColor,
        left: "10px",
        top: `${startHour * 80 + 1}px`,
        height: `${80 * timeDiff}px`,
      }}
    >
      <p className={cn("start")}>
        {start.format("hh")}.{start.format("mm")}
      </p>
      <p className={cn("end")}>
        ~ {end.format("hh")}.{end.format("mm")}
      </p>
      <p className={cn("title")}>{title}</p>
    </div>
  );
}

export function WeeklyScheduleBar({}) {}
