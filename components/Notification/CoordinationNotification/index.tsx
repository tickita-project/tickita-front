import { useRouter } from "next/router";

import BaseNotification from "../BaseNotification";

interface SchduleInfoType {
  id: number;
  type: string;
  groupName: string;
  text: string;
  schduleInfo: string;
  notificationDate: string;
  isChecked: boolean;
  link?: string;
}

interface SchduleInfoNotificationProps {
  schduleDetail: SchduleInfoType;
}

export default function CoordinationNotification({ schduleDetail }: SchduleInfoNotificationProps) {
  const router = useRouter();

  const handleNotificationClick = () => {
    schduleDetail.link && router.push(schduleDetail.link); // TODO: 일정 상세 모달 열기, 일정 데이터 전달
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
