import { useRef, useState } from "react";

import Image from "next/image";

import classNames from "classnames/bind";

import DatePicker, { DatePickerProps } from "@/components/DatePicker/DatePicker";
import { useOutsideClick } from "@/hooks/useOutsideClick";

import { GroupColorType } from "@/types/type";

import styles from "./CalendarSideBar.module.scss";
import CalendarGroupList from "../CalendarGroupList";

const cn = classNames.bind(styles);

interface mockType {
  id: number;
  groupName: string;
  groupColor: GroupColorType;
}
const mockData: mockType[] = [
  {
    id: 1,
    groupName: "그룹1",
    groupColor: "#3360FF",
  },
  {
    id: 2,
    groupName: "그룹2",
    groupColor: "#D688EA",
  },
  {
    id: 3,
    groupName: "그룹3",
    groupColor: "#21D53E",
  },
  {
    id: 4,
    groupName:
      "그룹 이름이 길어지는 경우 테스트그룹 이름이 길어지는 경우 테스트그룹 이름이 길어지는 경우 테스트그룹 이름이 길어지는 경우 테스트그룹 이름이 길어지는 경우 테스트그룹 이름이 길어지는 경우 테스트",
    groupColor: "#F380B7",
  },
];

interface CalendarSideBarProps extends DatePickerProps {}

export default function CalendarSideBar({ selectedDay, setSelectedDay }: CalendarSideBarProps) {
  const [isCreateListVisible, setIsCreateListVisible] = useState(false);
  const scheduleContainerRef = useRef(null);

  const handleListVisibleToggle = () => {
    setIsCreateListVisible((prev) => !prev);
  };

  useOutsideClick({ ref: scheduleContainerRef, handler: () => setIsCreateListVisible(false) });

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

      <DatePicker selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <CalendarGroupList groupList={mockData} />
    </aside>
  );
}
