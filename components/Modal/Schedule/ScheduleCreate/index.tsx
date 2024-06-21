import { useState, useEffect } from "react";

import Image from "next/image";

import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";

import { getGroupInfo } from "@/apis/apis";
import { useGetGroupList } from "@/hooks/useGetGroupList";
import { useDateStore } from "@/store/useDateStore";
import { useModalStore } from "@/store/useModalStore";

import { GroupInfoType, SchedulePostDataType } from "@/types/type";

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
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SchedulePostDataType>({
    defaultValues: {
      startDateTime: scheduleStart?.format("YYYY-MM-DDTHH:mm"),
      endDateTime: scheduleEnd?.format("YYYY-MM-DDTHH:mm"),
    },
  });
  const { data: groupList } = useGetGroupList();
  const crewIdWatch = watch("crewId");
  const [groupInfo, setGroupInfo] = useState<GroupInfoType | null>(null);

  useEffect(() => {
    //그룹이 선택되면, 아래 코드가 실행되도록 useEffect 설정
    if (!crewIdWatch) {
      return;
    }
    const fetchGroupInfo = async () => {
      const data = await getGroupInfo(crewIdWatch);
      setGroupInfo(data);
    };
    fetchGroupInfo();
  }, [crewIdWatch]);

  const handleCloseModal = () => {
    closeModal();
    setScheduleStart(null);
    setScheduleEnd(null);
  };

  const handleCreateSchedule = (data: SchedulePostDataType) => {
    // 일정 생성 구현
    console.log(data);
  };

  return (
    <div className={cn("container")}>
      <button className={cn("close-button")} type="button" onClick={handleCloseModal}>
        <Image src="/icons/close-icon.svg" alt="모달 닫기" width={30} height={30} />
      </button>
      <form className={cn("create-schedule-form")} onSubmit={handleSubmit(handleCreateSchedule)}>
        <input
          type="text"
          className={cn("title")}
          placeholder="무슨 일정인가요?"
          autoFocus
          {...register("title", { required: true })}
        />
        <div className={cn("time-place")}>
          <div className={cn("time-container")}>
            <p className={cn("label")}>시간</p>
            <div className={cn("time")}>
              <div className={cn("start")}>
                <p className={cn("date")}>{scheduleStart?.format("YYYY.MM.DD")}</p>
              </div>
              <p> - </p>
              <div className={cn("end")}>
                <p className={cn("date")}>{scheduleEnd?.format("YYYY.MM.DD")}</p>
              </div>
            </div>
          </div>
          <div className={cn("place")}>
            <p className={cn("label")}>장소</p>
            <div className={cn("place-input-container")}>
              <Image src="/icons/location-icon.svg" alt="장소" width={20} height={20} />
              <input
                className={cn("place-input")}
                type="text"
                maxLength={20}
                placeholder="(선택) 위워크 10층 미팅룸"
                {...register("location")}
              />
            </div>
          </div>
        </div>
        <div className={cn("description")}>
          <p className={cn("label")}>추가 내용</p>
          <textarea
            className={cn("text")}
            maxLength={50}
            placeholder="(선택) 설명을 입력해주세요"
            {...register("description")}
          />
        </div>
        <div className={cn("group")}>
          <p className={cn("label")}>그룹 선택</p>
          <select className={cn("group-select")} {...register("crewId", { required: true })}>
            <option className={cn("default-option")} value="" disabled>
              그룹을 선택하세요
            </option>
            {groupList?.map((group) => (
              <option key={group.crewId} value={group.crewId} className={cn("option")}>
                <div
                  className={cn("group-color")}
                  style={{ backgroundColor: `${group.labelColor}` }}
                />
                <p className={cn("group-name")}>{group.crewName}</p>
              </option>
            ))}
          </select>
        </div>
        <div className={cn("member-container")}>
          <p className={cn("label")}>참가자 선택</p>
          <div className={cn("members")}>
            {crewIdWatch &&
              groupInfo?.crewMembers.map((member: any) => (
                <label className={cn("member-checkbox")} key={member.accountId}>
                  <input type="checkbox" value={member.accountId} {...register("participants")} />
                  {member.nickName}
                </label>
              ))}
          </div>
        </div>
        <button type="submit" disabled={!isValid} className={cn("")}>
          일정 생성
        </button>
      </form>
    </div>
  );
}
