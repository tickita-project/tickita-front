import classNames from "classnames/bind";

import { DAYS } from "@/constants/calendarConstants";
import { useDateStore } from "@/store/useDateStore";

import styles from "./DailyCalendar.module.scss";

const cn = classNames.bind(styles);

const hours = Array.from({ length: 24 }, (_, i) => i);

export default function DailyCalendar() {
  const { viewDate } = useDateStore();
  return (
    <div className={cn("container")}>
      <p className={cn("date")}>
        {viewDate.date()}일 {DAYS[viewDate.day()]}요일
      </p>
      <div className={cn("events")}>
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} className={cn("event-slot")}>
            {/* 이벤트를 여기에 추가합니다 */}
          </div>
        ))}
      </div>
    </div>
  );
}
