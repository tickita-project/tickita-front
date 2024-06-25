import { MODAL_TYPE } from "@/constants/modalType";
import { useModalStore } from "@/store/useModalStore";

import { NotificationInfoType } from "@/types/type";

import BaseNotification from "../BaseNotification";

interface ScheduleInfoNotificationProps {
  notificationData: NotificationInfoType;
}

export default function ScheduleInfoNotification({
  notificationData,
}: ScheduleInfoNotificationProps) {
  const { openModal } = useModalStore();

  const handleNotificationClick = () => {
    openModal(MODAL_TYPE.SCHEDULE_DETAILS, notificationData?.scheduleInfo?.scheduleId); // TODO: 일정 상세 모달 열기, 일정 데이터 전달
  };

  return <BaseNotification notificationData={notificationData} onClick={handleNotificationClick} />;
}
