import { useState, useId } from "react";

import classNames from "classnames/bind";

import { GroupColorType } from "@/types/type";

import styles from "./ColorCheckBox.module.scss";

const cn = classNames.bind(styles);

interface ColorCheckBoxProps {
  color: GroupColorType;
  title: string;
}

export default function ColorCheckBox({ color, title }: ColorCheckBoxProps) {
  const [isChecked, setIsChecked] = useState(false);
  const unquieId = useId();

  const handleCheckBoxChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className={cn("box")}>
      <input
        id={`color-check-box-${unquieId}`}
        className={cn("group-color")}
        style={{
          backgroundColor: isChecked ? color : "white",
          border: isChecked ? "1.5px solid rgba(44, 44, 44, 0.28)" : "1px solid black",
        }}
        type="checkbox"
        checked={isChecked}
        onChange={() => handleCheckBoxChange()}
      />
      <label htmlFor={`color-check-box-${unquieId}`} className={cn("group-title")}>
        {title}
      </label>
    </div>
  );
}
