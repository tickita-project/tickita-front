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
  const { isOpen, type } = useModalStore();

  if (!isOpen) {
    return null;
  }

  return createPortal(<div className={cn("background")}>{MODAL_TYPE[type]}</div>, document.body);
}
