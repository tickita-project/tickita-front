import classNames from "classnames/bind";
import { Dayjs } from "dayjs";

import styles from "./ScheduleBar.module.scss";

const cn = classNames.bind(styles);

interface ScheduleBarProps {
  startDragDate: Dayjs;
  currentDragDate: Dayjs;
}
export default function ScheduleBar({ startDragDate, currentDragDate }: ScheduleBarProps) {
  return <div className={cn("container")}></div>;
}
