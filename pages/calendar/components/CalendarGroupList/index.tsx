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
      <span>현재 가입된 그룹</span>
      <ul className={cn("group-box")}>
        {groupList.map((group) => (
          <li key={group.id} className={cn("group-list")}>
            <ColorCheckBox color={group.groupColor} title={group.groupName} />
          </li>
        ))}
      </ul>
    </div>
  );
}
