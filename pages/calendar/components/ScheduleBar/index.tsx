import classNames from "classnames/bind";

import styles from "./ScheduleBar.module.scss";

const cn = classNames.bind(styles);

interface ScheduleBarProps {
  startRef: HTMLDivElement;
  currentRef: HTMLDivElement;
}
export default function ScheduleBar({ startRef, currentRef }: ScheduleBarProps) {
  return <div className={cn("container")}></div>;
}
