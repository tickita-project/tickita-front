import classNames from "classnames/bind";

import { MODAL_TYPE } from "@/constants/modalType";
import { useModalStore } from "@/store/useModalStore";
import { formatKoreanDateTime } from "@/utils/formatKoreanDateTime";

import styles from "./UpcomingSchedule.module.scss";

const cn = classNames.bind(styles);

interface UpcomingScheduleProps {
  title: string;
  color: string;
  date: string;
  daysRemaining: string;
}

export default function UpcomingSchedule({
  title,
  color,
  date,
  daysRemaining,
}: UpcomingScheduleProps) {
  const { openModal } = useModalStore();
  const isToday = daysRemaining === "D-DAY";

  const handleUpcomingScheduleClick = () => {
    openModal(MODAL_TYPE.SCHEDULE_DETAILS, "일정 데이터");
  };

  return (
    <div className={cn("container")} onClick={handleUpcomingScheduleClick}>
      <div className={cn("color")} style={{ backgroundColor: color }} />
      <h3 className={cn("title")}>{title}</h3>
      <div className={cn("box")}>
        <div
          className={cn("date", {
            "date-d-day": isToday,
          })}
        >
          {formatKoreanDateTime(date)}
        </div>
        <div
          className={cn("day-day", {
            "d-day": isToday,
          })}
        >
          {daysRemaining}
        </div>
      </div>
    </div>
  );
}
