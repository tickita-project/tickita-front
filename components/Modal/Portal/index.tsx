import classNames from "classnames/bind";
import { createPortal } from "react-dom";

import { useModalStore } from "@/store/useModalStore";

import styles from "./Portal.module.scss";
import CreateGroupModal from "../CreateGroup";

const cn = classNames.bind(styles);

const MODAL_TYPE: Record<string, JSX.Element> = {
  CREATE_GROUP: <CreateGroupModal />,
};

export default function Portal() {
  const { isOpen, type, closeModal } = useModalStore();

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={cn("background")}>
      <div className={cn("modal")}>
        <div className={cn("button-box")}>
          <button onClick={() => closeModal()}>임시 X 버튼</button>
        </div>
        {MODAL_TYPE[type]}
      </div>
    </div>,
    document.body,
  );
}
