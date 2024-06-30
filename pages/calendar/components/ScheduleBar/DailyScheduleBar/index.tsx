import classNames from "classnames/bind";
import dayjs from "dayjs";

import { MODAL_TYPE } from "@/constants/modalType";
import { useModalStore } from "@/store/useModalStore";

import { ScheduleDetailType } from "@/types/type";

import styles from "./DailyScheduleBar.module.scss";

const cn = classNames.bind(styles);

interface DailyScheduleBarProps {
  index: number;
  scheduleDetail: ScheduleDetailType;
}

export default function DailyScheduleBar({ index, scheduleDetail }: DailyScheduleBarProps) {
  const { openModal } = useModalStore();
  const start = dayjs(scheduleDetail.startDateTime);
  const end = dayjs(scheduleDetail.endDateTime);

  const startHour = start.get("hour");
  const timeDiff = end.diff(start, "hours");
  const zIndex = 2 + startHour;
  return (
    <div
      className={cn("container")}
      style={{
        backgroundColor: scheduleDetail.crewInfo.labelColor,
        zIndex: zIndex,
        left: `${70 + index * 180}px`,
        top: `${startHour * 56 + 1}px`,
        height: `${56 * timeDiff}px`,
      }}
      onClick={() => openModal(MODAL_TYPE.SCHEDULE_DETAILS, scheduleDetail)}
    >
      <p className={cn("time")}>
        {start.format("HH : mm")} ~ {end.format("HH : mm")}
      </p>
      <p className={cn("title")}>{scheduleDetail.title}</p>
    </div>
  );
}

interface DailyAllDayScheduleBarType {
  scheduleDetail: ScheduleDetailType;
}

export function DailyAllDayScheduleBar({ scheduleDetail }: DailyAllDayScheduleBarType) {
  const { openModal } = useModalStore();
  const end = dayjs(scheduleDetail.endDateTime);

  return (
    <div
      className={cn("all-container")}
      style={{ backgroundColor: scheduleDetail.crewInfo.labelColor, zIndex: "2" }}
      onClick={() => openModal(MODAL_TYPE.SCHEDULE_DETAILS, scheduleDetail)}
    >
      <p className={cn("end")}>
        ~ {end.format("MM")}.{end.format("DD")} 까지
      </p>
      <p className={cn("title")}>{scheduleDetail.title}</p>
    </div>
  );
}
