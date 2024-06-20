import { useState, useEffect } from "react";

import Image from "next/image";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";

import { getGroupInfo } from "@/apis/apis";
import { useGetGroupInfo } from "@/hooks/useGetGroupInfo";
import { useGetGroupList } from "@/hooks/useGetGroupList";
import { useDateStore } from "@/store/useDateStore";
import { useModalStore } from "@/store/useModalStore";

import { SchedulePostDataType } from "@/types/type";

import styles from "./ScheduleCreateModal.module.scss";

const cn = classNames.bind(styles);

export default function ScheduleCreateModal() {
  const queryClient = useQueryClient();
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
  const { data: groupList } = useGetGroupList();

  // 선택된 그룹 ID 상태
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [groupInfo, setGroupInfo] = useState<any>(null);

  useEffect(() => {
    if (selectedGroupId !== null) {
      // 선택된 그룹 ID가 있을 때만 그룹 정보를 가져옴
      const fetchGroupInfo = async () => {
        const data = await getGroupInfo(selectedGroupId);
        setGroupInfo(data);
      };
      fetchGroupInfo();
    }
  }, [selectedGroupId]);

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
            <input type="text" maxLength={10} {...register("location")} />
          </div>
        </div>
        <div>
          <p className={cn("label")}>추가 내용</p>
          <textarea maxLength={50} {...register("description")}></textarea>
        </div>
        <div>
          <p className={cn("label")}>그룹 선택</p>
          <select onChange={(e) => setSelectedGroupId(Number(e.target.value))} defaultValue="">
            <option value="" disabled>
              그룹을 선택하세요
            </option>
            {groupList?.slice(7).map((group) => (
              <option key={group.crewId} value={group.crewId}>
                {group.crewName}
              </option>
            ))}
          </select>
        </div>
        {
          <div>
            <p className={cn("label")}>참가자 선택</p>
            <div className={cn("members")}>
              {selectedGroupId &&
                groupInfo &&
                groupInfo.crewMemberInfoResponses?.map((member: any) => (
                  <label key={member.accountId}>
                    <input type="checkbox" value={member.accountId} {...register("participants")} />
                    {member.nickName}
                  </label>
                ))}
            </div>
          </div>
        }
        <button type="submit" disabled={!isValid}>
          일정 생성
        </button>
      </form>
    </div>
  );
}
