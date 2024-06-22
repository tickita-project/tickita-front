import { useRouter } from "next/router";

import { useCancelInvite } from "@/hooks/useCancelInvite";
import { useModalStore } from "@/store/useModalStore";

import { CancelInviteType } from "@/types/type";

import ConfirmModal from "../Confirm";

export default function CancelInviteModal() {
  const { closeModal, data } = useModalStore();
  const { query } = useRouter();
  const { mutate } = useCancelInvite(Number(query.id));

  const handleCancelInviteButtonClick = () => {
    const payload = {
      crewId: Number(query.id),
      accountId: data.accountId,
    } as CancelInviteType;

    mutate(payload, {
      onSuccess: () => {
        alert("초대가 취소되었습니다.");
        closeModal();
      },
      onError: (error) => {
        alert(error);
      },
    });
  };

  return (
    <ConfirmModal
      title="초대 취소"
      content="정말 초대를 취소하시겠습니까?"
      buttonColor="#F33"
      buttonText="초대 취소"
      onClick={handleCancelInviteButtonClick}
    />
  );
}
