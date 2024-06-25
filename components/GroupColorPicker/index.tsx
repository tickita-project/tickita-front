import { forwardRef, useId } from "react";

import Image from "next/image";

import classNames from "classnames/bind";

import { GROUP_COLOR_LIST } from "@/constants/groupColorList";

import styles from "./GroupColorPicker.module.scss";

const cn = classNames.bind(styles);

interface GroupColorPickerProps {
  selectColor: string;
  readOnly: boolean;
}

export default forwardRef<HTMLInputElement, GroupColorPickerProps>(function GroupColorPicker(
  { readOnly, selectColor, ...rest }: GroupColorPickerProps,
  ref,
) {
  const uniqueId = useId();

  return (
    <ul className={cn("color-box", { "read-only": readOnly })}>
      {GROUP_COLOR_LIST.map((color) => (
        <li key={color} className={cn("color-item")}>
          <input
            disabled={readOnly}
            ref={ref}
            type="radio"
            id={`${uniqueId}-${color}`}
            value={color}
            {...rest}
          />
          <label
            htmlFor={`${uniqueId}-${color}`}
            className={cn("group-color")}
            style={{ backgroundColor: color }}
          />
          {selectColor === color && (
            <Image
              className={cn("select")}
              src="/icons/check-icon.svg"
              alt="선택된 색상"
              width={40}
              height={40}
            />
          )}
        </li>
      ))}
    </ul>
  );
});
