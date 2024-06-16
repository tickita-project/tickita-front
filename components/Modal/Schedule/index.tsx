import classNames from "classnames/bind";
import { useShallow } from "zustand/react/shallow";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useDateStore } from "@/store/useDateStore";
import { useModalStore } from "@/store/useModalStore";

import styles from "./ScheduleModal.module.scss";

const cn = classNames.bind(styles);

interface ScheduleModalProps {
  mode: "create" | "edit" | "detail";
}

export default function ScheduleModal({ mode }: ScheduleModalProps) {
  const { closeModal } = useModalStore();
  const modalContainerRef = useOutsideClick<HTMLDivElement>(closeModal);
  const { scheduleStart, scheduleEnd } = useDateStore(
    useShallow((state) => ({
      scheduleStart: state.scheduleStart,
      scheduleEnd: state.scheduleEnd,
    })),
  );

  return (
    <div className={cn("container")} ref={modalContainerRef}>
      스케줄 모달
    </div>
  );
}
