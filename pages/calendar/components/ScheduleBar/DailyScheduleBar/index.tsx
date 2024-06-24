import classNames from "classnames/bind";
import dayjs from "dayjs";

import { GroupColorType } from "@/types/type";

import styles from "./DailyScheduleBar.module.scss";

const cn = classNames.bind(styles);

interface ScheduleBarType {
  index: number;
  scheduleId: number;
  title: string;
  startDate: string;
  endDate: string;
  crewColor: GroupColorType;
}

export default function DailyScheduleBar({
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
  const endHour = end.get("hour");
  const timeDiff = end.diff(start, "hours");
  const zIndex = 25 - timeDiff;
  return (
    <div
      className={cn("container")}
      style={{
        backgroundColor: crewColor,
        zIndex: zIndex,
        left: `${70 + index * 130}px`,
        top: `${startHour * 56 + 1}px`,
        height: `${56 * timeDiff}px`,
      }}
    >
      <p className={cn("time")}>
        {start.format("HH : mm")} ~ {end.format("HH : mm")}
      </p>
      <p className={cn("title")}>{title}</p>
    </div>
  );
}

export function DailyAllDayScheduleBar({
  index,
  scheduleId,
  title,
  startDate,
  endDate,
  crewColor,
}: ScheduleBarType) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  return (
    <>
      <div className={cn("all-container")} style={{ backgroundColor: crewColor, zIndex: "2" }}>
        <p className={cn("end")}>
          ~ {end.format("MM")}.{end.format("DD")} 까지
        </p>
        <p className={cn("title")}>{title}</p>
      </div>
    </>
  );
}
