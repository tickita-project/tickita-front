import { useModalStore } from "@/store/useModalStore";

import BaseNotification from "../BaseNotification";

interface SchduleInfoType {
  id: number;
  type: string;
  groupName: string;
  text: string;
  schduleInfo: string;
  notificationDate: string;
  isChecked: boolean;
}

interface SchduleInfoNotificationProps {
  schduleDetail: SchduleInfoType;
}

export default function SchduleInfoNotification({ schduleDetail }: SchduleInfoNotificationProps) {
  const { openModal } = useModalStore();

  const handleNotificationClick = () => {
    openModal("notificationDetail", schduleDetail); // 일정 상세 모달, 일정 데이터 전달
  };

  return (
    <BaseNotification
      groupName={schduleDetail.groupName}
      text={schduleDetail.text}
      schduleInfo={schduleDetail.schduleInfo}
      notificationDate={schduleDetail.notificationDate}
      isChecked={schduleDetail.isChecked}
      onClick={handleNotificationClick}
    />
  );
}
