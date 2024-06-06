import classNames from "classnames/bind";

import { CalendarType } from "@/pages/calendar/index.page";
import { useDateStore } from "@/store/useDateStore";

import styles from "./CalendarHeader.module.scss";
import CalendarTypeSegmentedButton from "../../CalendarTypeSegmentedButton";

const cn = classNames.bind(styles);

interface CalendarHeader {
  setCalendarType: (type: CalendarType) => void;
}

export default function CalendarHeader({ setCalendarType }: CalendarHeader) {
  const { focusDate } = useDateStore();
  return (
    <header className={cn("container")}>
      <h2>
        {focusDate.get("year")} 년 {focusDate.get("M") + 1}월
      </h2>
      <CalendarTypeSegmentedButton setCalendarType={setCalendarType} />
    </header>
  );
}
