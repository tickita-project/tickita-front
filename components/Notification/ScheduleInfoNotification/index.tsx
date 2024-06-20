import { MODAL_TYPE } from "@/constants/modalType";
import { useModalStore } from "@/store/useModalStore";

import BaseNotification from "../BaseNotification";

interface ScheduleInfoType {
  id: number;
  type: string;
  groupName: string;
  text: string;
  scheduleInfo?: string;
  notificationDate: string;
  isChecked: boolean;
  link?: string;
}

interface ScheduleInfoNotificationProps {
  scheduleDetail: ScheduleInfoType;
}

export default function ScheduleInfoNotification({
  scheduleDetail,
}: ScheduleInfoNotificationProps) {
  const { openModal } = useModalStore();

  const handleNotificationClick = () => {
    openModal(MODAL_TYPE.SCHEDULE_DETAILS, scheduleDetail); // TODO: 일정 상세 모달 열기, 일정 데이터 전달
  };

  return (
    <BaseNotification
      type={scheduleDetail.type}
      groupName={scheduleDetail.groupName}
      text={scheduleDetail.text}
      scheduleInfo={scheduleDetail.scheduleInfo}
      notificationDate={scheduleDetail.notificationDate}
      isChecked={scheduleDetail.isChecked}
      onClick={handleNotificationClick}
    />
  );
}
