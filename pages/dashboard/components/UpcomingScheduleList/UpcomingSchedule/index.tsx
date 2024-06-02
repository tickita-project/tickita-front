import classNames from "classnames/bind";

import { GroupColorType } from "@/types/type";

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
  const isDday = daysRemaining === "D-Day";

  return (
    <div className={cn("container")}>
      <div className={cn("color")} style={{ backgroundColor: color }} />
      <h3 className={cn("title")}>{title}</h3>
      <div className={cn("box")}>
        <div
          className={cn("date", {
            "date-d-day": isDday,
          })}
        >
          {date}
        </div>
        <div
          className={cn("day-day", {
            "d-day": isDday,
          })}
        >
          {daysRemaining}
        </div>
      </div>
    </div>
  );
}
