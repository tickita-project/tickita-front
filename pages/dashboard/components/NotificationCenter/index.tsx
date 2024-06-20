import Image from "next/image";

import classNames from "classnames/bind";

import BaseNotification from "@/components/Notification/BaseNotification";
import CoordinationNotification from "@/components/Notification/CoordinationNotification";
import EmptyNotification from "@/components/Notification/EmptyNotification";
import ScheduleInfoNotification from "@/components/Notification/ScheduleInfoNotification";
import { useGetAllNotification } from "@/hooks/useGetAllNotification";

import styles from "./NotificationCenter.module.scss";

const cn = classNames.bind(styles);

export default function NotificationCenter() {
  const { data: notificationInfo } = useGetAllNotification();
  const notificationList = notificationInfo?.crewNotificationResponse;

  if (!notificationList) {
    return null;
  }

  return (
    <div className={cn("container")}>
      <h2 className={cn("title")}>
        <Image src="/icons/notification.svg" width={24} height={24} alt="알림 아이콘" />
        알림
      </h2>
      <div className={cn("box")}>
        {notificationList.length > 0 ? (
          notificationList.map((data) => {
            if (data.notificationType === "SCHEDULE_INFO" || data.notificationType === "UPDATE") {
              return <ScheduleInfoNotification key={data.notificationId} notificationData={data} />;
            }

            if (data.notificationType === "REQUEST") {
              return <CoordinationNotification key={data.notificationId} notificationData={data} />;
            }

            return <BaseNotification key={data.notificationId} notificationData={data} />;
          })
        ) : (
          <EmptyNotification title="아직 수신된 알람이 없어요." />
        )}
      </div>
    </div>
  );
}
