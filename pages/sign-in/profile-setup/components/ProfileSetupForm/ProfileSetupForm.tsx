import { ChangeEvent, useRef, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";

import { postProfileImageUrl, postProfileSetup } from "@/apis/apis";
import Input from "@/components/Input";
import { NICKNAME_SCHEMA, PHONE_NUMBER_SCHEMA } from "@/constants/formSchema";
import { PAGE_PATH } from "@/constants/pagePath";

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
  const [uploadedImage, setUploadedImage] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const profileImageInput = useRef<HTMLInputElement>(null);
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

  const handleProfileImageButtonClick = () => {
    profileImageInput.current?.click();
  };

  const handleProfileImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const imageFile = e.target.files[0];

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setUploadedImage(fileReader.result as string);
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

    console.log(formData);

    try {
      await postProfileSetup(formData);
      router.push(PAGE_PATH.DASHBOARD);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert("추가 정보 입력을 완료하지 못했습니다.");
      }
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleProfileImageButtonClick}
        className={cn("profile-image-button")}
      >
        <Image
          src={uploadedImage || "/icons/default-profile-image.svg"}
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
      </button>

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
        <button
          type="submit"
          className={cn("submit-button", { "submit-button--disabled": !isValid })}
        >
          프로필 저장하기
        </button>
      </form>

      <input
        type="file"
        accept="image/*"
        ref={profileImageInput}
        onChange={handleProfileImageChange}
        className={cn("hidden-image-input")}
      />
    </>
  );
}
