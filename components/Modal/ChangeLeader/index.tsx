import { useRouter } from "next/router";

import { useChangeLeader } from "@/hooks/useChangeLeader";
import { useModalStore } from "@/store/useModalStore";

import ConfirmModal from "../Confirm";

export default function ChangeLeaderModal() {
  const { closeModal, data } = useModalStore();
  const { query } = useRouter();
  const { mutate } = useChangeLeader(Number(query.id));

  const handleChangeLeaderButtonClick = () => {
    mutate(data.id, {
      onSuccess: () => {
        alert("리더가 위임되었습니다.");
        closeModal();
      },
      onError: (error) => {
        alert(error);
      },
    });
  };

  return (
    <ConfirmModal
      title="리더 위임"
      content="정말 리더를 위임하시겠습니까?"
      buttonColor="#3360FF"
      buttonText="리더 위임"
      onClick={handleChangeLeaderButtonClick}
    />
  );
}
