import React from "react";

import classNames from "classnames/bind";

import ColorCheckBox from "@/components/ColorCheckBox";
import { useGetGroupList } from "@/hooks/useGetGroupList";

import styles from "./CalendarGroupList.module.scss";

const cn = classNames.bind(styles);

export default function CalendarGroupList() {
  const { data: groupList } = useGetGroupList();

  return (
    <div className={cn("container")}>
      <p className={cn("enter-group")}>현재 가입된 그룹</p>
      <ul className={cn("group-container")}>
        {groupList?.map((group) => (
          <ColorCheckBox
            key={group.crewId}
            crewId={group.crewId}
            color={group.labelColor}
            title={group.crewName}
          />
        ))}
      </ul>
    </div>
  );
}
