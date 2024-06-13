import Image from "next/image";

import classNames from "classnames/bind";

import styles from "./ProfileImage.module.scss";

interface ProfileImageProps {
  imageUrl: string | null;
}

const cn = classNames.bind(styles);

export default function ProfileImage({ imageUrl }: ProfileImageProps) {
  if (imageUrl) {
    return (
      <figure className={cn("profile-image-container")}>
        <Image
          className={cn("profile-image")}
          src={imageUrl}
          width={44}
          height={44}
          alt="유저 프로필 이미지"
        />
      </figure>
    );
  }

  // imageUrl이 없을 경우 기본 이미지로 대체
  return (
    <figure className={cn("profile-image-background")}>
      <Image src="/icons/default-profile.svg" width={44} height={44} alt="유저 프로필 이미지" />
    </figure>
  );
}
