import Image from "next/image";

import classNames from "classnames/bind";

import BaseNotification from "@/components/Notification/BaseNotification";
import EmptyNotification from "@/components/Notification/EmptyNotification";

import styles from "./NotificationCenter.module.scss";

const cn = classNames.bind(styles);

const mockData = [
  {
    groupName: "코드잇 4기 11팀",
    text: "테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림알림테스트알림테스트",
    schduleInfo: "24.05.23 (금) 14:00, 하남돼지집",
    notificationDate: "24.05.23 (금)",
    isChecked: true,
  },
  {
    groupName: "코드잇 4기 11팀",
    text: "테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림",
    schduleInfo: "24.05.23 (금) 14:00, 하남돼지집",
    notificationDate: "24.05.23 (금)",
    isChecked: false,
  },
  {
    groupName: "코드잇 4기 11팀",
    text: "테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림",
    schduleInfo: "24.05.23 (금) 14:00, 하남돼지집",
    notificationDate: "24.05.23 (금)",
    isChecked: false,
  },
  {
    groupName: "코드잇 4기 11팀",
    text: "테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림",
    schduleInfo: "24.05.23 (금) 14:00, 하남돼지집",
    notificationDate: "24.05.23 (금)",
    isChecked: false,
  },
  {
    groupName: "코드잇 4기 11팀",
    text: "테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림",
    schduleInfo: "24.05.23 (금) 14:00, 하남돼지집",
    notificationDate: "24.05.23 (금)",
    isChecked: false,
  },
  {
    groupName: "코드잇 4기 11팀",
    text: "테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림테스트 알림",
    schduleInfo: "24.05.23 (금) 14:00, 하남돼지집",
    notificationDate: "24.05.23 (금)",
    isChecked: false,
  },
];

export default function NotificationCenter() {
  const onClick = () => {
    console.log("1");
  };

  return (
    <div className={cn("container")}>
      <h2 className={cn("title")}>
        <Image src="/icons/notification.svg" width={24} height={24} alt="알림 아이콘" />
        알림
      </h2>
      <div className={cn("box")}>
        {mockData.length > 0 ? (
          mockData.map((item, idx) => (
            <BaseNotification
              key={idx}
              groupName={item.groupName}
              text={item.text}
              schduleInfo={item.schduleInfo}
              notificationDate={item.notificationDate}
              isChecked={item.isChecked}
              onClick={onClick}
            />
          ))
        ) : (
          <EmptyNotification title="아직 수신된 알람이 없어요." />
        )}
      </div>
    </div>
  );
}
