import { useEffect, useState } from "react";

import Image from "next/image";

import classNames from "classnames/bind";

import Loader from "@/components/Loader";

import { ToastType } from "@/types/type";

import styles from "./ToastMessage.module.scss";

const cn = classNames.bind(styles);

interface ToastMessageProps {
  type: ToastType;
  message: string;
  autoClose: number;
  onClose: () => void;
}

interface ToastEffectType {
  success: {
    icon: string;
    backGroundColor: string;
  };
  error: {
    icon: string;
    backGroundColor: string;
  };
  warning: {
    icon: string;
    backGroundColor: string;
  };
  info: {
    icon: string;
    backGroundColor: string;
  };
}

const ToastEffect: ToastEffectType = {
  success: {
    icon: "/icons/success.svg",
    backGroundColor: "#07bc0c",
  },
  error: {
    icon: "/icons/error.svg",
    backGroundColor: "#e74c3c",
  },
  warning: {
    icon: "/icons/warning.svg",
    backGroundColor: "#f1c40f",
  },
  info: {
    icon: "/icons/info.svg",
    backGroundColor: "#3498db",
  },
};

function ToastMessage({ type, message, autoClose, onClose }: ToastMessageProps) {
  const [unMountDelayd, setUnMountDelayd] = useState(false);
  const delayTime = autoClose - 500; // unmount 애니메이션 autoClose - 0.5초

  useEffect(() => {
    if (type === "pending") {
      return;
    }

    const timer = setTimeout(() => {
      setUnMountDelayd(true);
    }, delayTime);

    return () => {
      clearTimeout(timer);
    };
  }, [type]);

  const handleCloseButtonClick = () => {
    setUnMountDelayd(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <>
      <div className={cn("container", { "unMount-effet": unMountDelayd })}>
        {type !== "pending" && (
          <>
            <div className={cn("progress")}>
              <div
                className={cn("progress-box")}
                style={{ backgroundColor: ToastEffect[type].backGroundColor }}
              >
                <div
                  className={cn("progress-bar")}
                  style={{ animationDuration: `${autoClose}ms` }}
                />
              </div>
            </div>
            <button className={cn("close-button")} onClick={handleCloseButtonClick}>
              <Image priority src="/icons/close.svg" width={14} height={16} alt="닫기" />
            </button>
          </>
        )}

        <div className={cn("message-box")}>
          {type === "pending" ? (
            <Loader />
          ) : (
            <Image
              priority
              src={ToastEffect[type].icon}
              width={20}
              height={20}
              alt={`${type} 아이콘`}
            />
          )}
          <span>{message}</span>
        </div>
      </div>
    </>
  );
}

export default ToastMessage;
