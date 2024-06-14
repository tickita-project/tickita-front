import { ChangeEvent, useRef, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";

import { postProfileImageUrl, postProfileSetup } from "@/apis/apis";
import { nextInstance } from "@/apis/axios";
import Input from "@/components/Input";
import { PAGE_PATH } from "@/constants/pagePath";
import { NICKNAME_SCHEMA, PHONE_NUMBER_SCHEMA } from "@/constants/schema";

import styles from "./ProfileSetupForm.module.scss";

const cn = classNames.bind(styles);

interface ProfileSetupFormProps {
  accountId: number;
  email: string;
}

interface FieldValuesType {
  nickName: string;
  phoneNumber: string | null;
}

const profileSetupFormSchema: ZodType<FieldValuesType> = z.object({
  nickName: NICKNAME_SCHEMA,
  phoneNumber: PHONE_NUMBER_SCHEMA,
});

export default function ProfileSetupForm({ accountId, email }: ProfileSetupFormProps) {
  const [uploadedImgUrl, setUploadedImgUrl] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldValuesType>({
    mode: "all",
    defaultValues: { nickName: "", phoneNumber: null },
    resolver: zodResolver(profileSetupFormSchema),
  });

  const handleProfileImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const imageFile = e.target.files[0];
    const maxSize = 1 * 1024 * 1024;

    if (imageFile.size > maxSize) {
      alert("파일 크기는 1MB를 초과할 수 없습니다"); // TODO: 추후 toast로 변경 예정
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setUploadedImgUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(imageFile);

    const formData = new FormData();
    formData.append("multipartFile", imageFile);

    const res = await postProfileImageUrl(formData);
    const { imgUrl } = res;

    setImgUrl(imgUrl);
  };

  const onSubmit = async (data: FieldValuesType) => {
    const formData = { ...data, accountId: Number(accountId), imgUrl };

    try {
      const res = await postProfileSetup(formData);
      const { accessToken, accessTokenExpireAt, refreshToken, refreshTokenExpireAt } = res;

      await nextInstance.post("/api/setCookies", {
        accessToken,
        accessTokenExpireAt,
        refreshToken,
        refreshTokenExpireAt,
      });

      router.push(PAGE_PATH.DASHBOARD);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert("추가 정보 입력을 완료하지 못했습니다."); // TODO: 추후 toast로 변경 예정
      }
    }
  };

  return (
    <>
      <label htmlFor="file" className={cn("profile-image-button")}>
        <Image
          src={uploadedImgUrl ?? "/icons/default-profile-image.svg"}
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

      <form onSubmit={handleSubmit(onSubmit)} className={cn("container")}>
        <div className={cn("input-container")}>
          <Input
            id="email"
            label="이메일"
            type="text"
            value={email}
            readOnly
            className={cn("user-email-input")}
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
        <button type="submit" disabled={!isValid} className={cn("submit-button")}>
          프로필 저장하기
        </button>
      </form>
    </>
  );
}
