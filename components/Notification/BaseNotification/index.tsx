import { MouseEvent, useRef, useState } from "react";

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
  const [isOver, setIsOver] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleNotificationClick = (e: MouseEvent<HTMLElement>) => {
    if (closeRef.current && closeRef.current.contains(e.target as Node)) {
      // 알림 삭제
      alert("TODO: 추후 알림 삭제 로직 추가 예정");
      return;
    }

    if (onClick) {
      // 각 알림마다 다른 이벤트 처리
      onClick();
      // TODO: isChecked 상태 변경 하는 함수 추가 예정
    }
  };

  const handleInviteAcceptClick = () => {
    alert("TODO: 그룹 초대 수락 로직 추가 예정");
  };

  return (
    <div
      className={cn("container", { checked: isChecked })}
      onMouseOver={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
      onClick={(e) => handleNotificationClick(e)}
    >
      <div className={cn("header")}>
        <div className={cn("label-box")}>
          <p className={cn("group-name")}>{groupName}</p>
          {!isChecked && <p className={cn("new-label")}>NEW</p>}
        </div>
        {isOver && (
          <button ref={closeRef} type="button" className={cn("close-button")}>
            <Image src="/icons/notification-close.svg" width={24} height={24} alt="알림 삭제" />
          </button>
        )}
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
