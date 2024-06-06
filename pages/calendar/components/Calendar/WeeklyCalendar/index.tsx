import classNames from "classnames/bind";
import { Dayjs } from "dayjs";

import styles from "./WeeklyCalendar.module.scss";

const cn = classNames.bind(styles);

interface WeeklyCalendarProps {
  viewDate: Dayjs;
}

export default function WeeklyCalendar({ viewDate }: WeeklyCalendarProps) {
  return <div>주간 캘린더</div>;
}
