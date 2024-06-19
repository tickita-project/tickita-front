import { useRouter } from "next/router";

import { useExportMember } from "@/hooks/useExportMember";
import { useModalStore } from "@/store/useModalStore";

import ConfirmModal from "../Confirm";

export default function ChangeLeaderModal() {
  const { closeModal, data } = useModalStore();
  const { query } = useRouter();
  const { mutate } = useExportMember(Number(query.id));

  const handleExportMemberButtonClick = () => {
    mutate(data.id, {
      onSuccess: () => {
        alert("멤버가 추방되었습니다.");
        closeModal();
      },
      onError: (error) => {
        alert(error);
      },
    });
  };

  return (
    <ConfirmModal
      title="멤버 내보내기"
      content="정말 멤버를 추방하시겠습니까?"
      buttonColor="#3360FF"
      buttonText="멤버 추방"
      onClick={handleExportMemberButtonClick}
    />
  );
}
