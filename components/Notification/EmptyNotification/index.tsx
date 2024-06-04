import Image from "next/image";

import classNames from "classnames/bind";

import styles from "./EmptyNotification.module.scss";

const cn = classNames.bind(styles);

interface EmptyNotificationProps {
  title: string;
}

export default function EmptyNotification({ title }: EmptyNotificationProps) {
  return (
    <div className={cn("empty")}>
      <p>{title}</p>
      <Image
        className={cn("ghost-icon")}
        src="/icons/ghost.svg"
        width={50}
        height={52}
        alt="유령 아이콘"
      />
    </div>
  );
}
