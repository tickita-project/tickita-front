import { useState } from "react";

import Image from "next/image";

import classNames from "classnames/bind";

import { MODAL_TYPE } from "@/constants/modalType";
import { useModalStore } from "@/store/useModalStore";

import styles from "./ActionButton.module.scss";

const cn = classNames.bind(styles);

interface ActionButtonProps {
  isCurrentUserLeader: boolean;
}

export default function ActionButton({ isCurrentUserLeader }: ActionButtonProps) {
  const [isInfoTextView, setIsInfoTextView] = useState(false);
  const { openModal } = useModalStore();

  const handleInfoTextMouseOver = () => {
    setIsInfoTextView(true);
  };

  const handleInfoTextMouseLeave = () => {
    setIsInfoTextView(false);
  };

  const handleGroupDeleteButtonClick = () => {
    openModal(MODAL_TYPE.DELETE_GROUP);
  };

  const handleGroupExitButtonClick = () => {
    openModal(MODAL_TYPE.EXIT_GROUP);
  };

  return (
    <div className={cn("button-box")}>
      <div
        onMouseOver={handleInfoTextMouseOver}
        onMouseLeave={handleInfoTextMouseLeave}
        className={cn("info-box")}
      >
        <Image src="/icons/information-icon.svg" width={40} height={40} alt="그룹 정보 버튼" />
        {isInfoTextView && (
          <div className={cn("info-item")}>
            <div className={cn("info-text")}>
              리더가 그룹을 나가려면 다른 멤버에게 리더를 위임하고 나가야 합니다.
              <p className={cn("triangle")} />
            </div>
          </div>
        )}
      </div>
      {isCurrentUserLeader ? (
        <button type="button" className={cn("group-button")} onClick={handleGroupDeleteButtonClick}>
          그룹 삭제
        </button>
      ) : (
        <button type="button" className={cn("group-button")} onClick={handleGroupExitButtonClick}>
          그룹 나가기
        </button>
      )}
    </div>
  );
}
