import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";

import Input from "@/components/Input";

import FormSchema from "./FormSchema";
import styles from "./ProfileSetupForm.module.scss";

const cn = classNames.bind(styles);

interface ProfileSetupFormProps {
  accountId: number;
  email: string;
}

export interface FieldValuesType {
  nickname: string;
  phoneNumber: string | null;
}

export default function ProfileSetupForm({ accountId, email }: ProfileSetupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValuesType>({
    mode: "all",
    defaultValues: { nickname: "", phoneNumber: null },
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: Omit<FieldValuesType, "accountId">) => {
    const formData = { ...data, accountId: Number(accountId) };
    console.log(formData); // TODO: 추후 삭제 예정 (데이터 확인용)
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
