import classNames from "classnames/bind";

import TitleBox from "@/components/TitleBox";

import { GroupMemberInfoType } from "@/types/type";

import MemberInfo from "./MemberInfo";
import styles from "./MemberList.module.scss";

const cn = classNames.bind(styles);

interface MemberListProps {
  isCurrentUserLeader: boolean;
  currentUserId: number;
  memberList: GroupMemberInfoType[];
}

function MemberList({ currentUserId, isCurrentUserLeader, memberList }: MemberListProps) {
  return (
    <div className={cn("user-list-box")}>
      <div className={cn("title-box")}>
        <TitleBox title="그룹 멤버" />
      </div>
      <ul className={cn("user-list")}>
        {memberList?.map((member) => (
          <MemberInfo
            key={member.accountId}
            isCurrentUserLeader={isCurrentUserLeader}
            currentUserId={currentUserId}
            MemberInfoData={member}
          />
        ))}
      </ul>
    </div>
  );
}

export default MemberList;
