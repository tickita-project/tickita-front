import { useEffect, useRef } from "react";

import classNames from "classnames/bind";
import { createPortal } from "react-dom";

import { useModalStore } from "@/store/useModalStore";

import styles from "./Portal.module.scss";

const cn = classNames.bind(styles);

const MODAL_TYPE: Record<string, JSX.Element> = {
  CREATE_GROUP: <div>각자 모달 컴포넌트 만들어서 넣기!</div>,
};

export default function Portal() {
  const { isOpen, type, closeModal } = useModalStore();

  return (
    isOpen &&
    createPortal(
      <div className={cn("background")}>
        <div className={cn("modal")}>
          <div className={cn("button-box")}>
            <button onClick={() => closeModal()}>임시 X 버튼</button>
          </div>
          {MODAL_TYPE[type]}
        </div>
      </div>,
      document.body,
    )
  );
}
