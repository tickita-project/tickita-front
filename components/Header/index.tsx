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
const tempImageUrl = "https://i.pinimg.com/564x/c5/5c/76/c55c762ce418abefd071aa7e81c5a213.jpg";

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
        <Link href={PAGE_PATH.DASHBOARD}>
          <Image src="/icons/tickita-logo.svg" width={60} height={22} alt="티키타 로고" />
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
            반가워요, <span className={cn("nickname")}>달맞이 토끼</span> 님
          </div>

          <ProfileImage imageUrl={tempImageUrl} />
        </div>
      </nav>
    </header>
  );
}
