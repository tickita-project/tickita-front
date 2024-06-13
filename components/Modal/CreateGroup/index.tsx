import Image from "next/image";
import { useRouter } from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { z } from "zod";

import GroupColorPicker from "@/components/GroupColorPicker";
import Input from "@/components/Input";
import { GROUP_COLOR_LIST } from "@/constants/groupColorList";
import { CREW_NAME_SCHEMA } from "@/constants/schema";
import { useCreateGroup } from "@/hooks/useCreateGroup";
import { useModalStore } from "@/store/useModalStore";

import { CreateGroupDataType } from "@/types/type";

import styles from "./CreateGroup.module.scss";

const cn = classNames.bind(styles);

const createGroupSchema = z.object({
  crewName: CREW_NAME_SCHEMA,
  labelColor: z.string(),
});

export default function CreateGroupModal() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    defaultValues: { crewName: "", labelColor: GROUP_COLOR_LIST[0] },
    resolver: zodResolver(createGroupSchema),
  });
  const { closeModal } = useModalStore();
  const { mutate, isPending } = useCreateGroup();
  const router = useRouter();
  const selectColor = watch("labelColor");

  const onSubmit = async (formData: CreateGroupDataType) => {
    mutate(formData, {
      onSuccess: (response) => {
        closeModal();
        router.push(`/group/${response.crewId}`); // 만든 그룹 상세 페이지로 이동
      },
      onError: (error) => {
        alert(error);
      },
    });
  };

  return (
    <div className={cn("container")}>
      <div className={cn("modal-header")}>
        <h2 className={cn("modal-title")}>그룹 생성하기</h2>
        <button className={cn("modal-close")} type="button" onClick={closeModal}>
          <Image src="/icons/close-icon.svg" alt="모달 닫기" width={30} height={30} />
        </button>
      </div>
      <form className={cn("create-group-form")} onSubmit={handleSubmit(onSubmit)}>
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
        <div className={cn("button-box")}>
          <button
            type="submit"
            className={cn("create-button", { disabled: !isValid || isPending })}
          >
            그룹 생성하기
          </button>
        </div>
      </form>
    </div>
  );
}
