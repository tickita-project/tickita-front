import { MouseEvent, useRef } from "react";

import Image from "next/image";

import classNames from "classnames/bind";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import { useAcceptInvite } from "@/hooks/useAcceptInvite";

import { AcceptInviteType } from "@/types/type";

import styles from "./BaseNotification.module.scss";

const cn = classNames.bind(styles);

dayjs.locale("ko");

interface BaseNotificationProps {
  id: number;
  type: string;
  crewId: number;
  groupName: string;
  text: string;
  scheduleInfo?: {
    scheduleTime: string;
    place: string;
  };
  notificationDate: string;
  isChecked: boolean;
  onClick?: () => void;
}

export default function BaseNotification({
  id,
  crewId,
  type,
  groupName,
  text,
  scheduleInfo,
  notificationDate,
  isChecked,
  onClick,
}: BaseNotificationProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { mutate: inviteMutate } = useAcceptInvite();
  console.log(id);
  const handleNotificationClick = () => {
    if (!onClick) {
      return;
    }
    onClick();
  };

  const handleInviteAcceptClick = () => {
    const payload = {
      crewId,
      notificationId: id,
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
      {scheduleInfo && (
        <>
          <span className={cn("schedule-info")}>{scheduleInfo.scheduleTime}</span>
          <span className={cn("schedule-info")}>{scheduleInfo.place}</span>
        </>
      )}
      <div className={cn("button-box")}>
        {type === "INVITE" && (
          <button className={cn("accept-button")} type="button" onClick={handleInviteAcceptClick}>
            초대 수락
          </button>
        )}
        <p className={cn("notification-date")}>
          {dayjs(notificationDate).format("YY.MM.DD (ddd)")}
        </p>
      </div>
    </div>
  );
}
