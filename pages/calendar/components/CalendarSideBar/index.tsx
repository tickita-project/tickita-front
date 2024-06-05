import Image from "next/image";

import classNames from "classnames/bind";
import { Dayjs } from "dayjs";

import DatePicker, { DatePickerProps } from "@/components/DatePicker/DatePicker";

import styles from "./CalendarSideBar.module.scss";

const cn = classNames.bind(styles);

interface CalendarSideBarProps extends DatePickerProps {}

export default function CalendarSideBar({ selectedDay, setSelectedDay }: CalendarSideBarProps) {
  return (
    <aside className={cn("container")}>
      <button className={cn("create-button")} type="button">
        <Image src="/icons/schedule-icon.svg" alt="일정 생성" width={20} height={20} />
        일정 생성
      </button>
      <DatePicker selectedDay={selectedDay} setSelectedDay={setSelectedDay} hasNavigation={true} />
    </aside>
  );
}
