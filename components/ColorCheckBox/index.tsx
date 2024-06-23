import { useState, useId } from "react";

import classNames from "classnames/bind";

import { GroupColorType } from "@/types/type";

import styles from "./ColorCheckBox.module.scss";

const cn = classNames.bind(styles);

interface ColorCheckBoxProps {
  crewId: number;
  color: GroupColorType;
  title: string;
}

export default function ColorCheckBox({ crewId, color, title }: ColorCheckBoxProps) {
  const [isChecked, setIsChecked] = useState(false);
  const unquieId = useId();

  const handleCheckBoxChange = () => {
    if (isChecked) {
      setIsChecked((prev) => !prev);
      return;
    } else {
      setIsChecked((prev) => !prev);
    }
  };

  return (
    <li className={cn("box")}>
      <input
        id={`color-check-box-${unquieId}`}
        className={cn("group-checkbox")}
        style={{
          backgroundColor: isChecked ? color : "white",
          border: isChecked ? "none" : "2px solid",
          borderColor: isChecked ? "none" : color,
          outline: "none",
        }}
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckBoxChange}
      />
      <label htmlFor={`color-check-box-${unquieId}`} className={cn("group-title")}>
        {title}
      </label>
    </li>
  );
}
