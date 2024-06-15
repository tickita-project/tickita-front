import { useRef } from "react";

import classNames from "classnames/bind";
import { Dayjs } from "dayjs";
import { useShallow } from "zustand/react/shallow";

import { useDateStore } from "@/store/useDateStore";
import { useModalStore } from "@/store/useModalStore";

import styles from "./ScheduleModal.module.scss";

const cn = classNames.bind(styles);

interface ScheduleModalProps {
  mode: "create" | "edit" | "detail";
}

export default function ScheduleModal({ mode }: ScheduleModalProps) {
  const modalContainerRef = useRef(null);
  const { scheduleStart, scheduleEnd } = useDateStore(
    useShallow((state) => ({
      scheduleStart: state.scheduleStart,
      scheduleEnd: state.scheduleEnd,
    })),
  );
  const { closeModal } = useModalStore();

  return (
    <div className={cn("container")} ref={modalContainerRef}>
      스케줄 모달
    </div>
  );
}
