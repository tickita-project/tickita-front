import Image from "next/image";

import classNames from "classnames/bind";

import { MODAL_TYPE } from "@/constants/modalType";
import { useModalStore } from "@/store/useModalStore";

import styles from "./GroupList.module.scss";

const cn = classNames.bind(styles);

interface GroupListProps {
  // props
}

// 추후 props 추가 예정
export default function GroupList() {
  const { openModal } = useModalStore();

  return (
    <section className={cn("container")}>
      <div className={cn("button-box")}>
        <button
          type="button"
          className={cn("button")}
          onClick={() => openModal(MODAL_TYPE.CREATE_GROUP)}
        >
          <Image src="/icons/plus-icon.svg" width={20} height={20} alt="그룹 생성 아이콘" />
          그룹 새로 만들기
        </button>
      </div>
      <span className={cn("group-guide-text")}>현재 가입된 그룹</span>
      <ul className={cn("group-box")}>
        <li className={cn("group-list")}>
          <div className={cn("group-color")} style={{ backgroundColor: "#3360FF" }} />
          <span className={cn("group-title")}>엄청 엄청 엄청 엄청 엄청 엄청 긴 이름</span>
        </li>
      </ul>
    </section>
  );
}
