import Image from "next/image";

import classNames from "classnames/bind";

import EmptyNotification from "@/components/Notification/EmptyNotification";

import UpcomingSchedule from "./UpcomingSchedule";
import styles from "./UpcomingScheduleList.module.scss";

const cn = classNames.bind(styles);

const mockData = [
  {
    title: "테스트테스트테스트테스트테스트테스트테스트테",
    color: "#ff7940",
    date: "24.05.28 16:30",
    daysRemaining: "D-DAY",
  },
  {
    title:
      "테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스테스트테스트테스트트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스테스트테스트테스트트",
    color: "#32ecb4",
    date: "24.05.28 16:30",
    daysRemaining: "D-DAY",
  },
  {
    title:
      "테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스테스트테스트테스트트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스테스트테스트테스트트",
    color: "#4f4f4f",
    date: "24.05.28 16:30",
    daysRemaining: "D-99",
  },
  {
    title:
      "테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스테스트테스트테스트트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스테스트테스트테스트트",
    color: "#21d53e",
    date: "24.05.28 16:30",
    daysRemaining: "D-99",
  },
  {
    title:
      "테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스테스트테스트테스트트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스테스트테스트테스트트",
    color: "#3360FF",
    date: "24.05.28 16:30",
    daysRemaining: "D-Day",
  },
  {
    title:
      "테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스테스트테스트테스트트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스테스트테스트테스트트",
    color: "#21d53e",
    date: "24.05.28 16:30",
    daysRemaining: "D-99",
  },
  {
    title:
      "테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스테스트테스트테스트트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스테스트테스트테스트트",
    color: "#21d53e",
    date: "24.05.28 16:30",
    daysRemaining: "D-99",
  },
  {
    title:
      "테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스테스트테스트테스트트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스테스트테스트테스트트",
    color: "#21d53e",
    date: "24.05.28 16:30",
    daysRemaining: "D-99",
  },
  {
    title:
      "테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스테스트테스트테스트트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스테스트테스트테스트트",
    color: "#21d53e",
    date: "24.05.28 16:30",
    daysRemaining: "D-99",
  },
];

export default function UpcomingScheduleList() {
  return (
    <div className={cn("container")}>
      <h2 className={cn("title")}>
        <Image src="/icons/dashboard-calendar.svg" width={24} height={24} alt="달력 아이콘" />
        다가오는 일정
      </h2>
      <div className={cn("box")}>
        {mockData.length > 0 ? (
          mockData.map((item, idx) => (
            <UpcomingSchedule
              key={idx}
              title={item.title}
              color={item.color}
              date={item.date}
              daysRemaining={item.daysRemaining}
            />
          ))
        ) : (
          <EmptyNotification title="다가오는 일정이 없습니다." />
        )}
      </div>
    </div>
  );
}
