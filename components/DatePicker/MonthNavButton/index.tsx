import Image from "next/image";

import classNames from "classnames/bind";

import { useDateStore } from "@/store/useDateStore";

import styles from "./MonthNavButton.module.scss";

const cn = classNames.bind(styles);

export default function MonthNavButton() {
  const { viewDate, setViewDate } = useDateStore();

  const handlePrevButtonClick = () => {
    setViewDate(viewDate.subtract(1, "month"));
  };

  const handleNextButtonClick = () => {
    setViewDate(viewDate.add(1, "month"));
  };

  return (
    <div className={cn("navigation-button")}>
      <button onClick={handlePrevButtonClick} className={cn("arrow-button")} type="button">
        <Image src="/icons/arrow-left-icon.svg" alt="이전달" width={20} height={20} />
      </button>
      <button onClick={handleNextButtonClick} className={cn("arrow-button")} type="button">
        <Image src="/icons/arrow-right-icon.svg" alt="다음달" width={20} height={20} />
      </button>
    </div>
  );
}
