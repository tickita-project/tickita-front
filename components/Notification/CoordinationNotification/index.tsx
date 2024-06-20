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
      id={scheduleDetail.notificationId}
      crewId={scheduleDetail.crewId}
      type={scheduleDetail.notificationType}
      groupName={scheduleDetail.crewName}
      text={scheduleDetail.content}
      scheduleInfo={scheduleDetail.scheduleInfo}
      notificationDate={scheduleDetail.localDateTime}
      isChecked={scheduleDetail.isChecked}
      onClick={handleNotificationClick}
    />
  );
}
