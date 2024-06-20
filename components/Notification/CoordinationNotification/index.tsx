import Router from "next/router";

import { PAGE_PATH } from "@/constants/pagePath";

import { CrewNotificationResponseType } from "@/types/type";

import BaseNotification from "../BaseNotification";

interface ScheduleInfoNotificationProps {
  notificationData: CrewNotificationResponseType;
}

export default function CoordinationNotification({
  notificationData,
}: ScheduleInfoNotificationProps) {
  const handleNotificationClick = () => {
    Router.push(PAGE_PATH.MY_PAGE);
  };

  return <BaseNotification notificationData={notificationData} onClick={handleNotificationClick} />;
}
