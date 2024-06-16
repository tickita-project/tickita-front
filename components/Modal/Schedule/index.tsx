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
  const { scheduleStart, scheduleEnd, setScheduleStart, setScheduleEnd } = useDateStore(
    useShallow((state) => ({
      scheduleStart: state.scheduleStart,
      scheduleEnd: state.scheduleEnd,
      setScheduleStart: state.setScheduleStart,
      setScheduleEnd: state.setScheduleEnd,
    })),
  );

  const handleCloseModal = () => {
    closeModal();
    setScheduleStart(null);
    setScheduleEnd(null);
  };

  const modalContainerRef = useOutsideClick<HTMLDivElement>(handleCloseModal);

  return (
    <div className={cn("container")} ref={modalContainerRef}>
      스케줄 모달
    </div>
  );
}
