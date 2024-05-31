import { InputHTMLAttributes } from "react";

import classNames from "classnames/bind";

import { GroupColorType } from "@/types/type";

import styles from "./GroupColor.module.scss";

const cn = classNames.bind(styles);

interface GroupColorProps extends InputHTMLAttributes<HTMLInputElement> {
  color: GroupColorType;
}

export default function GroupColor({ color, ...rest }: GroupColorProps) {
  return (
    <>
      {rest.onChange && (
        <label htmlFor="group-check-box" className={cn("hidden-label")}>
          그룹 체크 박스
        </label>
      )}
      <input
        id="group-check-box"
        style={{
          backgroundColor: rest.checked ? color : "white",
          border: rest.checked ? "1.5px solid rgba(44, 44, 44, 0.28)" : "1px solid black",
        }}
        type="checkbox"
        className={cn("group-color")}
        checked
        {...rest}
      />
    </>
  );
}
