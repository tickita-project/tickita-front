import React, { useState, useEffect } from "react";

import Image from "next/image";

import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";

import { getGroupInfo } from "@/apis/apis";
import { useCreateSchedule } from "@/hooks/useCreateSchedule";
import { useGetGroupList } from "@/hooks/useGetGroupList";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useDateStore } from "@/store/useDateStore";
import { useModalStore } from "@/store/useModalStore";

import { GroupMemberInfoType, GroupType, SchedulePostDataType } from "@/types/type";

import styles from "./ScheduleCreateModal.module.scss";

const cn = classNames.bind(styles);

export default function ScheduleCreateModal() {
  const [isGroupListVisible, setIsGroupListVisible] = useState(false);
  const [groupMembers, setGroupMembers] = useState<GroupMemberInfoType[] | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<GroupType | null>(null);

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
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<SchedulePostDataType>({
    defaultValues: {
      startDateTime: scheduleStart?.toISOString(),
      endDateTime: scheduleEnd?.toISOString(),
    },
  });
  const { data: groupList } = useGetGroupList();
  const { data: userInfo } = useGetUserInfo();

  const [crewIdWatch, locationWatch = "", descriptionWatch = ""] = watch([
    "crewId",
    "location",
    "description",
  ]);
  const { mutate, isPending } = useCreateSchedule(crewIdWatch);

  const handleGroupSelect = (group: GroupType) => {
    setSelectedGroup(group);
    setValue("crewId", group.crewId);
    setIsGroupListVisible(false);
  };

  const handleCloseModal = () => {
    closeModal();
    setScheduleStart(null);
    setScheduleEnd(null);
  };

  const handleCreateSchedule = async (data: any) => {
    const newScheduleData: SchedulePostDataType = {
      ...data,
      participants: data.participants?.map((participant: string) => JSON.parse(participant)) || [],
    };
    mutate(newScheduleData, {
      onSuccess: () => {
        closeModal();
      },
      onError: (error) => {
        alert(error);
      },
    });
  };

  useEffect(() => {
    setValue("participants", []);
    if (!crewIdWatch) {
      return;
    }

    const fetchGroupInfo = async () => {
      const data = await getGroupInfo(crewIdWatch);
      setGroupMembers(data.crewMembers);
    };

    fetchGroupInfo();
  }, [crewIdWatch]);

  return (
    <div className={cn("container")}>
      <button className={cn("close-button")} type="button" onClick={handleCloseModal}>
        <Image src="/icons/close-icon.svg" alt="모달 닫기" width={30} height={30} />
      </button>
      <form className={cn("create-schedule-form")} onSubmit={handleSubmit(handleCreateSchedule)}>
        <div className={cn("title-container")}>
          <p>*</p>
          <input
            type="text"
            className={cn("title")}
            placeholder="무슨 일정인가요?"
            autoFocus
            {...register("title", { required: true })}
          />
        </div>

        <div className={cn("time-place")}>
          <div className={cn("time-container")}>
            <p className={cn("label")}>시간</p>
            <div className={cn("time")}>
              <div className={cn("start")}>
                <p className={cn("date")}>{scheduleStart?.format("YYYY.MM.DD HH:mm")}</p>
              </div>
              <p> - </p>
              <div className={cn("end")}>
                <p className={cn("date")}>{scheduleEnd?.format("YYYY.MM.DD HH:mm")}</p>
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
                maxLength={19}
                placeholder="(선택) 위워크 10층 미팅룸"
                {...register("location")}
              />
              <p className={cn("location-length")}>
                <b>{locationWatch.length} </b> / 20
              </p>
            </div>
          </div>
        </div>
        <div className={cn("description")}>
          <p className={cn("label")}>추가 내용</p>
          <textarea
            className={cn("text")}
            maxLength={79}
            placeholder="(선택) 설명을 입력해주세요"
            {...register("description")}
          />
          <p className={cn("text-length")}>
            <b>{descriptionWatch.length}</b> / 80
          </p>
        </div>
        <div className={cn("group")}>
          <p className={cn("label")}>
            <span>* </span>
            그룹 선택
          </p>
          <div
            className={cn("group-select")}
            onClick={() => setIsGroupListVisible((prev) => !prev)}
          >
            {selectedGroup ? (
              <div className={cn("selected-group")}>
                <div
                  className={cn("group-color")}
                  style={{ backgroundColor: selectedGroup.labelColor }}
                />
                <p className={cn("group-name")}>{selectedGroup.crewName}</p>
              </div>
            ) : (
              <p className={cn("placeholder")}>그룹을 선택하세요</p>
            )}
          </div>
          {isGroupListVisible && (
            <div className={cn("group-container")}>
              {groupList ? (
                groupList.map((group) => (
                  <div
                    key={group.crewId}
                    className={cn("group-list")}
                    onClick={() => handleGroupSelect(group)}
                  >
                    <div
                      className={cn("group-color")}
                      style={{ backgroundColor: group.labelColor }}
                    />
                    <p className={cn("group-name")}>{group.crewName}</p>
                  </div>
                ))
              ) : (
                <div>그룹을 먼저 만들어주세요</div>
              )}
            </div>
          )}
        </div>
        <div className={cn("member-container")}>
          <p className={cn("label")}>참가자 선택</p>
          <div className={cn("members")}>
            {groupMembers?.length === 1 ? (
              <p className={cn("alone-msg")}>그룹에 팀원이 없습니다.</p>
            ) : (
              groupMembers?.map(
                (member) =>
                  member.accountId !== userInfo?.accountId && (
                    <React.Fragment key={member.accountId}>
                      <input
                        id={`member-${member.accountId}`}
                        className={cn("member-checkbox")}
                        type="checkbox"
                        value={JSON.stringify({
                          accountId: member.accountId,
                          nickName: member.nickName,
                        })}
                        {...register("participants")}
                      />
                      <label htmlFor={`member-${member.accountId}`} className={cn("member-label")}>
                        {member.nickName}
                      </label>
                    </React.Fragment>
                  ),
              )
            )}
          </div>
        </div>
        <button type="submit" disabled={!isValid || isPending} className={cn("submit")}>
          일정 등록
        </button>
      </form>
    </div>
  );
}
