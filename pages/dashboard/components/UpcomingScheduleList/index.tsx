import Image from "next/image";

import classNames from "classnames/bind";

import EmptyNotification from "@/components/Notification/EmptyNotification";
import { useGetUpcomingSchedule } from "@/hooks/useGetUpcomingSchedule";

import UpcomingSchedule from "./UpcomingSchedule";
import styles from "./UpcomingScheduleList.module.scss";

const cn = classNames.bind(styles);

export default function UpcomingScheduleList() {
  const { data } = useGetUpcomingSchedule();
  const upcomingScheduleList = data ?? [];

  return (
    <div className={cn("container")}>
      <h2 className={cn("title")}>
        <Image src="/icons/dashboard-calendar.svg" width={24} height={24} alt="달력 아이콘" />
        다가오는 일정
      </h2>
      <div className={cn("box")}>
        {upcomingScheduleList.length > 0 ? (
          upcomingScheduleList.map((list) => (
            <UpcomingSchedule
              key={list.scheduleId}
              scheduleId={list.scheduleId}
              title={list.title}
              color={list.crewInfo.labelColor}
              date={list.startDateTime}
              daysRemaining={list.remainTime}
            />
          ))
        ) : (
          <EmptyNotification title="다가오는 일정이 없습니다." />
        )}
      </div>
    </div>
  );
}
