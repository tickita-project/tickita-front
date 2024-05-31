import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import classNames from "classnames/bind";

import { PAGE_PATH } from "@/constants/\bpagePath";

import styles from "./Header.module.scss";

const cn = classNames.bind(styles);

// 로그인 정보에 따라 닉네임, 프로필 이미지 변경(유저 정보 전역 상태 관리?)
export default function Header() {
  const router = useRouter();
  const isDashboard = router.pathname === PAGE_PATH.DASHBOARD;

  return (
    <header className={cn("header")}>
      <nav className={cn("nav")}>
        <Link href={PAGE_PATH.DASHBOARD}>
          <Image src="/icons/tickita-logo.svg" width={60} height={22} alt="티키타 로고" />
        </Link>

        <div className={cn("nav-tap")}>
          <Link href={PAGE_PATH.DASHBOARD} className={cn("nav-tap-item", { active: isDashboard })}>
            대시보드
          </Link>
          <Link href={PAGE_PATH.CALENDER} className={cn("nav-tap-item", { active: !isDashboard })}>
            캘린더
          </Link>
        </div>

        <div className={cn("profile-box")}>
          <div className={cn("nickname-box")}>
            반가워요, <span className={cn("nickname")}>달맞이 토끼</span> 님
          </div>

          <figure className={cn("profile-image-container")}>
            <figcaption className={cn("profile-image-background")}>
              <Image
                src="/icons/default-profile.svg"
                width={44}
                height={44}
                alt="유저 프로필 이미지"
              />
            </figcaption>
          </figure>
        </div>
      </nav>
    </header>
  );
}
