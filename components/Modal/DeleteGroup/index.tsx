import Router, { useRouter } from "next/router";

import { PAGE_PATH } from "@/constants/pagePath";
import { useDeleteGroup } from "@/hooks/useDeleteGroup";
import useToast from "@/hooks/useToast";
import { useModalStore } from "@/store/useModalStore";

import ConfirmModal from "../Confirm";

export default function DeleteGroupModal() {
  const { closeModal } = useModalStore();
  const { successToast, errorToast } = useToast();
  const { query } = useRouter();
  const { mutate: groupDeleteMutate } = useDeleteGroup(Number(query.id));

  const handleGroupDeleteButtonClick = () => {
    groupDeleteMutate(undefined, {
      onSuccess: () => {
        successToast("그룹이 삭제되었습니다.");
        Router.push(PAGE_PATH.DASHBOARD);
        closeModal();
      },
      onError: () => {
        errorToast("그룹 삭제에 실패하였습니다!");
      },
    });
  };

  return (
    <ConfirmModal
      title="그룹 삭제"
      content="정말 그룹을 삭제하시겠습니까?"
      subText="그룹을 삭제하면 복구할 수 없습니다."
      buttonColor="#F33"
      buttonText="그룹 삭제"
      onClick={handleGroupDeleteButtonClick}
    />
  );
}
