import Image from "next/image";

import classNames from "classnames/bind";

import BaseNotification from "@/components/Notification/BaseNotification";
import CoordinationNotification from "@/components/Notification/CoordinationNotification";
import EmptyNotification from "@/components/Notification/EmptyNotification";
import ScheduleInfoNotification from "@/components/Notification/ScheduleInfoNotification";
import { useGetNotifications } from "@/hooks/useGetNotifications";

import styles from "./NotificationCenter.module.scss";

const cn = classNames.bind(styles);

export default function NotificationCenter() {
  const { data: allNotifications } = useGetNotifications();

  return (
    <div className={cn("container")}>
      <h2 className={cn("title")}>
        <Image src="/icons/notification.svg" width={24} height={24} alt="알림 아이콘" />
        알림
      </h2>
      <div className={cn("box")}>
        {allNotifications?.count ? (
          allNotifications?.crewNotificationResponse.map((notification) => {
            if (notification.notificationType === "SCHEDULE_INFO") {
              return (
                <ScheduleInfoNotification
                  key={notification.notificationId}
                  notification={notification}
                />
              );
            }

            if (notification.notificationType === "REQUEST") {
              return (
                <CoordinationNotification
                  key={notification.notificationId}
                  notification={notification}
                />
              );
            }

            return (
              <BaseNotification key={notification.notificationId} notification={notification} />
            );
          })
        ) : (
          <EmptyNotification title="아직 수신된 알람이 없어요." />
        )}
      </div>
    </div>
  );
}
