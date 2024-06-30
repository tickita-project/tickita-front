import Image from "next/image";

import classNames from "classnames/bind";
import dayjs from "dayjs";

import { deleteSchedule } from "@/apis/apis";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useModalStore } from "@/store/useModalStore";

import styles from "./ScheduleDetailModal.module.scss";

const cn = classNames.bind(styles);

export default function ScheduleDetailModal() {
  const { closeModal, data: scheduleDetail } = useModalStore();
  const { data: userInfo } = useGetUserInfo();

  const place = scheduleDetail?.location ? scheduleDetail.location : "정해진 장소가 없어요.";
  const description = scheduleDetail?.description
    ? scheduleDetail.description
    : "입력된 설명이 없어요.";
  const start = dayjs(scheduleDetail?.startDateTime).format("YYYY.MM.DD HH:mm");
  const end = dayjs(scheduleDetail?.endDateTime).format("YYYY.MM.DD HH:mm");

  const handleDelete = async () => {
    const data = await deleteSchedule(scheduleDetail);
    if (data) {
      closeModal();
    }
  };

  return (
    <div className={cn("container")}>
      <div className={cn("header")}>
        <div className={cn("group")}>
          <div
            className={cn("color")}
            style={{ backgroundColor: scheduleDetail?.crewInfo.labelColor }}
          ></div>
          <h2 className={cn("name")}>{scheduleDetail?.crewInfo.crewName}</h2>
          {scheduleDetail?.coordinate && <p className={cn("coordinated")}>조율된 일정</p>}
        </div>
        <div className={cn("buttons")}>
          {scheduleDetail?.coordinate || (
            //후에 수정버튼도 여기 추가
            <button className={cn("remove-button")} onClick={handleDelete}>
              <Image src="/icons/trash-icon.svg" alt="일정삭제" width={30} height={30} />
            </button>
          )}
          <button className={cn("close-button")} type="button" onClick={closeModal}>
            <Image src="/icons/close-icon.svg" alt="모달 닫기" width={30} height={30} />
          </button>
        </div>
      </div>
      <div className={cn("contents")}>
        <h1 className={cn("title")}>{scheduleDetail?.title}</h1>
        <div className={cn("time-place")}>
          <div className={cn("time-container")}>
            <p className={cn("label")}>시간</p>
            <p className={cn("time")}>
              {start} ~ {end}
            </p>
          </div>
          <div className={cn("place-container")}>
            <p className={cn("label")}>장소</p>
            <p className={cn("place")}>
              <Image
                src="/icons/location-icon.svg"
                alt="장소"
                width={20}
                height={20}
                className={cn("place-icon")}
              />
              {place}
            </p>
          </div>
        </div>
        <div className={cn("description")}>
          <p className={cn("label")}>추가 내용</p>
          <p className={cn("text")}>{description}</p>
        </div>
        <div className={cn("participants-container")}>
          <p className={cn("label")}>참가자</p>
          <div className={cn("participants")}>
            {scheduleDetail &&
            scheduleDetail.participants &&
            scheduleDetail.participants.length >= 2 ? (
              scheduleDetail.participants
                .filter((participant: any) => participant.accountId !== userInfo?.accountId)
                .map((participant: any) => (
                  <p className={cn("participant")} key={participant.accountId}>
                    {participant.nickName}
                  </p>
                ))
            ) : (
              <p className={cn("alone")}>참가자가 혼자입니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
