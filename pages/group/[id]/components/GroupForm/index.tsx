import Image from "next/image";
import Router from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames/bind";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import GroupColorPicker from "@/components/GroupColorPicker";
import Input from "@/components/Input";
import TitleBox from "@/components/TitleBox";
import { CREW_NAME_SCHEMA } from "@/constants/schema";
import { useEditGroupInfo } from "@/hooks/useEditGroupInfo";

import { GroupInfoType } from "@/types/type";

import styles from "./GroupForm.module.scss";

const cn = classNames.bind(styles);

const createGroupSchema = z.object({
  crewName: CREW_NAME_SCHEMA,
  labelColor: z.string(),
});

interface GroupFormProps {
  groupInfo: GroupInfoType;
}

export default function GroupForm({ groupInfo }: GroupFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "all",
    defaultValues: { crewName: groupInfo.crewName, labelColor: groupInfo.labelColor },
    resolver: zodResolver(createGroupSchema),
  });
  const selectColor = useWatch({ name: "labelColor", control });
  console.log(isDirty);

  const { mutate } = useEditGroupInfo(groupInfo.crewId);

  const onSubmit = async (formData: any) => {
    // 그룹 정보 변경 로직 추가 예정
    mutate(formData, {
      onSuccess: () => {
        alert("그룹 정보가 변경되었습니다.");
        Router.reload(); // 추후 변경 예정
      },
      onError: (error) => {
        alert(error);
      },
    });
  };

  return (
    <div className={cn("group-form-box")}>
      <div className={cn("title-box")}>
        <TitleBox title="그룹 정보" />
      </div>
      <form className={cn("group-form")} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="그룹 이름"
          type="text"
          id="crewName"
          placeholder="그룹 이름을 입력해 주세요."
          isRequired
          {...register("crewName")}
          errorMessage={errors.crewName?.message}
        />
        <div className={cn("group-color")}>
          <h3 className={cn("label")}>
            그룹 색상 <span className={cn("asterisk")}>*</span>
          </h3>
          <GroupColorPicker {...register("labelColor")} selectColor={selectColor} />
        </div>
        <button type="submit" disabled={!isValid || !isDirty} className={cn("form-button")}>
          저장하기
        </button>
      </form>
      <div className={cn("preview-box")}>
        <div className={cn("preview-text")}>
          <h2>미리보기 화면</h2>
          <h3>캘린더에 등록 시 오른쪽 화면처럼 색상이 등록돼요</h3>
        </div>
        <div className={cn("preview-image")}>
          <p className={cn("preview-color")} style={{ backgroundColor: selectColor }} />
          <Image src="/images/preview.webp" width={170} height={170} alt="그룹 색상 미리보기" />
        </div>
      </div>
    </div>
  );
}
