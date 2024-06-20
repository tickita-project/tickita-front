import { MODAL_TYPE } from "@/constants/modalType";
import { useModalStore } from "@/store/useModalStore";

import { CrewNotificationResponseType } from "@/types/type";

import BaseNotification from "../BaseNotification";

interface ScheduleInfoNotificationProps {
  scheduleDetail: CrewNotificationResponseType;
}

export default function ScheduleInfoNotification({
  scheduleDetail,
}: ScheduleInfoNotificationProps) {
  const { openModal } = useModalStore();

  const handleNotificationClick = () => {
    openModal(MODAL_TYPE.SCHEDULE_DETAILS, scheduleDetail?.scheduleInfo?.scheduleId); // TODO: 일정 상세 모달 열기, 일정 데이터 전달
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
