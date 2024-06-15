import classNames from "classnames/bind";

import { CalendarType } from "@/types/type";

import styles from "./CalendarTypeSegmentedButton.module.scss";

interface CalendarTypeRadioButtonProps {
  setCalendarType: (type: CalendarType) => void;
}

const cn = classNames.bind(styles);

export default function CalendarTypeSegmentedButton({
  setCalendarType,
}: CalendarTypeRadioButtonProps) {
  return (
    <>
      <div className={cn("container")}>
        <input
          id="monthly"
          type="radio"
          name="calendar"
          value="월"
          defaultChecked
          onClick={() => {
            setCalendarType("월");
          }}
        />
        <label htmlFor="monthly">월</label>
        <input
          id="weekly"
          type="radio"
          name="calendar"
          value="주"
          onClick={() => {
            setCalendarType("주");
          }}
        />
        <label htmlFor="weekly">주</label>

        <input
          id="daily"
          type="radio"
          name="calendar"
          value="일"
          onClick={() => {
            setCalendarType("일");
          }}
        />
        <label htmlFor="daily">일</label>
      </div>
    </>
  );
}
