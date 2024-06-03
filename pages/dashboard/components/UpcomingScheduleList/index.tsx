import Image from "next/image";

import classNames from "classnames/bind";

import EmptyNotification from "@/components/Notification/EmptyNotification";

import UpcomingSchedule from "./UpcomingSchedule";
import styles from "./UpcomingScheduleList.module.scss";

const cn = classNames.bind(styles);

const mockData = [
  {
    id: 1,
    title: "테스트",
    color: "#ff7940",
    date: "24.05.28 16:30",
    daysRemaining: "D-DAY",
  },
  {
    id: 2,
    title: "테스트2",
    color: "#32ecb4",
    date: "24.05.28 16:30",
    daysRemaining: "D-17",
  },
  {
    id: 3,
    title: "테스트3",
    color: "#4f4f4f",
    date: "24.05.28 16:30",
    daysRemaining: "D-80",
  },
  {
    id: 4,
    title:
      "텍스트 길어지는 경우 확인텍스트 길어지는 경우 확인텍스트 길어지는 경우 확인텍스트 길어지는 경우 확인텍스트 길어지는 경우 확인텍스트 길어지는 경우 확인텍스트 길어지는 경우 확인텍스트 길어지는 경우 확인텍스트 길어지는 경우 확인",
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
              key={item.id}
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
