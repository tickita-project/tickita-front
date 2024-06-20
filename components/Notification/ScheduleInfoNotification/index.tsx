import { MODAL_TYPE } from "@/constants/modalType";
import { useModalStore } from "@/store/useModalStore";

import { NotificationListType } from "@/types/type";

import BaseNotification from "../BaseNotification";

interface ScheduleInfoNotificationProps {
  notification: NotificationListType;
}

export default function ScheduleInfoNotification({ notification }: ScheduleInfoNotificationProps) {
  const { openModal } = useModalStore();

  const handleNotificationClick = () => {
    openModal(MODAL_TYPE.SCHEDULE_DETAILS, notification); // TODO: 일정 상세 모달 열기, 일정 데이터 전달
  };

  return <BaseNotification notification={notification} onClick={handleNotificationClick} />;
}
