import classNames from "classnames/bind";
import dayjs from "dayjs";

import { MODAL_TYPE } from "@/constants/modalType";
import { useModalStore } from "@/store/useModalStore";

import { GroupColorType } from "@/types/type";

import styles from "./DailyScheduleBar.module.scss";

const cn = classNames.bind(styles);

interface DailyScheduleBarType {
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
}: DailyScheduleBarType) {
  const { openModal } = useModalStore();
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const startHour = start.get("hour");
  const timeDiff = end.diff(start, "hours");
  const zIndex = 2 + startHour;
  return (
    <div
      className={cn("container")}
      style={{
        backgroundColor: crewColor,
        zIndex: zIndex,
        left: `${70 + index * 180}px`,
        top: `${startHour * 56 + 1}px`,
        height: `${56 * timeDiff}px`,
      }}
      onClick={() => openModal(MODAL_TYPE.SCHEDULE_DETAILS, scheduleId)}
    >
      <p className={cn("time")}>
        {start.format("HH : mm")} ~ {end.format("HH : mm")}
      </p>
      <p className={cn("title")}>{title}</p>
    </div>
  );
}

interface DailyAllDayScheduleBarType {
  scheduleId: number;
  title: string;
  endDate: string;
  crewColor: GroupColorType;
}

export function DailyAllDayScheduleBar({
  scheduleId,
  title,
  endDate,
  crewColor,
}: DailyAllDayScheduleBarType) {
  const { openModal } = useModalStore();
  const end = dayjs(endDate);

  return (
    <div
      className={cn("all-container")}
      style={{ backgroundColor: crewColor, zIndex: "2" }}
      onClick={() => openModal(MODAL_TYPE.SCHEDULE_DETAILS, scheduleId)}
    >
      <p className={cn("end")}>
        ~ {end.format("MM")}.{end.format("DD")} 까지
      </p>
      <p className={cn("title")}>{title}</p>
    </div>
  );
}
