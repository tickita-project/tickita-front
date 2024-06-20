import { create } from "zustand";

import { ModalType } from "@/constants/modalType";

interface ModalStoreType {
  isOpen: boolean;
  type: ModalType | null;
  data: any;
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStoreType>((set) => ({
  isOpen: false,
  type: null,
  data: null,
  openModal: (type, data) => set(() => ({ isOpen: true, type, data })),
  closeModal: () => set(() => ({ isOpen: false, type: null, data: null })),
}));
