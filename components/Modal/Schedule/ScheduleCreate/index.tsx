import Image from "next/image";

import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";

import { useDateStore } from "@/store/useDateStore";
import { useModalStore } from "@/store/useModalStore";

import { SchedulePostDataType } from "@/types/type";

import styles from "./ScheduleCreateModal.module.scss";

const cn = classNames.bind(styles);

export default function ScheduleCreateModal() {
  const { closeModal } = useModalStore();
  const { scheduleStart, scheduleEnd, setScheduleStart, setScheduleEnd } = useDateStore(
    useShallow((state) => ({
      scheduleStart: state.scheduleStart,
      scheduleEnd: state.scheduleEnd,
      setScheduleStart: state.setScheduleStart,
      setScheduleEnd: state.setScheduleEnd,
    })),
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SchedulePostDataType>({
    defaultValues: {
      startDateTime: scheduleStart?.format("YYYY-MM-DDTHH:mm"),
      endDateTime: scheduleEnd?.format("YYYY-MM-DDTHH:mm"),
    },
  });

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
      <button className={cn("close-button")} type="button" onClick={handleCloseModal}>
        <Image src="/icons/close-icon.svg" alt="모달 닫기" width={30} height={30} />
      </button>
      <form className={cn("create-schedule-form")} onSubmit={handleSubmit(handleCreateSchedule)}>
        <input
          type="text"
          className={cn("schedule-name")}
          placeholder="무슨 일정인가요?"
          autoFocus
          {...register("title")}
        />
        <div className={cn("time-location-container")}>
          <div className={cn("time-container")}>
            <p>시간</p>
            <div className={cn("time")}>
              <div className={cn("start")}>
                <p className={cn("time")}></p>
              </div>

              <div className={cn("end")}>
                <p className={cn("date")}>{scheduleEnd?.format("YYYY-MM-DDTHH:mm:00.000Z")}</p>
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
    </div>
  );
}
