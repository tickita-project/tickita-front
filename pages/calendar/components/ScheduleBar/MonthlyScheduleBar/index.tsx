import classNames from "classnames/bind";
import dayjs, { Dayjs } from "dayjs";

import { GroupColorType } from "@/types/type";

import styles from "./MonthlyScheduleBar.module.scss";

const cn = classNames.bind(styles);

interface MonthlyScheduleBarType {
  scheduleId: number;
  title: string;
  startDate: string;
  endDate: string;
  crewColor: GroupColorType;
  crewIndex: number;
}

export default function MonthlyScheduleBar({
  scheduleId,
  title,
  startDate,
  endDate,
  crewColor,
  crewIndex,
}: MonthlyScheduleBarType) {}
