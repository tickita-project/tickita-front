import { MouseEvent, useRef } from "react";

import Image from "next/image";

import classNames from "classnames/bind";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import { useAcceptInvite } from "@/hooks/useAcceptInvite";

import { AcceptInviteType, CrewNotificationResponseType } from "@/types/type";

import styles from "./BaseNotification.module.scss";

const cn = classNames.bind(styles);

dayjs.locale("ko");

interface BaseNotificationProps extends CrewNotificationResponseType {
  onClick?: () => void;
}

export default function BaseNotification({
  notificationId,
  crewId,
  notificationType,
  crewName,
  content,
  scheduleInfo,
  localDateTime,
  isChecked,
  onClick,
}: BaseNotificationProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { mutate: inviteMutate } = useAcceptInvite();

  const handleNotificationClick = () => {
    if (!onClick) {
      return;
    }
    onClick();
  };

  const handleInviteAcceptClick = () => {
    const payload = {
      crewId,
      notificationId,
      crewAccept: "ACCEPT",
    } as AcceptInviteType;

    inviteMutate(payload, {
      onSuccess: () => {
        alert("그룹 초대 수락 성공");
      },
      onError: (error) => {
        alert(error);
      },
    });
  };

  const handleDeleteButtonClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    alert("TODO: 추후 알림 삭제 로직 추가 예정");
  };

  return (
    <div className={cn("container", { checked: isChecked })} onClick={handleNotificationClick}>
      <div className={cn("header")}>
        <div className={cn("label-box")}>
          <p className={cn("group-name")}>{crewName}</p>
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

      <p className={cn("text")}>{content}</p>
      {scheduleInfo && (
        <>
          <span className={cn("schedule-info")}>
            {dayjs(scheduleInfo.scheduleTime).format("YY.MM.DD (ddd) HH:mm")},
          </span>
          <span className={cn("schedule-info")}>{scheduleInfo.place}</span>
        </>
      )}
      <div className={cn("button-box")}>
        {notificationType === "INVITE" && (
          <button className={cn("accept-button")} type="button" onClick={handleInviteAcceptClick}>
            초대 수락
          </button>
        )}
        <p className={cn("notification-date")}>
          {dayjs(localDateTime).format("YY.MM.DD (ddd) HH:mm")}
        </p>
      </div>
    </div>
  );
}
