import classNames from "classnames/bind";
import { Dayjs } from "dayjs";

import { CalendarType } from "@/pages/calendar/index.page";

import styles from "./CalendarHeader.module.scss";
import CalendarTypeRadioButton from "../../CalendarTypeRadioButton";

const cn = classNames.bind(styles);

interface CalendarHeader {
  viewDate: Dayjs;
  setCalendarType: (type: CalendarType) => void;
}

export default function CalendarHeader({ viewDate, setCalendarType }: CalendarHeader) {
  return (
    <header className={cn("container")}>
      <h2>
        {viewDate.get("year")} 년 {viewDate.get("M") + 1}월
      </h2>
      <CalendarTypeRadioButton setCalendarType={setCalendarType} />
    </header>
  );
}
