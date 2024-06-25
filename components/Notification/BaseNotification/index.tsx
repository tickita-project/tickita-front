import { MouseEvent } from "react";

import Image from "next/image";
import Router from "next/router";

import classNames from "classnames/bind";

import { useAcceptInvite } from "@/hooks/useAcceptInvite";
import { useCheckNotification } from "@/hooks/useCheckNotification";
import { useDeleteNotification } from "@/hooks/useDeleteNotification";
import useToast from "@/hooks/useToast";
import { formatKoreanDate } from "@/utils/formatKoreanDateTime";

import { AcceptInviteType, CheckNotificationType, NotificationInfoType } from "@/types/type";

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
    alarmType,
  } = notificationData;

  const { successToast, errorToast } = useToast();
  const { mutate: inviteMutate } = useAcceptInvite();
  const { mutate: checkNotificationMutate } = useCheckNotification();
  const { mutate: deleteNotificationMutate } = useDeleteNotification();

  const handleNotificationClick = () => {
    checkNotification();

    if (!onClick) {
      // 추가적인 이벤트가 없는 경우 리턴
      return;
    }

    onClick();
  };

  const checkNotification = () => {
    if (isChecked) {
      // 이미 확인한 알람이면 리턴
      return;
    }

    const payload = {
      notificationId,
      alarmType,
    } as CheckNotificationType;

    checkNotificationMutate(payload);
  };

  const handleInviteAcceptClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    const payload = {
      crewId,
      notificationId,
      inviteType: "ACCEPT",
    } as AcceptInviteType;

    inviteMutate(payload, {
      onSuccess: (response) => {
        successToast("그룹에 합류하셨습니다!");
        Router.push(`/group/${response.crewId}`);
      },
      onError: () => {
        errorToast("그룹 합류 중 에러가 발생하였습니다!");
      },
    });
  };

  const handleDeleteButtonClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    deleteNotificationMutate(notificationId, {
      onSuccess: () => {
        successToast("알림이 삭제되었습니다.");
      },
      onError: () => {
        errorToast("알림 삭제에 실패하였습니다.");
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
        <p className={cn("notification-date")}>{formatKoreanDate(localDateTime)}</p>
      </div>
    </div>
  );
}
