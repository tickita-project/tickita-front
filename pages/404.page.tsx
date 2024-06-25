import Image from "next/image";
import Link from "next/link";

import classNames from "classnames/bind";

import { PAGE_PATH } from "@/constants/pagePath";
import styles from "@/styles/404.module.scss";

const cn = classNames.bind(styles);

export default function NotFound() {
  return (
    <div className={cn("container")}>
      <p className={cn("title")}>
        404
        <Image
          className={cn("image")}
          src="/images/error.webp"
          alt="에러 이미지"
          width={210}
          height={228}
        />
      </p>
      <p className={cn("text")}>엇, 페이지를 찾을 수 없어요</p>
      <div className={cn("box")}>
        <Link className={cn("button")} href={PAGE_PATH.DASHBOARD}>
          메인으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
