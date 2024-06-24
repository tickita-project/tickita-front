import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";

import { putUserInfo } from "@/apis/apis";
import Input from "@/components/Input";
import { NICKNAME_SCHEMA, PHONE_NUMBER_SCHEMA } from "@/constants/schema";
import useGetProfileImage from "@/hooks/useGetProfileImage";

import { UserInfoType } from "@/types/type";

import styles from "./ProfileEditForm.module.scss";

const cn = classNames.bind(styles);

interface ProfileEditFormProps {
  userInfo: UserInfoType;
}

interface FieldValuesType {
  nickName: string;
  phoneNumber: string | null;
}

const profileSetupFormSchema: ZodType<FieldValuesType> = z.object({
  nickName: NICKNAME_SCHEMA,
  phoneNumber: PHONE_NUMBER_SCHEMA,
});

export default function ProfileEditForm({ userInfo }: ProfileEditFormProps) {
  const [isUnchanged, setIsUnchanged] = useState(true);
  const profileImageInputRef = useRef<HTMLInputElement>(null);

  const { uploadedImgUrl, imgUrl, handleProfileImageChange } = useGetProfileImage(userInfo.image);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FieldValuesType>({
    mode: "all",
    defaultValues: { nickName: userInfo.nickName, phoneNumber: userInfo.phoneNumber },
    resolver: zodResolver(profileSetupFormSchema),
  });

  const onSubmit = async (data: FieldValuesType) => {
    const formData = { ...data, accountId: Number(userInfo.accountId), imgUrl };

    try {
      await putUserInfo(formData);

      window.location.reload();
    } catch (error) {
      if (error instanceof AxiosError) {
        alert("프로필 수정을 완료하지 못했습니다."); // TODO: 추후 toast로 변경 예정
      }
    }
  };

  useEffect(() => {
    const isSame =
      watch("nickName") === userInfo.nickName &&
      watch("phoneNumber") === userInfo.phoneNumber &&
      imgUrl === userInfo.image;
    setIsUnchanged(isSame);
  }, [watch("nickName"), watch("phoneNumber"), userInfo, imgUrl]);

  return (
    <div className={cn("container")}>
      <label htmlFor="file" className={cn("profile-image-button")}>
        <Image
          src={uploadedImgUrl ?? userInfo.image ?? "/icons/default-profile-image.svg"}
          alt="프로필 이미지"
          fill
          className={cn("profile-image")}
        />
        <Image
          src="/icons/camera-icon.svg"
          alt="카메라 아이콘"
          width={44}
          height={44}
          className={cn("camera-icon")}
        />
      </label>
      <input
        id="file"
        type="file"
        accept="image/*"
        ref={profileImageInputRef}
        onChange={handleProfileImageChange}
        className={cn("hidden-image-input")}
      />

      <form onSubmit={handleSubmit(onSubmit)} className={cn("form-container")}>
        <div className={cn("input-container")}>
          <Input
            id="email"
            label="이메일"
            type="text"
            value={userInfo.email}
            readOnly
            className={cn("email-input")}
          />
          <Input
            id="nickName"
            label="닉네임"
            type="text"
            placeholder="닉네임을 입력해주세요"
            errorMessage={errors.nickName?.message}
            isRequired
            {...register("nickName")}
          />
          <Input
            id="phoneNumber"
            label="전화번호"
            type="tel"
            placeholder="전화번호를 입력해주세요"
            errorMessage={errors.phoneNumber?.message}
            isRequired={false}
            {...register("phoneNumber")}
          />
        </div>
        <button type="submit" disabled={!isValid || isUnchanged} className={cn("submit-button")}>
          프로필 저장하기
        </button>
      </form>
    </div>
  );
}
