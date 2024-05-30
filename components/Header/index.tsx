import Image from "next/image";

import classNames from "classnames/bind";

import styles from "./Header.module.scss";

const cn = classNames.bind(styles);

// 로그인 정보에 따라 닉네임, 프로필 이미지 변경
export default function Header() {
  return (
    <header className={cn("header")}>
      <nav className={cn("nav")}>
        <Image src="/icons/tickita-logo.svg" width={60} height={22} alt="티키타 로고" />

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
