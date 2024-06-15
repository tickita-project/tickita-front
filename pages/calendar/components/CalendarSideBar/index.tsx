import { useRef, useState } from "react";

import Image from "next/image";

import classNames from "classnames/bind";

import DatePicker from "@/components/DatePicker/DatePicker";
import { useOutsideClick } from "@/hooks/useOutsideClick";

import styles from "./CalendarSideBar.module.scss";
import CalendarGroupList from "../CalendarGroupList";

const cn = classNames.bind(styles);

export default function CalendarSideBar() {
  const [isCreateListVisible, setIsCreateListVisible] = useState(false);
  const scheduleContainerRef = useRef(null);

  const handleListVisibleToggle = () => {
    setIsCreateListVisible((prev) => !prev);
  };

  useOutsideClick(scheduleContainerRef, () => setIsCreateListVisible(false));

  return (
    <aside className={cn("container")}>
      <div
        className={cn("schedule-create-container")}
        ref={scheduleContainerRef}
        onClick={handleListVisibleToggle}
      >
        <div className={cn("schedule-create")}>
          <Image src="/icons/schedule-icon.svg" alt="일정 생성" width={20} height={20} />
          일정 잡기
        </div>
        {isCreateListVisible && (
          <ul className={cn("create-list-container")}>
            <li>일정 만들기</li>
            <li>일정 조율하기</li>
          </ul>
        )}
      </div>

      <DatePicker />
      <CalendarGroupList />
    </aside>
  );
}
