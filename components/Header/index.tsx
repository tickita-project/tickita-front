import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import classNames from "classnames/bind";

import { PAGE_PATH } from "@/constants/pagePath";

import styles from "./Header.module.scss";
import ProfileImage from "../ProfileImage";

const cn = classNames.bind(styles);

const isAnimation = {
  dashboard: false,
  calendar: false,
};

// 임시 이미지 url 추후 삭제 예정
const tempImageUrl =
  "https://tickita-bucket.s3.ap-northeast-2.amazonaws.com/92c6f2fd-9a48-4252-af2d-ddfb0d82e3d3";

// 로그인 정보에 따라 닉네임, 프로필 이미지 변경(유저 정보 전역 상태 관리?)
export default function Header() {
  const { pathname } = useRouter();

  const handleDashboardTapClick = () => {
    isAnimation.dashboard = true;

    // 애니메이션 초기화
    setTimeout(() => {
      isAnimation.dashboard = false;
    }, 100);
  };

  const handleCalendarTapClick = () => {
    isAnimation.calendar = true;

    // 애니메이션 초기화
    setTimeout(() => {
      isAnimation.calendar = false;
    }, 100);
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
            className={cn("nav-tap-item", { active: pathname === PAGE_PATH.DASHBOARD })}
          >
            대시보드
          </Link>
          <Link
            onClick={handleCalendarTapClick}
            href={PAGE_PATH.CALENDAR}
            className={cn("nav-tap-item", { active: pathname === PAGE_PATH.CALENDAR })}
          >
            캘린더
          </Link>
          <div
            className={cn("active-effect", {
              "animation-effect-dashboard": isAnimation.dashboard,
              "animation-effect-calendar": isAnimation.calendar,
              "effect-position-right": pathname === PAGE_PATH.CALENDAR,
            })}
          />
        </div>

        <div className={cn("profile-box")}>
          <div className={cn("nickname-box")}>
            {pathname === PAGE_PATH.DASHBOARD ? (
              <span className={cn("guide-text")}>반가워요, </span>
            ) : (
              <figure className={cn("notification-bell")}>
                <figcaption className={cn("notification-count")}>9+</figcaption>
                <Image
                  src="icons/notification-bell.svg"
                  width={26}
                  height={20}
                  alt="알림 종"
                  priority
                />
              </figure>
            )}
            <span className={cn("nickname")}>달맞이 토끼</span> 님
          </div>

          <ProfileImage imageUrl={tempImageUrl} />
        </div>
      </nav>
    </header>
  );
}
