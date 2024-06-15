import classNames from "classnames/bind";

import styles from "./ScheduleModal.module.scss";

const cn = classNames.bind(styles);

interface ScheduleModalProps {
  mode: "create" | "edit" | "detail";
}

export default function ScheduleModal({ mode }: ScheduleModalProps) {
  return <div className={cn("container")}>스케줄 모달</div>;
}
