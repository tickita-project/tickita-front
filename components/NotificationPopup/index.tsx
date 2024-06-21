import { useState } from "react";

import Image from "next/image";

import classNames from "classnames/bind";

import { useGetAllNotification } from "@/hooks/useGetAllNotification";

import styles from "./NotificationPopup.module.scss";
import BaseNotification from "../Notification/BaseNotification";
import EmptyNotification from "../Notification/EmptyNotification";

const cn = classNames.bind(styles);

export default function NotificationPopup() {
  const [isPopupView, setIsPopupView] = useState(false);

  const { data } = useGetAllNotification();

  if (!data) {
    return;
  }

  const { count, crewNotificationResponse: notificationList } = data;

  const handleBellClick = () => {
    setIsPopupView(!isPopupView);
  };

  return (
    <div className={cn("container")}>
      <figure onClick={handleBellClick} className={cn("notification-bell")}>
        {count > 0 && (
          <figcaption className={cn("notification-count")}>{count < 10 ? count : "9+"}</figcaption>
        )}
        <Image src="/icons/notification-bell.svg" width={26} height={20} alt="알림 종" priority />
      </figure>
      {isPopupView && (
        <div className={cn("notification-popup")}>
          {notificationList.length ? (
            notificationList.map((notification) => (
              <BaseNotification key={notification.notificationId} notificationData={notification} />
            ))
          ) : (
            <EmptyNotification title="알림이 없어요" />
          )}
        </div>
      )}
    </div>
  );
}
