import { useState } from "react";

import Image from "next/image";

import classNames from "classnames/bind";

import GroupColor from "@/components/GroupColor";

import styles from "./GroupList.module.scss";

const cn = classNames.bind(styles);

export default function GroupList() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className={cn("wrap")}>
      <div className={cn("button-box")}>
        <button type="button" className={cn("button")}>
          <Image
            src="/icons/plus-icon.svg"
            width={20}
            height={20}
            alt="그룹 생성 아이콘"
            priority={true}
          />
          그룹 새로 만들기
        </button>
      </div>
      <ul className={cn("group-box")}>
        <span className={cn("group-info")}>현재 가입된 그룹</span>

        <li className={cn("group-list")}>
          <GroupColor color="#FFAF8C" readOnly />
          <span className={cn("group-title")}> 엄청 엄청 엄청 엄청 엄청 엄청 긴 이름</span>
        </li>

        <li className={cn("group-list")}>
          <GroupColor color="#D688EA" checked={isChecked} onChange={handleCheckboxChange} />
          <span className={cn("group-title")}> 엄청 엄청 엄청 엄청 엄청 엄청 긴 이름</span>
        </li>
      </ul>
    </div>
  );
}
