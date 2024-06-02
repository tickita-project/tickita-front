import classNames from "classnames/bind";

import styles from "./Notification.module.scss";

const cn = classNames.bind(styles);

interface NotificationProps {
  groupName: string;
  groupColor: string;
  text: string;
  schduleInfo: string;
  notificationDate: string;
  isChecked: boolean;
}

export default function Notification() {
  return (
    <div className={cn("container")}>
      <div className={cn("label-box")}>
        <p className={cn("group-name")}>코드잇 4기 11팀</p>
        <p className={cn("checked")}>NEW</p>
      </div>
      <p className={cn("text")}>
        그룹 참여가 확정되었습니다.그룹 참여가 확정되었습니다.그룹 참여가 확정되었습니다.그룹 참여가
        확정되었습니다.그룹 참여가 확정되었습니다.확정되었습니다.그룹 참여가 확정되었습니다.
      </p>
      <p className={cn("schdule-info")}>24.05.23 (금) 14:00, 하남돼지집</p>
      <p className={cn("notification-date")}>24.06.02 (일)</p>
    </div>
  );
}
