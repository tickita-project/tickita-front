import classNames from "classnames/bind";

import styles from "./TitleBox.module.scss";

interface TitleBoxProps {
  title: string;
}

const cn = classNames.bind(styles);

function TitleBox({ title }: TitleBoxProps) {
  return (
    <div className={cn("container")}>
      <figure className={cn("box")}>
        {/* <Image src="/icons/rectangle.svg" width={103} height={44} alt="" /> */}
        <figcaption className={cn("title")}>{title}</figcaption>
      </figure>
    </div>
  );
}

export default TitleBox;
