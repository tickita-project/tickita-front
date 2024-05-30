import Image from "next/image";

function GroupList() {
  return (
    <>
      <button type="button">
        <Image
          src="/icons/plus-icon.svg"
          width={20}
          height={20}
          alt="그룹 생성 아이콘"
          priority={true}
        />
        그룹 만들기
      </button>
      <ul>
        현재 가입된 그룹
        <li>
          <input type="checkbox" />
          개인 그룹
        </li>
        <li>
          <input type="checkbox" />
          엄청 엄청 엄청 엄청 엄청 엄청 긴 이름
        </li>
        <li>
          <input type="checkbox" />
          그룹 2
        </li>
      </ul>
    </>
  );
}

export default GroupList;
