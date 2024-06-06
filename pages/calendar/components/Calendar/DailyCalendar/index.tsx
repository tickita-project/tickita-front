import classNames from "classnames/bind";
import { Dayjs } from "dayjs";

import styles from "./DailyCalendar.module.scss";

const cn = classNames.bind(styles);

interface DailyCalendarProps {
  viewDate: Dayjs;
}

export default function DailyCalendar({ viewDate }: DailyCalendarProps) {
  return <div>일간 캘린더</div>;
}
