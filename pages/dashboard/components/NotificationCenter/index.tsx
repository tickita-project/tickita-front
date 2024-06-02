import Image from "next/image";

import classNames from "classnames/bind";

import Notification from "@/components/Notification/Notification";

import styles from "./NotificationCenter.module.scss";

const cn = classNames.bind(styles);

export default function NotificationCenter() {
  return (
    <div className={cn("container")}>
      <h2 className={cn("title")}>
        <Image src="/icons/notification.svg" width={24} height={24} alt="알림 아이콘" />
        알림
      </h2>
      <div className={cn("box")}>
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        {/* {mockData.length > 0 ? (
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
        )} */}
      </div>
    </div>
  );
}
