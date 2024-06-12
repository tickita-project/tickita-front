import Image from "next/image";
import Link from "next/link";

import classNames from "classnames/bind";

import { MODAL_TYPE } from "@/constants/modalType";
import { useGetGroupList } from "@/hooks/useGetGroupList";
import { useModalStore } from "@/store/useModalStore";

import styles from "./GroupList.module.scss";

const cn = classNames.bind(styles);

export default function GroupList() {
  const { data, isError } = useGetGroupList();
  const { openModal } = useModalStore();

  if (isError) {
    return <div>에러 컴포넌트 추가 예정?!</div>;
  }

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
        {data?.map((crew) => (
          <li key={crew.crewId}>
            <Link href={`/group/${crew.crewId}`} className={cn("group-list")}>
              <div className={cn("group-color")} style={{ backgroundColor: crew.labelColor }} />
              <span className={cn("group-title")}>{crew.crewName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
