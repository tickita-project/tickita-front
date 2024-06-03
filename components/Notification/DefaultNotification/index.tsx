import BaseNotification from "../BaseNotification";

interface SchduleInfo {
  groupName: string;
  text: string;
  schduleInfo: string;
  notificationDate: string;
  isChecked: boolean;
}

export default function DefaultNotification(schduleInfo: SchduleInfo) {
  return (
    <BaseNotification
      groupName={schduleInfo.groupName}
      text={schduleInfo.text}
      schduleInfo={schduleInfo.schduleInfo}
      notificationDate={schduleInfo.notificationDate}
      isChecked={schduleInfo.isChecked}
    />
  );
}
