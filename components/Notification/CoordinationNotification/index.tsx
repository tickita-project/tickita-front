import { useRouter } from "next/router";

import { CrewNotificationResponseType } from "@/types/type";

import BaseNotification from "../BaseNotification";

interface ScheduleInfoNotificationProps {
  scheduleDetail: CrewNotificationResponseType;
}

export default function CoordinationNotification({
  scheduleDetail,
}: ScheduleInfoNotificationProps) {
  const router = useRouter();

  const handleNotificationClick = () => {
    scheduleDetail.link && router.push(scheduleDetail.link); // TODO: 일정 상세 모달 열기, 일정 데이터 전달
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
