import React from "react";

import classNames from "classnames/bind";

import ColorCheckBox from "@/components/ColorCheckBox";

import { GroupColorType } from "@/types/type";

import styles from "./CalendarGroupList.module.scss";

const cn = classNames.bind(styles);

interface GroupType {
  id: number;
  groupName: string;
  groupColor: GroupColorType;
}

interface CalendarGroupListProps {
  groupList: GroupType[];
}

export default function CalendarGroupList({ groupList }: CalendarGroupListProps) {
  return (
    <div className={cn("container")}>
      <p className={cn("enter-group")}>현재 가입된 그룹</p>
      <ul className={cn("group-container")}>
        {groupList.map((group) => (
          <React.Fragment key={group.id}>
            <ColorCheckBox color={group.groupColor} title={group.groupName} />
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
