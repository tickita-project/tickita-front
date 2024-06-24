import Image from "next/image";

import classNames from "classnames/bind";

import { useModalStore } from "@/store/useModalStore";

import styles from "./ScheduleDetailModal.module.scss";

const cn = classNames.bind(styles);

export default function ScheduleDetailModal() {
  const { closeModal, data } = useModalStore();

  return (
    <div className={cn("container")}>
      <button className={cn("close-button")} type="button" onClick={closeModal}>
        <Image src="/icons/close-icon.svg" alt="모달 닫기" width={30} height={30} />
      </button>
    </div>
  );
}
