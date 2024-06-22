import { MODAL_TYPE } from "@/constants/modalType";
import { useModalStore } from "@/store/useModalStore";

export default function Test() {
  const { openModal } = useModalStore();

  return (
    <button type="button" onClick={() => openModal(MODAL_TYPE.SCHEDULE_COORDINATION)}>
      모달달달
    </button>
  );
}
