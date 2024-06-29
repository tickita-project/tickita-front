import classNames from "classnames/bind";
import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import { GroupColorType } from "@/types/type";

import styles from "./MonthlyScheduleBar.module.scss";

const cn = classNames.bind(styles);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

interface MonthlyScheduleBarType {
  monthStart: Dayjs;
  monthEnd: Dayjs;
  scheduleId: number;
  title: string;
  startDate: string;
  endDate: string;
  crewColor: GroupColorType;
  crewIndex: number;
}

export default function MonthlyScheduleBar({
  monthStart,
  monthEnd,
  scheduleId,
  title,
  startDate,
  endDate,
  crewColor,
  crewIndex,
}: MonthlyScheduleBarType) {
  const { scheduleBarStart, scheduleBarEnd } = getScheduleBarStartEndDate(
    dayjs(startDate),
    dayjs(endDate),
    monthStart,
    monthEnd,
  );
  const dividedArray = divideScheduleByWeek(scheduleBarStart, scheduleBarEnd);
}

interface WeekScheduleBarProps {
  start: Dayjs;
  end: Dayjs;
}
function WeekScheduleBar({ start, end }: WeekScheduleBarProps) {}

function getScheduleBarStartEndDate(
  scheduleStart: Dayjs,
  scheduleEnd: Dayjs,
  monthStart: Dayjs,
  monthEnd: Dayjs,
) {
  const scheduleBarStart = scheduleStart.isSameOrBefore(monthStart) ? monthStart : scheduleStart;
  const scheduleBarEnd = scheduleEnd.isSameOrAfter(monthEnd) ? monthEnd : scheduleEnd;

  return { scheduleBarStart, scheduleBarEnd };
}

function divideScheduleByWeek(scheduleStart: Dayjs, scheduleEnd: Dayjs) {
  let dividedArray = [];

  // 현재 날짜를 기준으로 첫 번째 주의 토요일을 계산
  let currentEnd = scheduleStart.endOf("week").subtract(1, "day");

  // 첫 번째 주의 시작 날짜와 끝 날짜를 저장
  dividedArray.push({
    start: scheduleStart,
    end: currentEnd.isBefore(scheduleEnd) ? currentEnd : scheduleEnd,
  });

  // 다음 주의 시작 날짜 계산
  let currentStart = currentEnd.add(1, "day");

  // 주별로 나누기
  while (currentStart.isBefore(scheduleEnd)) {
    currentEnd = currentStart.endOf("week").subtract(1, "day");

    dividedArray.push({
      start: currentStart,
      end: currentEnd.isBefore(scheduleEnd) ? currentEnd : scheduleEnd,
    });

    currentStart = currentEnd.add(1, "day");
  }

  return dividedArray;
}
