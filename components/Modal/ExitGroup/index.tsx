import Router, { useRouter } from "next/router";

import { PAGE_PATH } from "@/constants/pagePath";
import { useExitGroup } from "@/hooks/useExitGroup";
import { useModalStore } from "@/store/useModalStore";

import ConfirmModal from "../Confirm";

export default function ExitGroupModal() {
  const { closeModal } = useModalStore();
  const { query } = useRouter();
  const { mutate: groupExitMutate } = useExitGroup(Number(query.id));

  const handleGroupExitButtonClick = () => {
    groupExitMutate(undefined, {
      onSuccess: () => {
        alert("그룹 탈출 성공 ㅇ_ㅇ!");
        Router.push(PAGE_PATH.DASHBOARD);
        closeModal();
      },
      onError: (error) => {
        alert(error);
      },
    });
  };

  return (
    <ConfirmModal
      title="그룹 나가기"
      content="정말 그룹을 나가시겠습니까?"
      buttonColor="#F33"
      buttonText="그룹 나가기"
      onClick={handleGroupExitButtonClick}
    />
  );
}
