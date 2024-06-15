import classNames from "classnames/bind";

import TitleBox from "@/components/TitleBox";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";

import { GroupMemberInfoType } from "@/types/type";

import MemberInfo from "./MemberInfo";
import styles from "./MemberList.module.scss";

const cn = classNames.bind(styles);

const mockData: GroupMemberInfoType[] = Array.from({ length: 20 }, (_, index) => ({
  role: "MEMBER",
  accountId: index,
  nickName: `테스트 닉네임 ${index}`,
  email: `test${index}@naver.com`,
  imageUrl: null,
}));

mockData.unshift({
  role: "OWNER",
  accountId: 23,
  nickName: `테스트 닉네임 리더`,
  email: `leader@naver.com`,
  imageUrl: null,
});

function MemberList() {
  const { data: userInfo } = useGetUserInfo();
  const isCurrentUserLeader = userInfo?.accountId === mockData[0].accountId; // 로그인한 유저가 이 그룹의 리더인지 확인

  return (
    <div className={cn("user-list-box")}>
      <div className={cn("title-box")}>
        <TitleBox title="그룹 멤버" />
      </div>
      <ul className={cn("user-list")}>
        {mockData.map((member) => (
          <MemberInfo
            key={member.accountId}
            isCurrentUserLeader={isCurrentUserLeader}
            userId={userInfo?.accountId}
            MemberInfoData={member}
          />
        ))}
      </ul>
    </div>
  );
}

export default MemberList;
