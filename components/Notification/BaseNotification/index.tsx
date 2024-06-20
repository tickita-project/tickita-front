import { MouseEvent, useRef } from "react";

import Image from "next/image";

import classNames from "classnames/bind";

import { changeLocalFullTime, changeLocalTime } from "@/utils/changeLocalTime";

import { NotificationListType } from "@/types/type";

import styles from "./BaseNotification.module.scss";

const cn = classNames.bind(styles);

interface BaseNotificationProps {
  notification: NotificationListType;
  onClick?: () => void;
}

export default function BaseNotification({ notification, onClick }: BaseNotificationProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleNotificationClick = () => {
    if (!onClick) {
      return;
    }
    onClick();
  };

  const handleInviteAcceptClick = () => {
    alert("TODO: 그룹 초대 수락 로직 추가 예정");
  };

  const handleDeleteButtonClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    alert("TODO: 추후 알림 삭제 로직 추가 예정");
  };

  return (
    <div
      className={cn("container", { checked: notification.isChecked })}
      onClick={handleNotificationClick}
    >
      <div className={cn("header")}>
        <div className={cn("label-box")}>
          <p className={cn("group-name")}>{notification.crewName}</p>
          {!notification.isChecked && <p className={cn("new-label")}>NEW</p>}
        </div>

        <button
          onClick={handleDeleteButtonClick}
          ref={closeRef}
          type="button"
          className={cn("close-button")}
        >
          <Image src="/icons/close-icon.svg" width={24} height={24} alt="알림 삭제" />
        </button>
      </div>

      <p className={cn("text")}>{notification.content}</p>
      {notification.scheduleInfo && (
        <div className={cn("schedule-info")}>
          {notification.scheduleInfo.map((schedule, index) => (
            <p key={index}>
              {changeLocalFullTime(schedule.scheduleTime)}, {schedule.place}
            </p>
          ))}
        </div>
      )}
      <div className={cn("button-box")}>
        {notification.notificationType === "INVITE" && (
          <button className={cn("accept-button")} type="button" onClick={handleInviteAcceptClick}>
            초대 수락
          </button>
        )}
        <p className={cn("notification-date")}>{changeLocalTime(notification.localDateTime)}</p>
      </div>
    </div>
  );
}
