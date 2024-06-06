import { useRouter } from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";

import { postProfileSetup } from "@/apis/apis";
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
  nickname: string;
  phoneNumber: string | null;
}

const profileSetupFormSchema: ZodType<FieldValuesType> = z.object({
  nickname: NICKNAME_SCHEMA,
  phoneNumber: PHONE_NUMBER_SCHEMA,
});

export default function ProfileSetupForm({ accountId, email }: ProfileSetupFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValuesType>({
    mode: "all",
    defaultValues: { nickname: "", phoneNumber: null },
    resolver: zodResolver(profileSetupFormSchema),
  });

  const onSubmit = async (data: FieldValuesType) => {
    const formData = { ...data, accountId: Number(accountId) };

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
    <form onSubmit={handleSubmit(onSubmit)} className={cn("container")}>
      <div className={cn("input-container")}>
        <Input id="email" label="이메일" type="text" value={email} readOnly />
        <Input
          id="nickname"
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력해주세요"
          errorMessage={errors.nickname?.message}
          isRequired
          {...register("nickname")}
        />
        <Input
          id="phoneNumber"
          label="전화번호"
          type="tel"
          placeholder="전화번호를 입력해주세요"
          errorMessage={errors.phoneNumber?.message}
          isOptional
          {...register("phoneNumber")}
        />
      </div>
      <button className={cn("submit-button")}>프로필 저장하기</button>
    </form>
  );
}
