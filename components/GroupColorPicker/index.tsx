import { forwardRef } from "react";

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
  return (
    <ul className={cn("color-box", { "read-only": readOnly })}>
      {GROUP_COLOR_LIST.map((color) => (
        <li key={color} className={cn("color-item")}>
          <input disabled={readOnly} ref={ref} type="radio" id={color} value={color} {...rest} />
          <label htmlFor={color} className={cn("group-color")} style={{ backgroundColor: color }} />
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
