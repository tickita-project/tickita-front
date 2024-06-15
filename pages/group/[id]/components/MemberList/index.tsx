import classNames from "classnames/bind";

import TitleBox from "@/components/TitleBox";

import MemberInfo from "./MemberInfo";
import styles from "./MemberList.module.scss";

const cn = classNames.bind(styles);

function MemberList() {
  return (
    <div className={cn("user-list-box")}>
      <div className={cn("title-box")}>
        <TitleBox title="그룹 멤버" />
      </div>
      <ul className={cn("user-list")}>
        <MemberInfo />
        <MemberInfo />
        <MemberInfo />
        <MemberInfo />
        <MemberInfo />
        <MemberInfo />
        <MemberInfo />
        <MemberInfo />
        <MemberInfo />
        <MemberInfo />
        <MemberInfo />
        <MemberInfo />
      </ul>
    </div>
  );
}

export default MemberList;
