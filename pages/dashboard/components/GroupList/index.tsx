import Image from "next/image";

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { getGroupList } from "@/apis/apis";
import { MODAL_TYPE } from "@/constants/modalType";
import { useModalStore } from "@/store/useModalStore";

import styles from "./GroupList.module.scss";

const cn = classNames.bind(styles);

const mockData = [
  {
    id: 1,
    groupName: "그룹1",
    groupColor: "#3360FF",
  },
  {
    id: 2,
    groupName: "그룹2",
    groupColor: "#D688EA",
  },
  {
    id: 3,
    groupName: "그룹3",
    groupColor: "#21D53E",
  },
  {
    id: 4,
    groupName:
      "그룹 이름이 길어지는 경우 테스트그룹 이름이 길어지는 경우 테스트그룹 이름이 길어지는 경우 테스트그룹 이름이 길어지는 경우 테스트그룹 이름이 길어지는 경우 테스트그룹 이름이 길어지는 경우 테스트",
    groupColor: "#F380B7",
  },
];

export default function GroupList() {
  const { data } = useQuery({ queryKey: ["groupList"], queryFn: getGroupList });
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
        {data?.map((crew) => (
          <li key={crew.crewId} className={cn("group-list")}>
            <div className={cn("group-color")} style={{ backgroundColor: crew.labelColor }} />
            <span className={cn("group-title")}>{crew.crewName}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
