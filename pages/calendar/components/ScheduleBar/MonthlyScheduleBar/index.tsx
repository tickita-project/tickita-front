import classNames from "classnames/bind";
import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import { MODAL_TYPE } from "@/constants/modalType";
import { useModalStore } from "@/store/useModalStore";

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
  dateWidth: number;
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
  dateWidth,
}: MonthlyScheduleBarType) {
  const { openModal } = useModalStore();
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const { scheduleBarStart, scheduleBarEnd } = getScheduleBarStartEndDate(
    start,
    end,
    monthStart,
    monthEnd,
  );
  const dividedArray = divideScheduleByWeek(scheduleBarStart, scheduleBarEnd);
  const startWeekDiff = scheduleBarStart.diff(monthStart, "week"); //첫 바가 몇번째 주

  return (
    <>
      {dividedArray.map((week, index) => {
        const dates = week.start.diff(week.end, "date") + 1; // 일주일중 몇일 인지 (width)
        const day = week.start.day();
        return (
          <div
            key={index}
            className={cn("container")}
            style={{
              backgroundColor: crewColor,
              width: `${dateWidth * dates}px`,
              top: `${startWeekDiff * 108 + (crewIndex + 1) * 25}px`,
              left: `${dateWidth * day + 1}px`,
              zIndex: `${day + 2}px`,
            }}
            onClick={() => openModal(MODAL_TYPE.SCHEDULE_DETAILS, scheduleId)}
          >
            {index === 0 && (
              <p className={cn("time")}>
                {start.format("HH : mm")} ~ {end.format("HH : mm")}
              </p>
            )}

            <p className={cn("title")}>{title}</p>
          </div>
        );
      })}
      ;
    </>
  );
}

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
