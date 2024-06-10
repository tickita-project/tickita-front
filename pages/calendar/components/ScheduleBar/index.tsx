import classNames from "classnames/bind";

import { GroupColorType } from "@/types/type";

import styles from "./ScheduleBar.module.scss";

const cn = classNames.bind(styles);

interface ScheduleBarProps {
  startTime: string;
  endTime: string;
  scheduleName: string;
  barColor: GroupColorType;
}
export default function ScheduleBar({
  startTime,
  endTime,
  scheduleName,
  barColor = "#3360FF",
}: ScheduleBarProps) {
  return <div className={cn("container")}></div>;
}
