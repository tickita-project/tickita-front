import { MouseEvent, useRef } from "react";

import Image from "next/image";

import classNames from "classnames/bind";

import styles from "./BaseNotification.module.scss";

const cn = classNames.bind(styles);

interface BaseNotificationProps {
  type: string;
  groupName: string;
  text: string;
  schduleInfo?: string;
  notificationDate: string;
  isChecked: boolean;
  onClick?: () => void;
}

export default function BaseNotification({
  type,
  groupName,
  text,
  schduleInfo,
  notificationDate,
  isChecked,
  onClick,
}: BaseNotificationProps) {
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
    <div className={cn("container", { checked: isChecked })} onClick={handleNotificationClick}>
      <div className={cn("header")}>
        <div className={cn("label-box")}>
          <p className={cn("group-name")}>{groupName}</p>
          {!isChecked && <p className={cn("new-label")}>NEW</p>}
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

      <p className={cn("text")}>{text}</p>
      <p className={cn("schdule-info")}>{schduleInfo}</p>
      <div className={cn("button-box")}>
        {type === "invite" && (
          <button className={cn("accept-button")} type="button" onClick={handleInviteAcceptClick}>
            초대 수락
          </button>
        )}
        <p className={cn("notification-date")}>{notificationDate}</p>
      </div>
    </div>
  );
}
