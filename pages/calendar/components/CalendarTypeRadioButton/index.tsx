import classNames from "classnames/bind";

import styles from "./CalendarTypeRadioButton.module.scss";
import { CalendarType } from "../../index.page";

interface CalendarTypeRadioButtonProps {
  setType: (type: CalendarType) => void;
}

const cn = classNames.bind(styles);

export default function CalendarTypeRadioButton({ setType }: CalendarTypeRadioButtonProps) {
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
            setType("월");
          }}
        />
        <label htmlFor="monthly">월</label>
        <input
          id="weekly"
          type="radio"
          name="calendar"
          value="주"
          onClick={() => {
            setType("주");
          }}
        />
        <label htmlFor="weekly">주</label>

        <input
          id="daily"
          type="radio"
          name="calendar"
          value="일"
          onClick={() => {
            setType("일");
          }}
        />
        <label htmlFor="monthly">일</label>
      </div>
    </>
  );
}
