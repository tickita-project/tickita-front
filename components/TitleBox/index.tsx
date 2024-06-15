import Image from "next/image";

import classNames from "classnames/bind";

import styles from "./TitleBox.module.scss";

interface TitleBoxProps {
  title: string;
}

const cn = classNames.bind(styles);

function TitleBox({ title }: TitleBoxProps) {
  return (
    <figure className={cn("container")}>
      <Image src="/icons/rectangle.svg" width={103} height={44} alt="" />
      <figcaption className={cn("title")}>{title}</figcaption>
    </figure>
  );
}

export default TitleBox;
