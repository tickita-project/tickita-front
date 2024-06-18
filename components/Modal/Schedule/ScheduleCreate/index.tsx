import Image from "next/image";

import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";

import { useDateStore } from "@/store/useDateStore";
import { useModalStore } from "@/store/useModalStore";

import styles from "./ScheduleCreateModal.module.scss";

const cn = classNames.bind(styles);

export default function ScheduleCreateModal() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
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

  const handleCreateSchedule = () => {
    // 일정 생성 구현
  };

  return (
    <div className={cn("container")}>
      <form className={cn("create-schedule-form")} onSubmit={handleSubmit(handleCreateSchedule)}>
        <input
          type="text"
          className={cn("schedule-name")}
          placeholder="무슨 일정인가요?"
          autoFocus
          {...register("scheduleTitle")}
        />
        <div className={cn("time-location-container")}>
          <div className={cn("time-container")}>
            <p>시간</p>
            <div className={cn("time")}>
              <div className={cn("start")}>
                <p className={cn("date")}>{scheduleStart?.format("YYYY-MM-DDTHH:mm:ss")}</p>
                <p className={cn("time")}></p>
              </div>

              <div className={cn("end")}>
                <p className={cn("date")}>{scheduleEnd?.format("YYYY-MM-DDTHH:mm:ss")}</p>
              </div>
            </div>
          </div>
          <div className={cn("location-container")}>
            <p>장소</p>
            <div className={cn("location")}>
              <Image src="/icons/location-icon.svg" width={20} height={20} alt="장소" />
              <input
                className={cn("location-input")}
                type="text"
                placeholder="(예시) 위워크 을지로점 10층 C미팅룸"
              />
            </div>
          </div>
        </div>
      </form>

      <button className={cn("close-modal")} type="button" onClick={handleCloseModal}>
        취소
      </button>
    </div>
  );
}
