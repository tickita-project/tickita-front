import { useState } from "react";

import Image from "next/image";

import classNames from "classnames/bind";

import { useGetAllNotification } from "@/hooks/useGetAllNotification";

import styles from "./NotificationPopup.module.scss";
import BaseNotification from "../Notification/BaseNotification";
import EmptyNotification from "../Notification/EmptyNotification";

const cn = classNames.bind(styles);

export default function NotificationPopup() {
  const [isClicked, setIsClicked] = useState(false);

  const { data: notificationInfo } = useGetAllNotification();

  const getNotificationCount = () => {
    if (!notificationInfo) return;

    return notificationInfo.count < 10 ? notificationInfo.count : "+";
  };

  const handleBellClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className={cn("container")}>
      <figure onClick={handleBellClick} className={cn("notification-bell")}>
        {notificationInfo?.count && (
          <figcaption className={cn("notification-count")}>{getNotificationCount()}</figcaption>
        )}
        <Image src="/icons/notification-bell.svg" width={26} height={20} alt="알림 종" priority />
      </figure>
      {isClicked && (
        <div className={cn("notification-popup")}>
          {notificationInfo?.crewNotificationResponse.length ? (
            notificationInfo.crewNotificationResponse?.map((notification) => (
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
