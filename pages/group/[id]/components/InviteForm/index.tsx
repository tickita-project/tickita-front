import Image from "next/image";
import { useRouter } from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Input from "@/components/Input";
import TitleBox from "@/components/TitleBox";
import { MODAL_TYPE } from "@/constants/modalType";
import { useInviteGroupMember } from "@/hooks/useInviteGroupMember";
import useToast from "@/hooks/useToast";
import { useModalStore } from "@/store/useModalStore";

import { InviteeType } from "@/types/type";

import styles from "./InviteForm.module.scss";

const cn = classNames.bind(styles);

const createGroupSchema = z.object({
  email: z.string().email("이메일 형식이 올바르지 않습니다."),
});

export interface InviteDataType {
  crewId: number;
  email: string;
}

interface InviteFormProps {
  inviteeList: InviteeType[];
}

// TODO: 초대한 계정 리스트 가져오기 API 연결
export default function InviteForm({ inviteeList }: InviteFormProps) {
  const { query } = useRouter();
  const { mutate } = useInviteGroupMember(Number(query.id));
  const { openModal } = useModalStore();
  const { pendingToast, updateErrorToast, updateSuccessToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: { email: "" },
    resolver: zodResolver(createGroupSchema),
  });

  const onSubmit = async (formData: Pick<InviteDataType, "email">) => {
    const payload = {
      crewId: Number(query.id),
      email: formData.email,
    };

    pendingToast("초대장을 보내는 중입니다...");

    mutate(payload, {
      onSuccess: () => {
        updateSuccessToast("초대 메일이 발송되었습니다.");
        reset();
      },
      onError: (error) => {
        updateErrorToast("초대를 보내는 중 에러가 발생하였습니다!");
      },
    });
  };

  const handleCancelInviteButtonClick = (inviteeData: InviteeType) => {
    openModal(MODAL_TYPE.CANCEL_INVITE, inviteeData);
  };

  return (
    <div className={cn("invite-box")}>
      <div className={cn("invite")}>
        <div className={cn("title-box")}>
          <TitleBox title="그룹 초대" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="멤버 초대"
            type="email"
            id="inviteMember"
            placeholder="이메일을 입력해 주세요."
            {...register("email")}
            errorMessage={errors.email?.message}
          />
          <span className={cn("text")}>Enter 키를 누르면 초대장이 전송됩니다.</span>
        </form>
      </div>
      <div className={cn("invite-list-box")}>
        {inviteeList.length > 0 ? (
          <ul className={cn("invite-list")}>
            {inviteeList?.map((data) => (
              <li key={data.accountId} className={cn("list")}>
                <span className={cn("email")}>{data.email}</span>
                <button type="button" onClick={() => handleCancelInviteButtonClick(data)}>
                  <Image src="/icons/close-icon.svg" width={22} height={22} alt="초대 삭제" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className={cn("empty-box")}>
            <Image
              src="/icons/invite-empty.svg"
              width={125}
              height={125}
              alt="초대한 계정이 없음"
            />
            <span>아직 초대된 계정이 없습니다</span>
          </p>
        )}
      </div>
    </div>
  );
}
