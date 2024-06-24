import Image from "next/image";

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { getScheduleDetail } from "@/apis/apis";
import { scheduleKey } from "@/constants/queryKey";
import { useModalStore } from "@/store/useModalStore";

import styles from "./ScheduleDetailModal.module.scss";

const cn = classNames.bind(styles);

export default function ScheduleDetailModal() {
  const { closeModal, data: scheduleId } = useModalStore();

  const { data } = useQuery({
    queryKey: scheduleKey.detail(scheduleId),
    queryFn: () => getScheduleDetail(scheduleId),
  });

  const place = data?.location ? data.location : "정해진 장소가 없어요.";
  const description = data?.description ? data.description : "입력된 설명이 없어요.";

  return (
    <div className={cn("container")}>
      <div className={cn("header")}>
        <div className={cn("group")}>
          <div className={cn("color")} style={{ backgroundColor: data?.crewInfo.labelColor }}></div>
          <h2 className={cn("name")}>{data?.crewInfo.crewName}</h2>
        </div>
        <div className={cn("buttons")}>
          <button className={cn("close-button")} type="button" onClick={closeModal}>
            <Image src="/icons/close-icon.svg" alt="모달 닫기" width={30} height={30} />
          </button>
        </div>
      </div>
      <div className={cn("contents")}>
        <h1 className={cn("title")}>{data?.title}</h1>
      </div>
    </div>
  );
}
//<div className={cn("")}></div>
