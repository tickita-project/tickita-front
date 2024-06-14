import Image from "next/image";

import classNames from "classnames/bind";

import { getErrorMessage } from "@/utils/getErrorMessage";

import styles from "./ErrorFallBack.module.scss";
const cn = classNames.bind(styles);

function ErrorFallback({ error, resetErrorBoundary }: any) {
  const errorStatus = error.toString().split("code")[1];
  const { title, content } = getErrorMessage(Number(errorStatus));

  const handleResetButtonClick = () => {
    resetErrorBoundary();
  };

  return (
    <div className={cn("container")}>
      <div className={cn("wrap")}>
        <h2 className={cn("error-text")}>
          ERROR
          <Image
            className={cn("image")}
            src="/images/error.webp"
            alt="에러 이미지"
            width={170}
            height={160}
          />
        </h2>

        <h3 className={cn("title")}>{title}</h3>
        <p className={cn("content")}>{content}</p>
        <button className={cn("button")} type="button" onClick={handleResetButtonClick}>
          재접속 하기
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;
