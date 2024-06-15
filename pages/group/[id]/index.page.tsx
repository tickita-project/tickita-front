import { ReactElement, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next/types";

import { QueryClient, dehydrate } from "@tanstack/react-query";
import classNames from "classnames/bind";

import GroupForm from "./components/GroupForm";
import InviteForm from "./components/InviteForm";
import MemberList from "./components/MemberList";
import { getGroupInfo, getUserInfo } from "@/apis/apis";
import { setContext } from "@/apis/axios";
import Layout from "@/components/Layout";
import MetaData from "@/components/MetaData";
import { groupKey, userInfoKey } from "@/constants/queryKey";
import { useGetGroupInfo } from "@/hooks/useGetGroupInfo";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";

import styles from "./Group.module.scss";

const cn = classNames.bind(styles);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  setContext(context);
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({ queryKey: userInfoKey.info(), queryFn: getUserInfo });
    await queryClient.prefetchQuery({
      queryKey: groupKey.detail(Number(context.query.id)),
      queryFn: () => getGroupInfo(Number(context.query.id)),
    });

    return {
      props: { dehydrateState: dehydrate(queryClient) },
    };
  } catch (error) {
    return {
      props: { dehydrateState: null },
    };
  }
};

export default function Group() {
  const [isInfoTextView, setIsInfoTextView] = useState(false);
  const { query } = useRouter();
  const { data: groupInfo } = useGetGroupInfo(Number(query.id));
  const { data: userInfo } = useGetUserInfo();

  const isCurrentUserLeader =
    userInfo?.accountId === groupInfo?.crewMemberInfoResponses[0].accountId;

  const handleInfoTextMouseOver = () => {
    setIsInfoTextView(true);
  };

  const handleInfoTextMouseLeave = () => {
    setIsInfoTextView(false);
  };

  if (!groupInfo || !userInfo) {
    // 추후 로딩 처리로 변경
    return null;
  }

  return (
    <>
      <MetaData title={`${groupInfo.crewName} | 티키타`} />
      <section className={cn("content")}>
        <MemberList
          isCurrentUserLeader={isCurrentUserLeader}
          currentUserId={userInfo.accountId}
          memberList={groupInfo.crewMemberInfoResponses}
        />
        <InviteForm />
        <div className={cn("box")}>
          <GroupForm groupInfo={groupInfo} />
          <div className={cn("button-box")}>
            <div
              onMouseOver={handleInfoTextMouseOver}
              onMouseLeave={handleInfoTextMouseLeave}
              className={cn("info-box")}
            >
              <Image
                src="/icons/information-icon.svg"
                width={40}
                height={40}
                alt="그룹 정보 버튼"
              />
              {isInfoTextView && (
                <div className={cn("info-item")}>
                  <div className={cn("info-text")}>
                    리더가 그룹을 나가려면 다른 멤버에게 리더를 위임하고 나가야 합니다.
                    <p className={cn("triangle")} />
                  </div>
                </div>
              )}
            </div>
            <button className={cn("group-button")}>
              {isCurrentUserLeader ? "그룹 삭제" : "그룹 나가기"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

Group.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
