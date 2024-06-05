import classNames from "classnames/bind";

import styles from "./CalendarGroupList.module.scss";

const cn = classNames.bind(styles);

export default function CalendarGroupList() {
  return <div className={cn("container")}>그룹리스트</div>;
}
