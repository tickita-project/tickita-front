import { create } from "zustand";

interface ModalStoreType {
  isOpen: boolean;
  type: string;
  data: any;
  openModal: (type: string, data?: any) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStoreType>((set) => ({
  isOpen: false,
  type: "",
  data: null,
  openModal: (type, data) => set(() => ({ isOpen: true, type, data })),
  closeModal: () => set(() => ({ isOpen: false, type: "" })),
}));
