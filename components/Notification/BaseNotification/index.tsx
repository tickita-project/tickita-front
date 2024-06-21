import { MouseEvent } from "react";

import Image from "next/image";

import classNames from "classnames/bind";

import { useAcceptInvite } from "@/hooks/useAcceptInvite";
import { useCheckNotification } from "@/hooks/useCheckNotification";
import { useDeleteNotification } from "@/hooks/useDeleteNotification";
import formatKoreanDateTime from "@/utils/formatKoreanDateTime";

import { AcceptInviteType, NotificationInfoType } from "@/types/type";

import styles from "./BaseNotification.module.scss";

const cn = classNames.bind(styles);

interface BaseNotificationProps {
  notificationData: NotificationInfoType;
  onClick?: () => void;
}

export default function BaseNotification({ notificationData, onClick }: BaseNotificationProps) {
  const {
    notificationId,
    crewId,
    notificationType,
    labelColor,
    crewName,
    content,
    scheduleInfo,
    localDateTime,
    isChecked,
  } = notificationData;

  const { mutate: inviteMutate } = useAcceptInvite();
  const { mutate: checkNotificationMutate } = useCheckNotification();
  const { mutate: deleteNotificationMutate } = useDeleteNotification();

  const handleNotificationClick = () => {
    if (!isChecked) {
      // 알림 확인 로직
      checkNotificationMutate(notificationId);
    }

    if (!onClick) {
      // 추가적인 이벤트가 없는 경우 리턴
      return;
    }

    onClick();
  };

  const handleInviteAcceptClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();

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

    deleteNotificationMutate(notificationId, {
      onError: (error) => {
        alert(error);
      },
    });
  };

  return (
    <div className={cn("container", { checked: isChecked })} onClick={handleNotificationClick}>
      <div className={cn("header")}>
        <div className={cn("label-box")}>
          <p className={cn("group-name")} style={{ backgroundColor: labelColor }}>
            {crewName}
          </p>
          {!isChecked && <p className={cn("new-label")}>NEW</p>}
        </div>

        <button onClick={handleDeleteButtonClick} type="button" className={cn("close-button")}>
          <Image src="/icons/close-icon.svg" width={24} height={24} alt="알림 삭제" />
        </button>
      </div>

      <p className={cn("text")}>{content}</p>
      {scheduleInfo && <span className={cn("schedule-info")}>{scheduleInfo.title}</span>}
      <div className={cn("button-box")}>
        {notificationType === "INVITE" && (
          <button className={cn("accept-button")} type="button" onClick={handleInviteAcceptClick}>
            초대 수락
          </button>
        )}
        <p className={cn("notification-date")}>{formatKoreanDateTime(localDateTime)}</p>
      </div>
    </div>
  );
}
