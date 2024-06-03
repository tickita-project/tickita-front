import { useState } from "react";

import Image from "next/image";

import classNames from "classnames/bind";

import styles from "./BaseNotification.module.scss";

const cn = classNames.bind(styles);

interface BaseNotificationProps {
  groupName: string;
  text: string;
  schduleInfo: string;
  notificationDate: string;
  isChecked: boolean;
  onClick?: () => void;
}

export default function BaseNotification({
  groupName,
  text,
  schduleInfo,
  notificationDate,
  isChecked,
  onClick,
}: BaseNotificationProps) {
  const [isOver, setIsOver] = useState(false);

  return (
    <div
      className={cn("container", { checked: isChecked })}
      onMouseOver={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
      onClick={() => onClick && onClick()}
    >
      <div className={cn("header")}>
        <div className={cn("label-box")}>
          <p className={cn("group-name")}>{groupName}</p>
          {!isChecked && <p className={cn("new-label")}>NEW</p>}
        </div>
        {isOver && (
          <button type="button" className={cn("close-button")}>
            <Image src="/icons/notification-close.svg" width={24} height={24} alt="알림 삭제" />
          </button>
        )}
      </div>

      <p className={cn("text")}>{text}</p>
      <p className={cn("schdule-info")}>{schduleInfo}</p>
      <p className={cn("notification-date")}>{notificationDate}</p>
    </div>
  );
}
