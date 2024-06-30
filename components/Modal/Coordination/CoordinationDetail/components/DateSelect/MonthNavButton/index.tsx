import Image from "next/image";

import classNames from "classnames/bind";

import { useDateStore } from "@/store/useDateStore";

import { CalendarType } from "@/types/type";

import styles from "./MonthNavButton.module.scss";

const cn = classNames.bind(styles);

interface MonthNavButtonProps {
  calendarType: CalendarType | null;
}

export default function MonthNavButton({ calendarType }: MonthNavButtonProps) {
  const { focusDate, viewDate, setFocusDate, setViewDate } = useDateStore();

  const handlePrevButtonClick = (calendarType: CalendarType | null) => {
    switch (calendarType) {
      case "월":
        setFocusDate(focusDate.subtract(1, "month").date(1));
        setViewDate(viewDate.subtract(1, "month"));
        break;
      case "주":
        setFocusDate(focusDate.subtract(1, "week"));
        setViewDate(viewDate.subtract(1, "week"));
        break;
      case "일":
        setFocusDate(focusDate.subtract(1, "d"));
        setViewDate(viewDate.subtract(1, "d"));
        break;
      default:
        setViewDate(viewDate.subtract(1, "month"));
    }
  };

  const handleNextButtonClick = (calendarType: CalendarType | null) => {
    switch (calendarType) {
      case "월":
        setFocusDate(focusDate.add(1, "month").date(1));
        setViewDate(viewDate.add(1, "month"));
        break;
      case "주":
        setFocusDate(focusDate.add(1, "week"));
        setViewDate(viewDate.add(1, "week"));
        break;
      case "일":
        setFocusDate(focusDate.add(1, "d"));
        setViewDate(viewDate.add(1, "d"));
        break;
      default:
        setViewDate(viewDate.add(1, "month"));
    }
  };

  return (
    <div className={cn("navigation-button")}>
      <button
        onClick={() => handlePrevButtonClick(calendarType)}
        className={cn("arrow-button")}
        type="button"
      >
        <Image src="/icons/arrow-left-icon.svg" alt="이전달" width={20} height={20} />
      </button>
      <button
        onClick={() => handleNextButtonClick(calendarType)}
        className={cn("arrow-button")}
        type="button"
      >
        <Image src="/icons/arrow-right-icon.svg" alt="다음달" width={20} height={20} />
      </button>
    </div>
  );
}
