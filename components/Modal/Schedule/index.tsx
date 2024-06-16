import classNames from "classnames/bind";
import { useShallow } from "zustand/react/shallow";

import Input from "@/components/Input";
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

  const handleSubmit = () => {
    //post 요청 추가
    handleCloseModal();
  };

  return (
    <div className={cn("container")}>
      <form className={cn("create-schedule-form")}>
        <input type="text" className={cn("schedule-name")} placeholder="무슨 일정인가요?" />
      </form>
      <button className={cn("close-modal")} type="button" onClick={handleCloseModal}>
        취소
      </button>
    </div>
  );
}
