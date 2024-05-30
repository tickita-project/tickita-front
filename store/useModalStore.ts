import { create } from "zustand";

interface ModalStoreType {
  isOpen: boolean;
  type: string;
  openModal: (type: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStoreType>((set) => ({
  isOpen: false,
  type: "",
  openModal: (type) => set(() => ({ isOpen: true, type })),
  closeModal: () => set(() => ({ isOpen: false, type: "" })),
}));
