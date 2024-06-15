import { useRef, useState } from "react";

import Image from "next/image";

import classNames from "classnames/bind";

import ProfileImage from "@/components/ProfileImage";
import { useOutsideClick } from "@/hooks/useOutsideClick";

import { GroupMemberInfoType } from "@/types/type";

import styles from "./MemberInfo.module.scss";

const cn = classNames.bind(styles);

interface MemberInfoProps {
  isCurrentUserLeader: boolean;
  userId: number | undefined;
  MemberInfoData: GroupMemberInfoType;
}

export default function MemberInfo({
  isCurrentUserLeader,
  userId,
  MemberInfoData,
}: MemberInfoProps) {
  const { role, accountId, nickName, email, imageUrl } = MemberInfoData;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const isLeader = role === "OWNER"; // 리더인지 확인
  const isMe = userId === accountId; // 나인지 확인

  console.log(userId);

  const handleMenuButtonClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useOutsideClick(menuButtonRef, () => setIsMenuOpen(false));

  return (
    <li className={cn("info-box")}>
      <div className={cn("image-box")}>
        <ProfileImage imageUrl={imageUrl} />
        {isMe && <p className={cn("my-badge")}>나</p>}
      </div>
      <div className={cn("text-box")}>
        <span className={cn("nickname")}>{nickName}</span>
        <span className={cn("email")}>{email}</span>
      </div>
      {isLeader && <p className={cn("leader-badge")}>리더</p>}
      {isCurrentUserLeader && !isLeader && (
        <div className={cn("menu-box")}>
          <button ref={menuButtonRef} type="button" onClick={handleMenuButtonClick}>
            <Image src="/icons/hamburger-icon.svg" width={4} height={14} alt="메뉴 열기" />
          </button>
          {isMenuOpen && (
            <ul className={cn("menu-list")}>
              <li>
                <button className={cn("mandate-button", "menu-button")}>리더 위임</button>
              </li>
              <li>
                <button className={cn("exile-button", "menu-button")}>추방하기</button>
              </li>
            </ul>
          )}
        </div>
      )}
    </li>
  );
}
