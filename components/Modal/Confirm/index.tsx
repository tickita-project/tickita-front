import Image from "next/image";

import classNames from "classnames/bind";

import { useModalStore } from "@/store/useModalStore";

import styles from "./Confirm.module.scss";

const cn = classNames.bind(styles);

interface ConfirmModalProps {
  title: string;
  content: string;
  subText?: string;
  buttonColor: string;
  buttonText: string;
  onClick: () => void;
}

export default function ConfirmModal({
  title,
  content,
  subText,
  buttonColor,
  buttonText,
  onClick,
}: ConfirmModalProps) {
  const { closeModal } = useModalStore();

  return (
    <div className={cn("container")}>
      <div className={cn("modal-header")}>
        <h2 className={cn("modal-title")}>{title}</h2>
        <button className={cn("modal-close")} type="button" onClick={closeModal}>
          <Image src="/icons/close-icon.svg" alt="모달 닫기" width={30} height={30} />
        </button>
      </div>
      <div className={cn("modal-body")}>
        <p className={cn("modal-content")}>{content}</p>
        <p className={cn("text")}>{subText}</p>
      </div>
      <div className={cn("modal-footer")}>
        <button
          onClick={onClick}
          className={cn("action-button")}
          style={{ backgroundColor: buttonColor }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
