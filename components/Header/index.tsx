import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import classNames from "classnames/bind";

import { PAGE_PATH } from "@/constants/pagePath";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useOutsideClick } from "@/hooks/useOutsideClick";

import styles from "./Header.module.scss";
import ProfileImage from "../ProfileImage";

const cn = classNames.bind(styles);

const isAnimation = {
  dashboard: false,
  calendar: false,
};

// 로그인 정보에 따라 닉네임, 프로필 이미지 변경(유저 정보 전역 상태 관리?)
export default function Header() {
  const [isDropDownView, setIsDropDownView] = useState(false);
  const { pathname } = useRouter();
  const { data: userInfo } = useGetUserInfo();
  const profileButtonRef = useOutsideClick<HTMLButtonElement>(() => setIsDropDownView(false));

  const isDashboardPage = pathname === PAGE_PATH.DASHBOARD;
  const isCalendarPage = pathname === PAGE_PATH.CALENDAR;

  const handleDashboardTapClick = () => {
    isAnimation.dashboard = true;

    // 애니메이션 초기화
    setTimeout(() => {
      isAnimation.dashboard = false;
    }, 500);
  };

  const handleCalendarTapClick = () => {
    isAnimation.calendar = true;

    // 애니메이션 초기화
    setTimeout(() => {
      isAnimation.calendar = false;
    }, 500);
  };

  const handleMenuButtonClick = () => {
    setIsDropDownView((prev) => !prev);
  };

  const handleLogoutButtonClick = () => {
    // 로그아웃 처리
  };

  return (
    <header className={cn("header")}>
      <nav className={cn("nav")}>
        <Link href={PAGE_PATH.DASHBOARD} onClick={handleDashboardTapClick}>
          <Image src="/icons/tickita-logo.svg" width={60} height={22} alt="티키타 로고" priority />
        </Link>

        <div className={cn("nav-tap")}>
          <Link
            onClick={handleDashboardTapClick}
            href={PAGE_PATH.DASHBOARD}
            className={cn("nav-tap-item", { active: isDashboardPage })}
          >
            대시보드
          </Link>
          <Link
            onClick={handleCalendarTapClick}
            href={PAGE_PATH.CALENDAR}
            className={cn("nav-tap-item", { active: isCalendarPage })}
          >
            캘린더
          </Link>
          {(isDashboardPage || isCalendarPage) && (
            <div
              className={cn("active-effect", {
                "animation-effect-dashboard": isAnimation.dashboard,
                "animation-effect-calendar": isAnimation.calendar,
                "effect-position-right": isCalendarPage,
              })}
            />
          )}
        </div>

        <div className={cn("profile-box")}>
          <div className={cn("nickname-box")}>
            {isDashboardPage ? (
              <span className={cn("guide-text")}>반가워요, </span>
            ) : (
              <figure className={cn("notification-bell")}>
                <figcaption className={cn("notification-count")}>9+</figcaption>
                <Image
                  src="/icons/notification-bell.svg"
                  width={26}
                  height={20}
                  alt="알림 종"
                  priority
                />
              </figure>
            )}
            <span className={cn("nickname")}>{userInfo?.nickName}</span> 님
          </div>
          <div className={cn("profileBox")}>
            <button ref={profileButtonRef} onClick={handleMenuButtonClick}>
              <ProfileImage imageUrl={userInfo?.image} />
            </button>
            {isDropDownView && (
              <ul className={cn("dropdown")}>
                <li>
                  <Link className={cn("my-page-link")} href={PAGE_PATH.MY_PAGE}>
                    마이페이지
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogoutButtonClick} className={cn("logout")} type="button">
                    로그아웃
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
