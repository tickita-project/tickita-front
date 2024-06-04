import classNames from "classnames/bind";
import { Dayjs } from "dayjs";

import DatePicker, { DatePickerProps } from "@/components/DatePicker/DatePicker";

import styles from "./CalendarSideBar.module.scss";

const cn = classNames.bind(styles);

interface CalendarSideBarProps extends DatePickerProps {}

export default function CalendarSideBar({ selectedDay, setSelectedDay }: CalendarSideBarProps) {
  return (
    <aside className={cn("container")}>
      <button type="button"></button>
      <DatePicker selectedDay={selectedDay} setSelectedDay={setSelectedDay} hasNavigation={true} />
    </aside>
  );
}
