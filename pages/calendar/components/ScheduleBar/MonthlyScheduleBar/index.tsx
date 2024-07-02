import classNames from "classnames/bind";
import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import { MODAL_TYPE } from "@/constants/modalType";
import { useModalStore } from "@/store/useModalStore";

import { ScheduleDetailType } from "@/types/type";

import styles from "./MonthlyScheduleBar.module.scss";

const cn = classNames.bind(styles);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

interface MonthlyScheduleBarType {
  scheduleDetail: ScheduleDetailType;
  crewIndex: number;
  dateWidth: number;
}

export default function MonthlyScheduleBar({
  scheduleDetail,
  crewIndex,
  dateWidth,
}: MonthlyScheduleBarType) {
  const { openModal } = useModalStore();
  const start = dayjs(scheduleDetail.startDateTime);
  const end = dayjs(scheduleDetail.endDateTime);
  const arrayByWeek = getWeekDividedArray(start, end);

  return (
    <>
      {arrayByWeek.map((week, index) => {
        const dates = week.endDay - week.startDay + 1;
        const day = week.startDay;
        return (
          <div
            key={index}
            className={cn("container")}
            style={{
              backgroundColor: scheduleDetail.crewInfo.labelColor,
              width: `${dateWidth * dates}px`,
              top: `${index * 108 + (crewIndex + 1) * 25}px`,
              left: `${dateWidth * day + 1}px`,
              zIndex: `${day + 2}`,
            }}
            onClick={() => openModal(MODAL_TYPE.SCHEDULE_DETAILS, scheduleDetail)}
          >
            {index === 0 && (
              <p className={cn("time")}>
                {start.format("HH : mm")} ~ {end.format("HH : mm")}
              </p>
            )}

            <p className={cn("title")}>{scheduleDetail.title}</p>
          </div>
        );
      })}
      ;
    </>
  );
}

function getWeekDividedArray(start: Dayjs, end: Dayjs) {
  let result = [];
  let currentStart = start;

  while (currentStart.isBefore(end) || currentStart.isSame(end)) {
    let currentEnd = currentStart.endOf("week");

    if (currentEnd.isAfter(end)) {
      currentEnd = end;
    }

    result.push({
      startDay: currentStart.day(),
      endDay: currentEnd.day(),
    });

    currentStart = currentEnd.add(1, "day");
  }

  return result;
}
