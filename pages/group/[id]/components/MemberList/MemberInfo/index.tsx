import { useRef, useState } from "react";

import Image from "next/image";

import classNames from "classnames/bind";

import ProfileImage from "@/components/ProfileImage";
import { useOutsideClick } from "@/hooks/useOutsideClick";

import styles from "./MemberInfo.module.scss";

const cn = classNames.bind(styles);

export default function MemberInfo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleMenuButtonClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useOutsideClick(menuButtonRef, () => setIsMenuOpen(false));

  // 본인인 경우에는 나 뱃지를 붙여준다. -> 리더인 경우 리더 뱃지까지
  // 리더인 경우 멤버들을 삭제할 수 있는 버튼을 추가한다.
  return (
    <li className={cn("info-box")}>
      <div className={cn("image-box")}>
        <ProfileImage imageUrl={null} />
        {/* <p className={cn("my-badge")}>나</p> */}
      </div>
      <div className={cn("text-box")}>
        <span className={cn("nickname")}>소샤이그립습니다</span>
        <span className={cn("email")}>woogur29@gmail.com</span>
      </div>
      {/* <p className={cn("leader-badge")}>리더</p> */}
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
    </li>
  );
}
