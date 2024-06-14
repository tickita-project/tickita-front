import classNames from "classnames/bind";

import { useDateStore } from "@/store/useDateStore";

import styles from "./WeeklyCalendar.module.scss";

const cn = classNames.bind(styles);

export default function WeeklyCalendar() {
  const { focusDate } = useDateStore();
  return <div>주간 캘린더</div>;
}
