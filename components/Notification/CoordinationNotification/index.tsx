import Router from "next/router";

import { PAGE_PATH } from "@/constants/pagePath";

import { CrewNotificationResponseType } from "@/types/type";

import BaseNotification from "../BaseNotification";

interface ScheduleInfoNotificationProps {
  scheduleDetail: CrewNotificationResponseType;
}

export default function CoordinationNotification({
  scheduleDetail,
}: ScheduleInfoNotificationProps) {
  const handleNotificationClick = () => {
    Router.push(PAGE_PATH.MY_PAGE);
  };

  return (
    <BaseNotification
      notificationId={scheduleDetail.notificationId}
      crewId={scheduleDetail.crewId}
      notificationType={scheduleDetail.notificationType}
      crewName={scheduleDetail.crewName}
      content={scheduleDetail.content}
      scheduleInfo={scheduleDetail.scheduleInfo}
      localDateTime={scheduleDetail.localDateTime}
      isChecked={scheduleDetail.isChecked}
      onClick={handleNotificationClick}
    />
  );
}
