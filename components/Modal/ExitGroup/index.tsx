import Router, { useRouter } from "next/router";

import { PAGE_PATH } from "@/constants/pagePath";
import { useExitGroup } from "@/hooks/useExitGroup";
import useToast from "@/hooks/useToast";
import { useModalStore } from "@/store/useModalStore";

import ConfirmModal from "../Confirm";

export default function ExitGroupModal() {
  const { closeModal } = useModalStore();
  const { successToast, errorToast } = useToast();
  const { query } = useRouter();
  const { mutate: groupExitMutate } = useExitGroup(Number(query.id));

  const handleGroupExitButtonClick = () => {
    groupExitMutate(undefined, {
      onSuccess: () => {
        successToast("그룹에 정상적으로 나가셨습니다.");
        Router.push(PAGE_PATH.DASHBOARD);
        closeModal();
      },
      onError: () => {
        errorToast("그룹에 나가던 중 에러가 발생하였습니다!");
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
