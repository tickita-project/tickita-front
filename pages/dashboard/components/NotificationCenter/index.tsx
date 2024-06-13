import Image from "next/image";

import classNames from "classnames/bind";

import BaseNotification from "@/components/Notification/BaseNotification";
import CoordinationNotification from "@/components/Notification/CoordinationNotification";
import EmptyNotification from "@/components/Notification/EmptyNotification";
import ScheduleInfoNotification from "@/components/Notification/ScheduleInfoNotification";

import styles from "./NotificationCenter.module.scss";

const cn = classNames.bind(styles);

interface ScheduleInfoType {
  id: number;
  type: string;
  groupName: string;
  text: string;
  scheduleInfo?: string;
  notificationDate: string;
  isChecked: boolean;
  link?: string;
}

const mockData: ScheduleInfoType[] = [
  {
    id: 1,
    type: "default",
    groupName: "코드잇 4기 11팀",
    text: "기본 알림 클릭 이벤트 X, 알림 삭제만 가능",
    scheduleInfo: "24.05.23 (금) 14:00, 하남돼지집",
    notificationDate: "24.05.23 (금)",
    isChecked: true,
  },
  {
    id: 2,
    type: "coordination",
    groupName: "코드잇 4기 11팀",
    text: "클릭 시 일정 조율 링크 or 주최자가 일정 선택하는 페이지 링크로 이동, 알림 삭제 가능 / 텍스트 길어지는 경우 확인텍스트 길어지는 경우 확인텍스트 길어지는 경우 확인텍스트 길어지는 경우 확인텍스트 길어지는 경우 확인텍스트 길어지는 경우 확인",
    notificationDate: "24.05.23 (금)",
    isChecked: false,
    link: "일정 조율 링크 or 주최자가 일정 선택하는 페이지 링크",
  },
  {
    id: 3,
    type: "scheduleInfo",
    groupName: "코드잇 4기 11팀",
    text: "클릭 시 일정 상세 모달 열기, 알림 삭제 가능",
    scheduleInfo: "24.05.23 (금) 14:00, 하남돼지집",
    notificationDate: "24.05.23 (금)",
    isChecked: false,
  },
  {
    id: 4,
    type: "invite",
    groupName: "코드잇 4기 11팀",
    text: "그룹 초대 수락, 알림 삭제 가능",
    notificationDate: "24.05.23 (금)",
    isChecked: false,
  },
];

export default function NotificationCenter() {
  return (
    <div className={cn("container")}>
      <h2 className={cn("title")}>
        <Image src="/icons/notification.svg" width={24} height={24} alt="알림 아이콘" />
        알림
      </h2>
      <div className={cn("box")}>
        {mockData.length > 0 ? (
          mockData.map((item) => {
            if (item.type === "scheduleInfo") {
              return <ScheduleInfoNotification key={item.id} scheduleDetail={item} />;
            }

            if (item.type === "coordination") {
              return <CoordinationNotification key={item.id} scheduleDetail={item} />;
            }

            return (
              <BaseNotification
                type={item.type}
                key={item.id}
                groupName={item.groupName}
                text={item.text}
                scheduleInfo={item.scheduleInfo}
                notificationDate={item.notificationDate}
                isChecked={item.isChecked}
              />
            );
          })
        ) : (
          <EmptyNotification title="아직 수신된 알람이 없어요." />
        )}
      </div>
    </div>
  );
}
