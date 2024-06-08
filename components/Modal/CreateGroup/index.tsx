import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { z } from "zod";

import GroupColorPicker from "@/components/GroupColorPicker";
import Input from "@/components/Input";
import { GROUP_COLOR_LIST } from "@/constants/groupColorList";
import { GROUP_NAME_SCHEMA } from "@/constants/schema";
import { useModalStore } from "@/store/useModalStore";

import { GroupDataType } from "@/types/type";

import styles from "./CreateGroup.module.scss";

const cn = classNames.bind(styles);

const createGroupSchema = z.object({
  groupName: GROUP_NAME_SCHEMA,
  groupColor: z.string(),
});

export default function CreateGroupModal() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    defaultValues: { groupName: "", groupColor: GROUP_COLOR_LIST[0] },
    resolver: zodResolver(createGroupSchema),
  });
  const { closeModal } = useModalStore();
  const selectColor = watch("groupColor");

  const onSubmit = (data: GroupDataType) => {
    console.log(data);
    // TODO: 그룹 생성 API 호출
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
          id="groupName"
          placeholder="그룹 이름을 입력해 주세요."
          isRequired
          {...register("groupName")}
          errorMessage={errors.groupName?.message}
        />

        <div className={cn("group-color")}>
          <h3 className={cn("label")}>
            그룹 색상 <span className={cn("asterisk")}>*</span>
          </h3>
          <GroupColorPicker {...register("groupColor")} selectColor={selectColor} />
        </div>
        <div className={cn("button-box")}>
          <button type="submit" className={cn("create-button", { disabled: !isValid })}>
            그룹 생성하기
          </button>
        </div>
      </form>
    </div>
  );
}
